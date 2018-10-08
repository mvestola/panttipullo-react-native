import {computed, observable} from "mobx"
import ProductDepositDomainStore from "../../productDeposit/state/ProductDepositDomainStore"
import {LOADED, LOADING,} from "../../common/constants/domainStoreStatusConstants"
import AppSettingsDomainStore from "../../settings/state/SettingsDomainStore"

class AppUiState {
    @observable showInfo
    @observable showSettings
    @observable showHelp

    reset() {
        this.showInfo = false
        this.showSettings = false
        this.showHelp = false
    }

    @computed get showBarcodeScanner() {
        return ProductDepositDomainStore.barcodeScanIsInProgress && ProductDepositDomainStore.hasCameraPermission
    }

    @computed get showProductDepositResult() {
        return ProductDepositDomainStore.status === LOADED
    }

    @computed get showLoadingSpinner() {
        return ProductDepositDomainStore.status === LOADING
            || !ProductDepositDomainStore.totalValuesAreLoaded
            || !AppSettingsDomainStore.settingsAreLoaded
    }

    @computed get showAppIsInitialising() {
        return AppSettingsDomainStore.status === LOADING || !AppSettingsDomainStore.fontsAreLoaded
    }

    @computed get showBackButton() {
        return this.isOtherThanMainView
    }

    @computed get isOtherThanMainView() {
        return this.showHelp || this.showInfo || this.showSettings || this.showBarcodeScanner || this.showProductDepositResult
    }

    @computed get subtitleText() {
        if (this.showSettings) {
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
