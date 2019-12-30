import {
 action, configure, observable, runInAction, toJS, when,
} from "mobx"
import { AsyncStorage, ToastAndroid } from "react-native"
import * as Localization from 'expo-localization'
import i18n from "i18n-js"
import Constants from "expo-constants"
import * as Font from "expo-font"
import { ERROR, LOADED, LOADING } from "../../common/constants/domainStoreStatusConstants"
import AppSettingsApi from "../api/SettingsApi"
import NotificationBuilder from "../../common/util/NotificationBuilder"
import Analytics from "../../common/util/Analytics"
import { fi } from "../../common/i18n/fi"
import { en } from "../../common/i18n/en"

configure({
    enforceActions: "always",
})

i18n.fallbacks = true;
i18n.translations = { fi, en }
i18n.locale = Localization.locale

class SettingsDomainStore {
    @observable isBarcodeScanDisabled = true

    @observable notification = null

    @observable notificationsDismissed = null

    @observable status = LOADING

    @observable fontsAreLoaded = false

    @observable showAds = false

    @observable language = "fi" // TODO: get from locale?

    @observable settingsAreLoaded = false

    constructor() {
        this._loadCustomFonts()
        AppSettingsApi.fetchProductionLiveSettings()
            .then((response) => response.json())
            .then((jsonResponse) => this.onServerSuccessResponse(jsonResponse))
            .catch(this.onServerErrorResponse)
        this._loadSettingsData()
        when(
            () => this.notification !== null
                && this.notificationsDismissed !== null
                && !this.notificationsDismissed.includes(this.notification.id),
            () => {
                Analytics.logEvent("Showing notification from developer")
                NotificationBuilder.showNotification(
                    i18n.t("messageFromDeveloper"),
                    this.notification.message,
                    () => this._onNotificationDismissed(this.notification.id),
                )
            },
        )
    }

    _loadCustomFonts() {
        Font.loadAsync({
            Roboto: require("../../../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
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
        if (settingsForVersion) {
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
        this.notification = null
        this.status = ERROR
        Analytics.logEvent("Fetching application settings failed")
    }

    persistSettingsData = async () => {
        try {
            await AsyncStorage.setItem("showAds", toJS(this.showAds).toString())
            await AsyncStorage.setItem("language", toJS(this.language))
            ToastAndroid.show(i18n.t("settingsSaved"), ToastAndroid.SHORT)
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

    _loadSettingsData = async () => {
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
                    i18n.locale = language
                }
                if (notificationsShown !== null) {
                    this.notificationsDismissed = JSON.parse(notificationsShown)
                } else {
                    this.notificationsDismissed = []
                }
                this.settingsAreLoaded = true
            })
        } catch (error) {
            console.log("error loading persistent data", error)
            runInAction(() => {
                this.settingsAreLoaded = true
            })
        }
    }
}

export default new SettingsDomainStore()
