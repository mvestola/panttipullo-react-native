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

    reset() {
        this.showInfo = false
        this.showSettings = false
        this.showHistory = false
        this.showHelp = false
    }

    @computed get showBarcodeScanner() {
        return ProductDepositDomainStore.barcodeScanIsInProgress && ProductDepositDomainStore.hasCameraPermission
    }

    @computed get showProductDepositResult() {
        return !this.showLoadingSpinner && ProductDepositDomainStore.status === LOADED
    }

    @computed get showLoadingSpinner() {
        return ProductDepositDomainStore.status === LOADING
    }

    @computed get showAppIsInitialising() {
        return AppSettingsDomainStore.status === LOADING || !AppSettingsDomainStore.fontsAreLoaded
    }

    @computed get showBackButton() {
        return this.showHelp || this.showInfo || this.showSettings || this.showBarcodeScanner || this.showProductDepositResult
    }

    @computed get subtitleText() {
        if (this.showHistory) {
            return "Historia"
        } else if (this.showSettings) {
            return "Asetukset"
        } else if (this.showInfo) {
            return "Tietoa ohjelmasta"
        } else if (this.showHelp) {
            return "Ohjeet"
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
