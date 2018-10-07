import {action} from "mobx"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Permissions} from "expo";
import {Alert} from "react-native"

class ProductDepositActions {

    @action
    async scanBarcode() {
        Expo.Amplitude.logEvent("Barcode scan started")
        ProductDepositDomainStore.barcodeScanIsInProgress = true
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            console.log("camera permission granted")
            ProductDepositDomainStore.hasCameraPermission = true
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

    @action
    clearStats() {
        Alert.alert(
            'Vahvista poisto',
            'Haluatko varmasti nollata tilastot',
            [
                {text: 'Peruuta', style: 'cancel'},
                {text: 'OK', onPress: () => this._doClearStats()},
            ],
            { cancelable: false }
        )
    }

    @action.bound
    _doClearStats() {
        ProductDepositDomainStore.totalScanCount = 0
        ProductDepositDomainStore.totalScanHavingDeposit = 0
        ProductDepositDomainStore.totalDepositAmount = 0.0
        ProductDepositDomainStore.savePersistData()
    }

    @action
    clearRecentScans() {
        Alert.alert(
            'Vahvista poisto',
            'Haluatko varmasti poistaa viimeisimmät skannaukset',
            [
                {text: 'Peruuta', style: 'cancel'},
                {text: 'OK', onPress: () => this._doClearRecentScans()},
            ],
            { cancelable: false }
        )
    }

    @action.bound
    _doClearRecentScans() {
        ProductDepositDomainStore.lastScanResults = []
        ProductDepositDomainStore.savePersistData()
    }

}

export default new ProductDepositActions()
