import {computed, observable} from "mobx"
import ProductDepositDomainStore from "./ProductDepositDomainStore"
import {ERROR, INITIALIZED, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import AppSettingsDomainStore from "./AppSettingsDomainStore";
import { BackHandler } from "react-native";
import ProductDepositActions from "../actions/ProductDepositActions";

class AppUiState {

    @observable showInfo
    @observable showSettings
    @observable showHelp
    @observable showHistory

    constructor() {
        this.reset()
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.showBarcodeScanner || this.showProductDepositResult) {
                ProductDepositActions.cancelBarcodeScan()
                return true
            } else if (this.showInfo || this.showSettings || this.showHistory || this.showHelp) {
                this.reset()
                return true
            } else {
                return false
            }
        })
    }

    reset() {
        this.showInfo = false
        this.showSettings = false
        this.showHistory = false
        this.showHelp = false
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
        return ProductDepositDomainStore.barcodeScanIsInProgress && ProductDepositDomainStore.hasCameraPermission
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
    showAppIsInitialising() {
        return AppSettingsDomainStore.status === LOADING || !AppSettingsDomainStore.fontsAreLoaded
    }

    @computed get
    showCameraButton() {
        const status = ProductDepositDomainStore.status
        return !this.showLoadingSpinner && (status === LOADED || status === ERROR || status === INITIALIZED)
            && !this.showSettings && !this.showInfo && !this.showHelp && !this.showBarcodeScanner && !this.showProductDepositResult
    }

    @computed get
    showBackButton() {
        return !this.showCameraButton
    }

    @computed get
    subtitleText() {
        if (this.showHistory) {
            return "Historia"
        } else if (this.showSettings) {
            return "Asetukset"
        } else if (this.showInfo) {
            return "Tietoa ohjelmasta"
        } else if (this.showHelp) {
            return "Ohjeet"
        } else if (AppSettingsDomainStore.notification) {
            return "Viesti kehittäjältä"
        } else if (this.showBarcodeScanner) {
            return "Viivakoodin skannaus"
        } else if (this.showProductDepositResult) {
            return "Skannauksen tulos"
        } else if (this.showLoadingSpinner) {
            return "Haetaan tietoja..."
        } else {
            return "Etusivu"
        }
    }
}

export default new AppUiState()
