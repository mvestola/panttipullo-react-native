import i18n from "i18n-js"
import { computed, observable } from "mobx"
import {ProductDepositDomainStore} from "../../productDeposit/state/ProductDepositDomainStore"
import { LOADED, LOADING } from "../../common/constants/domainStoreStatusConstants"
import {SettingsDomainStore} from "../../settings/state/SettingsDomainStore"

class State {
    @observable showInfo

    @observable showSettings

    @observable showHelp

    @observable showRecentScans

    reset() {
        this.showInfo = false
        this.showSettings = false
        this.showHelp = false
        this.showRecentScans = false
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
            || !SettingsDomainStore.settingsAreLoaded
    }

    @computed get showAppIsInitialising() {
        return SettingsDomainStore.status === LOADING || !SettingsDomainStore.fontsAreLoaded
    }

    @computed get isOtherThanMainView() {
        return this.showHelp || this.showInfo || this.showSettings || this.showRecentScans
            || this.showBarcodeScanner || this.showProductDepositResult
    }

    @computed get subtitleText() {
        if (this.showSettings) {
            return i18n.t("settings")
        } if (this.showInfo) {
            return i18n.t("info")
        } if (this.showHelp) {
            return i18n.t("help")
        } if (this.showRecentScans) {
            return i18n.t("recentScans")
        } if (this.showBarcodeScanner) {
            return i18n.t("barcodeScan")
        } if (this.showProductDepositResult) {
            return i18n.t("barcodeScanResult")
        } if (this.showLoadingSpinner) {
            return i18n.t("fetching")
        }
            return i18n.t("frontPage")
    }
}

export const AppUiState = new State()
