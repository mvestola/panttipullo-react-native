import {action, observable} from "mobx"
import {ERROR, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import AppSettingsApi from "../api/AppSettingsApi";

class AppSettingsDomainStore {

    @observable appVersion = "0.0.1"
    @observable notification
    @observable isBarcodeScanDisabled
    @observable status

    constructor() {
        Expo.Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
        Expo.Amplitude.logEvent(`App initialized with version ${this.appVersion}`)
        this._init()
    }

    _init() {
        this.notification = null
        this.isBarcodeScanDisabled = true
        this.status = LOADING
        AppSettingsApi.fetchProductionLiveSettings()
            .then((response) => response.json())
            .then((jsonResponse) => this.onServerSuccessResponse(jsonResponse))
            .catch(this.onServerErrorResponse)
    }

    @action.bound
    onServerSuccessResponse(response) {
        this.status = LOADED
        const settingsForVersion = response[this.appVersion]
        this.notification = settingsForVersion.disabledNotification
        this.isBarcodeScanDisabled = settingsForVersion.disabled
        if (this.notification !== null) {
            this.notification = "Showing notification to user"
        }
    }

    @action.bound
    onServerErrorResponse(error) {
        console.log(error)
        this.isBarcodeScanDisabled = false
        this.notification = null
        this.status = ERROR
        Expo.Amplitude.logEvent("Fetching application settings failed")
    }

}

export default new AppSettingsDomainStore()
