import i18n from "i18n-js"
import * as Haptics from 'expo-haptics'
import {
action, computed, observable, runInAction, toJS,
} from "mobx"
import { AsyncStorage } from "react-native"
import _ from "lodash"
import moment from "moment"
import {
 ERROR, INITIALIZED, LOADED, LOADING,
} from "../../common/constants/domainStoreStatusConstants"
import ProductDepositApi from "../api/ProductDepositApi"
import NotificationBuilder from "../../common/util/NotificationBuilder"
import Analytics from "../../common/util/Analytics"

class ProductDepositDomainStore {
    @observable barcode = null

    @observable barcodeScanIsInProgress = false

    @observable hasCameraPermission = false

    @observable status = INITIALIZED

    @observable depositResponse = null

    @observable totalValuesAreLoaded = false

    @observable totalScanCount = 0

    @observable totalScanHavingDeposit = 0

    @observable totalDepositAmount = 0.0

    @observable lastScanResults = []

    constructor() {
        this._loadTotalsData()
    }

    reset() {
        this.barcode = null
        this.barcodeScanIsInProgress = false
        this.hasCameraPermission = false
        this.status = INITIALIZED
        this.depositResponse = null
    }

    @computed get totalScanCountNoDeposit() {
        return this.totalScanCount - this.totalScanHavingDeposit
    }

    @computed get lastScanResultsSorted() {
        return _.orderBy(this.lastScanResults, ["date", "name"], ["desc", "asc"])
    }

    fetchProductDepositInformation() {
        this.status = LOADING
        ProductDepositApi.fetchCookieAndCsrfToken()
            .then((response) => response.text())
            .then((htmlResponse) => this.fetchProductDepositWithCsrfToken(htmlResponse))
            .catch(this.onServerErrorResponse)
    }

    @action.bound
    fetchProductDepositWithCsrfToken(htmlResponse) {
        const csrfValueRegExp = /data-essi-csrf-token="([A-Za-z0-9_-]+)"/
        const csrfHeaderRegExp = /data-essi-csrf-header="([A-Za-z0-9_-]+)"/

        const csrfHeaderRegExpMatch = csrfHeaderRegExp.exec(htmlResponse)
        const csrfValueRegExpMatch = csrfValueRegExp.exec(htmlResponse)

        if (csrfHeaderRegExpMatch !== null && csrfHeaderRegExpMatch.length > 0
            && csrfValueRegExpMatch !== null && csrfValueRegExpMatch.length > 0) {
            const csrfTokenHeader = csrfHeaderRegExpMatch[1]
            const csrfToken = csrfValueRegExpMatch[1]
            ProductDepositApi.fetchProductDepositInformation(this.barcode, csrfTokenHeader, csrfToken)
                .then((response) => response.json())
                .then((response) => this.onServerSuccessResponse(response))
                .catch(this.onServerErrorResponse)
        } else {
            this.reset()
            Analytics.logEvent("Unable to parse CSRF token from page")
            console.log("Unable to parse CSRF token from page.")
            this.status = ERROR
            NotificationBuilder.showNotification(i18n.t("error"), i18n.t("parsingErrorPalpa"))
        }
    }

    @action.bound
    onServerSuccessResponse(response) {
        this.status = LOADED
        const payload = response.payLoad
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

        if (_.isNil(payload)) {
            Analytics.logEvent("Got empty payload response from PALPA")
            this.depositResponse = {}
            if (!_.isNil(response.message)) {
                this.depositResponse.message = response.message
            }
            this.lastScanResults.push({
                ean: this.barcode,
                date: moment().toISOString(),
                key: `${moment().unix()}`,
            })
            this.totalScanCount++
        } else {
            Analytics.logEvent("Got OK response from PALPA")
            this.depositResponse = {
                message: payload.message,
                ean: payload.ean,
                productName: payload.name,
                productType: payload.recycling,
                deposit: payload.deposit,
            }
            this.lastScanResults.push({
                ean: payload.ean || this.barcode,
                productName: payload.name,
                productType: payload.recycling,
                deposit: payload.deposit,
                date: moment().toISOString(),
                key: `${moment().unix()}`,
            })
            this.totalScanCount++
            if (payload.deposit !== null) {
                this.totalScanHavingDeposit++
                this.totalDepositAmount += Number(payload.deposit.replace(/,/g, ".").replace(/[^0-9.-]+/g, ""))
            }
        }
        this.persistTotalsData()
    }

    @action.bound
    onServerErrorResponse(error) {
        Analytics.logEvent("Got server error from Palpa")
        this.reset()
        console.log(error)
        this.status = ERROR
        NotificationBuilder.showNotification(i18n.t("connectionError"), i18n.t("loadErrorPalpa"))
    }

    persistTotalsData = async () => {
        try {
            await AsyncStorage.setItem("totalScanCount", toJS(this.totalScanCount).toString())
            await AsyncStorage.setItem("totalScanHavingDeposit", toJS(this.totalScanHavingDeposit).toString())
            await AsyncStorage.setItem("totalDepositAmount", toJS(this.totalDepositAmount).toString())
            await AsyncStorage.setItem("lastScanResults", JSON.stringify(toJS(this.lastScanResults)))
        } catch (error) {
            console.log("error saving persist data", error)
        }
    }

    _loadTotalsData = async () => {
        try {
            const totalScanCount = await AsyncStorage.getItem("totalScanCount")
            const totalScanHavingDeposit = await AsyncStorage.getItem("totalScanHavingDeposit")
            const totalDepositAmount = await AsyncStorage.getItem("totalDepositAmount")
            const lastScanResults = await AsyncStorage.getItem("lastScanResults")

            runInAction(() => {
                if (totalScanCount !== null) {
                    this.totalScanCount = Number(totalScanCount)
                }
                if (totalScanHavingDeposit !== null) {
                    this.totalScanHavingDeposit = Number(totalScanHavingDeposit)
                }
                if (totalDepositAmount !== null) {
                    this.totalDepositAmount = Number(totalDepositAmount)
                }
                if (lastScanResults !== null) {
                    this.lastScanResults = JSON.parse(lastScanResults)
                }
                this.totalValuesAreLoaded = true
            })
        } catch (error) {
            console.log("error loading persistent data", error)
            runInAction(() => {
                this.totalValuesAreLoaded = true
            })
        }
    }
}

export default new ProductDepositDomainStore()
