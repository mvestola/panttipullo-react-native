import i18n from "i18n-js"
import { action } from "mobx"
import * as Permissions from "expo-permissions"
import { Alert } from "react-native"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import Analytics from "../../common/util/Analytics"

class ProductDepositActions {
    @action.bound
    async scanBarcode() {
        Analytics.logEvent("Barcode scan started")
        ProductDepositDomainStore.barcodeScanIsInProgress = true
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        if (status === "granted") {
            this.userGrantedCameraPermission()
        } else {
            Analytics.logEvent("Camera permission not granted")
            console.log("camera permission not granted!")
        }
    }

    @action
    userGrantedCameraPermission() {
        ProductDepositDomainStore.hasCameraPermission = true
    }

    @action
    barcodeScanComplete(barcode) {
        Analytics.logEvent("Barcode scan complete")
        ProductDepositDomainStore.barcodeScanIsInProgress = false
        ProductDepositDomainStore.hasCameraPermission = false
        ProductDepositDomainStore.barcode = barcode
        ProductDepositDomainStore.fetchProductDepositInformation()
    }

    @action
    clearStats() {
        Alert.alert(
            i18n.t("confirmDelete"),
            i18n.t("confirmStatsEmpty"),
            [
                { text: i18n.t("cancel"), style: "cancel" },
                { text: i18n.t("ok"), onPress: () => this._doClearStats() },
            ],
            { cancelable: false },
        )
    }

    @action.bound
    _doClearStats() {
        ProductDepositDomainStore.totalScanCount = 0
        ProductDepositDomainStore.totalScanHavingDeposit = 0
        ProductDepositDomainStore.totalDepositAmount = 0.0
        ProductDepositDomainStore.persistTotalsData()
        Analytics.logEvent("Stats cleared")
    }

    @action
    clearRecentScans() {
        Alert.alert(
            i18n.t("confirmDelete"),
            i18n.t("confirmRecentScansEmpty"),
            [
                { text: i18n.t("cancel"), style: "cancel" },
                { text: i18n.t("ok"), onPress: () => this._doClearRecentScans() },
            ],
            { cancelable: false },
        )
    }

    @action.bound
    _doClearRecentScans() {
        ProductDepositDomainStore.lastScanResults = []
        ProductDepositDomainStore.persistTotalsData()
        Analytics.logEvent("Recent scan cleared")
    }
}

export default new ProductDepositActions()
