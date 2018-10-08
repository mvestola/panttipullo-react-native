import {action, observable, when} from "mobx"
import {AsyncStorage, ToastAndroid} from "react-native"
import {toJS} from "mobx/lib/mobx"
import {ERROR, LOADED, LOADING} from "../constants/domainStoreStatusConstants"
import AppSettingsApi from "../api/AppSettingsApi"
import NotificationBuilder from "../util/NotificationBuilder"

class AppSettingsDomainStore {
    @observable appVersion = "0.0.1"
    @observable isBarcodeScanDisabled
    @observable notification
    @observable notificationsDismissed
    @observable status
    @observable fontsAreLoaded
    @observable showAds
    @observable language

    constructor() {
        Expo.Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
        Expo.Amplitude.logEvent(`App initialized with version ${this.appVersion}`)
        this._init()
        this._loadPersistData()
        when(
            () => this.notification !== null && this.notificationsDismissed !== null && !this.notificationsDismissed.includes(this.notification.id),
            () => NotificationBuilder.showNotification("Viesti kehittäjältä", this.notification.message, () => this._onNotificationDismissed(this.notification.id))
        )
    }

    _init() {
        this.isBarcodeScanDisabled = true
        this.notificationsDismissed = null
        this.notification = null
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
        if (settingsForVersion.notification) {
            this.notification = settingsForVersion.notification
        }
        this.isBarcodeScanDisabled = settingsForVersion.disabled
    }

    @action.bound
    onServerErrorResponse(error) {
        console.log(error)
        this.isBarcodeScanDisabled = false
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

    @action.bound
    _onNotificationDismissed = (id) => {
        this.notificationsDismissed.push(id)
        this._persistDismissedNotifications()
    }

    _persistDismissedNotifications = async () => {
        try {
            await AsyncStorage.setItem("notificationsDismissed", JSON.stringify(toJS(this.notificationsDismissed)))
        } catch (error) {
            console.log("error saving persist data", error)
        }
    }

    _loadPersistData = async () => {
        try {
            const showAds = await AsyncStorage.getItem("showAds")
            const language = await AsyncStorage.getItem("language")
            const notificationsShown = await AsyncStorage.getItem("notificationsDismissed")

            if (showAds !== null) {
                this.showAds = showAds === "true"
            } else {
                this.showAds = true
            }
            if (language !== null) {
                this.language = language
            }
            if (notificationsShown !== null) {
                this.notificationsDismissed = JSON.parse(notificationsShown)
            } else {
                this.notificationsDismissed = []
            }
        } catch (error) {
            console.log("error loading persistent data", error)
        }
    }
}

export default new AppSettingsDomainStore()
