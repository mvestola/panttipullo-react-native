import {action} from "mobx"
import {Permissions} from "expo"
import {Alert} from "react-native"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import Analytics from "../../common/util/Analytics"

class ProductDepositActions {
    @action.bound
    async scanBarcode() {
        Analytics.logEvent("Barcode scan started")
        ProductDepositDomainStore.barcodeScanIsInProgress = true
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
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
        ProductDepositDomainStore.barcode = barcode
        ProductDepositDomainStore.fetchProductDepositInformation()
    }

    @action
    clearStats() {
        Alert.alert(
            "Vahvista poisto",
            "Haluatko varmasti nollata tilastot",
            [
                {text: "Peruuta", style: "cancel"},
                {text: "OK", onPress: () => this._doClearStats()},
            ],
            {cancelable: false},
        )
    }

    @action.bound
    _doClearStats() {
        ProductDepositDomainStore.totalScanCount = 0
        ProductDepositDomainStore.totalScanHavingDeposit = 0
        ProductDepositDomainStore.totalDepositAmount = 0.0
        ProductDepositDomainStore.persistTotalsData()
    }

    @action
    clearRecentScans() {
        Alert.alert(
            "Vahvista poisto",
            "Haluatko varmasti poistaa viimeisimmät skannaukset",
            [
                {text: "Peruuta", style: "cancel"},
                {text: "OK", onPress: () => this._doClearRecentScans()},
            ],
            {cancelable: false},
        )
    }

    @action.bound
    _doClearRecentScans() {
        ProductDepositDomainStore.lastScanResults = []
        ProductDepositDomainStore.persistTotalsData()
    }
}

export default new ProductDepositActions()
