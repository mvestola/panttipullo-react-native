import {action} from "mobx"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Permissions} from "expo";

class ProductDepositActions {

    @action
    async scanBarcode() {
        Expo.Amplitude.logEvent("Barcode scan started")
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            console.log("camera permission granted")
            ProductDepositDomainStore.hasCameraPermission = true
            ProductDepositDomainStore.barcodeScanIsInProgress = true
        } else {
            Expo.Amplitude.logEvent("Camera permission not granted")
            console.log("camera permission not granted!")
        }
    }

    @action
    barcodeScanComplete(barcode) {
        Expo.Amplitude.logEvent("Barcode scan complete")
        ProductDepositDomainStore.barcodeScanIsInProgress = false
        ProductDepositDomainStore.barcode = barcode
        ProductDepositDomainStore.fetchProductDepositInformation()
    }

    @action
    cancelBarcodeScan() {
        Expo.Amplitude.logEvent("Barcode scan cancelled")
        ProductDepositDomainStore.reset()
    }

}

export default new ProductDepositActions()
