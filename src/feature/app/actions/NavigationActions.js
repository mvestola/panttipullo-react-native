import { action } from "mobx"
import { BackHandler } from "react-native"
import {ProductDepositDomainStore} from "../../productDeposit/state/ProductDepositDomainStore"
import {AppUiState} from "../state/AppUiState"
import {logEvent} from "../../common/util/Analytics"

class Actions {
    constructor() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            if (AppUiState.isOtherThanMainView) {
                this.showMainPage()
                return true
            }
            return false
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
    showRecentScans() {
        this._resetNavigation()
        AppUiState.showRecentScans = true
        logEvent("Recent scans page shown")
    }

    @action
    showInfo() {
        this._resetNavigation()
        AppUiState.showInfo = true
        logEvent("Info page shown")
    }

    @action
    showHelp() {
        this._resetNavigation()
        AppUiState.showHelp = true
        logEvent("Help page shown")
    }

    @action
    showSettings() {
        this._resetNavigation()
        AppUiState.showSettings = true
        logEvent("Settings page shown")
    }
}

export const NavigationActions =  new Actions()
