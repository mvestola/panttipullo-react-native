import {action} from "mobx"
import ProductDepositDomainStore from "../../productDeposit/state/ProductDepositDomainStore"
import AppUiState from "../state/AppUiState"
import {BackHandler} from "react-native"
import Analytics from "../../common/util/Analytics"

class NavigationActions {

    constructor() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            if (AppUiState.isOtherThanMainView) {
                this.showMainPage()
                return true
            } else {
                return false
            }
        })
    }

    _resetNavigation() {
        ProductDepositDomainStore.reset()
        AppUiState.reset()
    }

    @action
    showMainPage() {
        this._resetNavigation()
    }

    @action
    showInfo() {
        this._resetNavigation()
        AppUiState.showInfo = true
        Analytics.logEvent("Info page shown")
    }

    @action
    showHelp() {
        this._resetNavigation()
        AppUiState.showHelp = true
        Analytics.logEvent("Help page shown")
    }

    @action
    showSettings() {
        this._resetNavigation()
        AppUiState.showSettings = true
        Analytics.logEvent("Settings page shown")
    }
}

export default new NavigationActions()
