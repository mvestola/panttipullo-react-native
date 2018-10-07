import {action} from "mobx"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Permissions} from "expo";
import AppUiState from "../state/AppUiState";

class NavigationActions {

    @action
    goBack() {
        ProductDepositDomainStore.reset()
        AppUiState.reset()
    }

    @action
    showInfo() {
        ProductDepositDomainStore.reset()
        AppUiState.reset()
        AppUiState.showInfo = true
    }

    @action
    showHelp() {
        ProductDepositDomainStore.reset()
        AppUiState.reset()
        AppUiState.showHelp = true
    }

    @action
    showSettings() {
        ProductDepositDomainStore.reset()
        AppUiState.reset()
        AppUiState.showSettings = true
    }
}

export default new NavigationActions()
