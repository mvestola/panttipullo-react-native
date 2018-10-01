import {computed} from "mobx"
import ProductDepositDomainStore from "./ProductDepositDomainStore"
import {ERROR, INITIALIZED, LOADED, LOADING} from "../constants/domainStoreStatusConstants";

class AppUiState {

    @computed get
    showProductDepositResult() {
        return ProductDepositDomainStore.status === LOADED
    }

    @computed get
    showLoadingSpinner() {
        return ProductDepositDomainStore.status === LOADING
    }

    @computed get
    showCameraButton() {
        const status = ProductDepositDomainStore.status
        return status === LOADED || status === ERROR || status === INITIALIZED
    }
}

export default new AppUiState()
