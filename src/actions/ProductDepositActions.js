import {action} from "mobx"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Permissions} from "expo";

class ProductDepositActions {

    @action
    async scanBarcode() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            console.log("camera permission granted")
            ProductDepositDomainStore.hasCameraPermission = true
            ProductDepositDomainStore.barcodeScanIsInProgress = true
        } else {
            console.log("camera permission not granted!")
        }
    }

    @action
    barcodeScanComplete(barcode) {
        ProductDepositDomainStore.barcodeScanIsInProgress = false
        ProductDepositDomainStore.barcode = barcode
        ProductDepositDomainStore.fetchProductDepositInformation()
    }
}

export default new ProductDepositActions()
