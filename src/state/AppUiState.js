import {computed} from "mobx"
import ProductDepositDomainStore from "./ProductDepositDomainStore"
import {ERROR, INITIALIZED, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import AppSettingsDomainStore from "./AppSettingsDomainStore";
import { BackHandler } from "react-native";
import ProductDepositActions from "../actions/ProductDepositActions";

class AppUiState {
    constructor() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.showBarcodeScanner || this.showProductDepositResult) {
                ProductDepositActions.cancelBarcodeScan()
                return true
            } else {
                return false
            }
        })
    }

    @computed get
    showAppNotification() {
        return !this.showLoadingSpinner && (AppSettingsDomainStore.notification !== null || ProductDepositDomainStore.status === ERROR)
    }

    @computed get
    appNotificationText() {
        if (AppSettingsDomainStore.notification !== null) {
            return AppSettingsDomainStore.notification
        } else if (ProductDepositDomainStore.status === ERROR) {
            return "Virhe haettaessa tietoa PALPAn sivuilta."
        } else {
            return null
        }
    }

    @computed get
    showBarcodeScanner() {
        return ProductDepositDomainStore.barcodeScanIsInProgress
    }

    @computed get
    showProductDepositResult() {
        return !this.showLoadingSpinner && ProductDepositDomainStore.status === LOADED
    }

    @computed get
    showLoadingSpinner() {
        return ProductDepositDomainStore.status === LOADING || AppSettingsDomainStore.status === LOADING
    }

    @computed get
    showCameraButton() {
        const status = ProductDepositDomainStore.status
        return !this.showLoadingSpinner && (status === LOADED || status === ERROR || status === INITIALIZED)
    }
}

export default new AppUiState()
