import {action, observable} from "mobx"
import {ERROR, LOADED, LOADING} from "../constants/domainStoreStatusConstants";
import AppSettingsApi from "../api/AppSettingsApi";

class AppSettingsDomainStore {

    @observable appVersion = "0.0.1"
    @observable notification
    @observable isBarcodeScanDisabled
    @observable status

    constructor() {
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
    }

    @action.bound
    onServerErrorResponse(error) {
        console.log(error)
        this.isBarcodeScanDisabled = true
        this.notification = "Ohjelman asetusten lataaminen epäonnistui. Sulje ohjelma ja yritä uudelleen."
        this.status = ERROR
    }

}

export default new AppSettingsDomainStore()
