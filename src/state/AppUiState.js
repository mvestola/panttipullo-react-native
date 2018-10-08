import {computed, observable} from "mobx"
import {BackHandler} from "react-native"
import ProductDepositDomainStore from "./ProductDepositDomainStore"
import {
    ERROR, INITIALIZED, LOADED, LOADING,
} from "../constants/domainStoreStatusConstants"
import AppSettingsDomainStore from "./AppSettingsDomainStore"
import ProductDepositActions from "../actions/ProductDepositActions"

class AppUiState {
    @observable showInfo
    @observable showSettings
    @observable showHelp
    @observable showHistory

    constructor() {
        this.reset()
        BackHandler.addEventListener("hardwareBackPress", () => {
            if (this.showBarcodeScanner || this.showProductDepositResult) {
                ProductDepositActions.cancelBarcodeScan()
                return true
            }
            if (this.showInfo || this.showSettings || this.showHistory || this.showHelp) {
                this.reset()
                return true
            }
            return false
        })
    }

    reset() {
        this.showInfo = false
        this.showSettings = false
        this.showHistory = false
        this.showHelp = false
    }

    @computed get showAppNotification() {
        return !this.showLoadingSpinner
            && (AppSettingsDomainStore.notification !== null || ProductDepositDomainStore.status === ERROR)
    }

    @computed get appNotificationText() {
        if (AppSettingsDomainStore.notification !== null) {
            return AppSettingsDomainStore.notification
        }
        if (ProductDepositDomainStore.status === ERROR) {
            return "Virhe haettaessa tietoa PALPAn sivuilta."
        }
        return null
    }

    @computed get showBarcodeScanner() {
        return ProductDepositDomainStore.barcodeScanIsInProgress && ProductDepositDomainStore.hasCameraPermission
    }

    @computed get showProductDepositResult() {
        return !this.showLoadingSpinner && ProductDepositDomainStore.status === LOADED
    }

    @computed get showLoadingSpinner() {
        return ProductDepositDomainStore.status === LOADING || AppSettingsDomainStore.status === LOADING
    }

    @computed get showAppIsInitialising() {
        return AppSettingsDomainStore.status === LOADING || !AppSettingsDomainStore.fontsAreLoaded
    }

    @computed get showCameraButton() {
        const {status} = ProductDepositDomainStore
        return !this.showLoadingSpinner && (status === LOADED || status === ERROR || status === INITIALIZED)
            && !this.showSettings && !this.showInfo && !this.showHelp
            && !this.showBarcodeScanner && !this.showProductDepositResult
    }

    @computed get showBackButton() {
        return !this.showCameraButton
    }

    @computed get subtitleText() {
        if (this.showHistory) {
            return "Historia"
        }
        if (this.showSettings) {
            return "Asetukset"
        }
        if (this.showInfo) {
            return "Tietoa ohjelmasta"
        }
        if (this.showHelp) {
            return "Ohjeet"
        }
        if (AppSettingsDomainStore.notification) {
            return "Viesti kehittäjältä"
        }
        if (this.showBarcodeScanner) {
            return "Viivakoodin skannaus"
        }
        if (this.showProductDepositResult) {
            return "Skannauksen tulos"
        }
        if (this.showLoadingSpinner) {
            return "Haetaan tietoja..."
        }
        return "Etusivu"
    }
}

export default new AppUiState()
