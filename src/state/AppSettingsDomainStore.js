import {action, observable} from "mobx"
import {AsyncStorage, ToastAndroid} from "react-native"
import {toJS} from "mobx/lib/mobx"
import {ERROR, LOADED, LOADING} from "../constants/domainStoreStatusConstants"
import AppSettingsApi from "../api/AppSettingsApi"

class AppSettingsDomainStore {
    @observable appVersion = "0.0.1"
    @observable notification
    @observable isBarcodeScanDisabled
    @observable status
    @observable fontsAreLoaded
    @observable showAds
    @observable language

    constructor() {
        Expo.Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
        Expo.Amplitude.logEvent(`App initialized with version ${this.appVersion}`)
        this._init()
        this._loadPersistData()
    }

    _init() {
        this.notification = null
        this.isBarcodeScanDisabled = true
        this.fontsAreLoaded = false
        this.status = LOADING
        this.showAds = false
        this.language = "fi"
        this._loadCustomFonts()
        AppSettingsApi.fetchProductionLiveSettings()
            .then(response => response.json())
            .then(jsonResponse => this.onServerSuccessResponse(jsonResponse))
            .catch(this.onServerErrorResponse)
    }

    _loadCustomFonts() {
        Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        }).then(this.onFontsLoaded)
    }

    @action.bound
    onFontsLoaded() {
        this.fontsAreLoaded = true
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

    savePersistData = async () => {
        try {
            await AsyncStorage.setItem("showAds", toJS(this.showAds).toString())
            await AsyncStorage.setItem("language", toJS(this.language))
            ToastAndroid.show("Asetukset tallennettu!", ToastAndroid.SHORT)
        } catch (error) {
            console.log("error saving persist data", error)
        }
    }

    _loadPersistData = async () => {
        try {
            const showAds = await AsyncStorage.getItem("showAds")
            const language = await AsyncStorage.getItem("language")

            if (showAds !== null) {
                this.showAds = showAds === "true"
            } else {
                this.showAds = true
            }
            if (language !== null) {
                this.language = language
            }
        } catch (error) {
            console.log("error loading persistent data", error)
        }
    }
}

export default new AppSettingsDomainStore()
