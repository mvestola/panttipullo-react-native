import {observable, computed, action} from "mobx"
import _ from "lodash"
import {ERROR, INITIALIZED, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import ProductDepositApi from "../api/ProductDepositApi";

class ProductDepositDomainStore {

    @observable barcode
    @observable barcodeScanIsInProgress
    @observable hasCameraPermission = false
    @observable status
    @observable depositResponse

    constructor() {
        this._init()
    }

    _init() {
        this.barcode = null
        this.barcodeScanIsInProgress = false
        this.status = INITIALIZED
        this.depositResponse = null
    }

    @computed get
    isWaitingResponseForBarCode() {
        return this.barcode !== null && this.depositResponse !== null
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
        const csrfValueRegExp = /data-essi-csrf-token\=\"([A-Za-z0-9_\-]+)\"/
        const csrfHeaderRegExp = /data-essi-csrf-header\=\"([A-Za-z0-9_\-]+)\"/

        const csrfHeaderRegExpMatch = csrfHeaderRegExp.exec(htmlResponse)
        const csrfValueRegExpMatch = csrfValueRegExp.exec(htmlResponse)

        if (csrfHeaderRegExpMatch !== null && csrfHeaderRegExpMatch.length > 0 && csrfValueRegExpMatch !== null && csrfValueRegExpMatch.length > 0) {
            const csrfTokenHeader = csrfHeaderRegExpMatch[1]
            const csrfToken = csrfValueRegExpMatch[1]
            ProductDepositApi.fetchProductDepositInformation(this.barcode, csrfTokenHeader, csrfToken)
                .then((response) => response.json())
                .then((response) => this.onServerSuccessResponse(response))
                .catch(this.onServerErrorResponse)
        } else {
            this._init()
            console.log("Unable to parse CSRF token from page.")
            this.status = ERROR
        }
    }

    @action.bound
    onServerSuccessResponse(response) {
        this.status = LOADED
        const payload = response.payLoad

        if (_.isNil(payload)) {
            this.depositResponse = {}
            if (!_.isNil(jsonResponse.message)) {
                this.depositResponse.message = jsonResponse.message
            }
        } else {
            this.depositResponse = {
                message: payload.message,
                ean: payload.ean,
                productName: payload.name,
                productType: payload.recycling,
                deposit: payload.deposit
            }
        }
    }

    @action.bound
    onServerErrorResponse(error) {
        this._init()
        console.log(error)
        this.status = ERROR
    }

}

export default new ProductDepositDomainStore()
