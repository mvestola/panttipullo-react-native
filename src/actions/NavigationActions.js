import {action} from "mobx"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import AppUiState from "../state/AppUiState"
import {BackHandler} from "react-native"
import ProductDepositActions from "./ProductDepositActions"

class NavigationActions {

    constructor() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            if (AppUiState.showInfo || AppUiState.showSettings || AppUiState.showHistory || AppUiState.showHelp
                || AppUiState.showBarcodeScanner || AppUiState.showProductDepositResult) {
                this.showMainPage()
                return true
            }
            return false
        })

    }

    @action
    showMainPage() {
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
