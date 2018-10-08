import {action, observable, when, configure, runInAction, toJS} from "mobx"
import {AsyncStorage, ToastAndroid} from "react-native"
import { Constants } from 'expo'
import {ERROR, LOADED, LOADING} from "../constants/domainStoreStatusConstants"
import AppSettingsApi from "../api/AppSettingsApi"
import NotificationBuilder from "../util/NotificationBuilder"

configure({
    enforceActions: "always"
})

class AppSettingsDomainStore {
    @observable isBarcodeScanDisabled = true
    @observable notification = null
    @observable notificationsDismissed = null
    @observable status = LOADING
    @observable fontsAreLoaded = false
    @observable showAds = false
    @observable language = "fi"

    constructor() {
        Expo.Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
        Expo.Amplitude.logEvent(`App initialized with version ${this.getAppVersion()}`)
        this._loadCustomFonts()
        AppSettingsApi.fetchProductionLiveSettings()
            .then(response => response.json())
            .then(jsonResponse => this.onServerSuccessResponse(jsonResponse))
            .catch(this.onServerErrorResponse)
        this._loadPersistData()
        when(
            () => this.notification !== null && this.notificationsDismissed !== null && !this.notificationsDismissed.includes(this.notification.id),
            () => NotificationBuilder.showNotification("Viesti kehittäjältä", this.notification.message, () => this._onNotificationDismissed(this.notification.id))
        )
    }

    _loadCustomFonts() {
        Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        }).then(this.onFontsLoaded)
    }

    getAppVersion() {
        return Constants.manifest.version
    }

    @action.bound
    onFontsLoaded() {
        this.fontsAreLoaded = true
    }

    @action.bound
    onServerSuccessResponse(response) {
        this.status = LOADED
        const settingsForVersion = response[this.getAppVersion()]
        if(settingsForVersion) {
            if (settingsForVersion.notification) {
                this.notification = settingsForVersion.notification
            }
            this.isBarcodeScanDisabled = settingsForVersion.disabled
        }
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

            runInAction(() => {
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
            })
        } catch (error) {
            console.log("error loading persistent data", error)
        }
    }
}

export default new AppSettingsDomainStore()
