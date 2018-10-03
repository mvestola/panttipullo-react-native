import {computed} from "mobx"
import ProductDepositDomainStore from "./ProductDepositDomainStore"
import {ERROR, INITIALIZED, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import AppSettingsDomainStore from "./AppSettingsDomainStore";

class AppUiState {

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
