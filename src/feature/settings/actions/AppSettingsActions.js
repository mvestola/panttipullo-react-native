import i18n from "i18n-js"
import { action } from "mobx"
import { Alert } from "react-native"
import AppSettingsDomainStore from "../state/SettingsDomainStore"
import Analytics from "../../common/util/Analytics"

class AppSettingsActions {
    @action
    saveLanguage(language) {
        if (language !== AppSettingsDomainStore.language) {
            AppSettingsDomainStore.language = language
            i18n.locale = language
            AppSettingsDomainStore.persistSettingsData()
            Analytics.logEvent("Language setting changed")
        }
    }

    @action
    saveShowAds(showAds) {
        if (showAds !== AppSettingsDomainStore.showAds) {
            AppSettingsDomainStore.showAds = showAds
            if (!showAds) {
                Alert.alert(
                    i18n.t("confirmChange"),
                    i18n.t("confirmAdRemoval"),
                    [
                        { text: i18n.t("cancel"), style: "cancel", onPress: () => this._doSaveShowAds(true) },
                        { text: i18n.t("ok"), onPress: () => this._doSaveShowAds(false) },
                    ],
                    { cancelable: false },
                )
            } else {
                this._doSaveShowAds(showAds)
            }
        }
    }

    @action.bound
    _doSaveShowAds(showAds) {
        if (showAds) {
            Analytics.logEvent("Show ad setting changed: do show ads")
        } else {
            Analytics.logEvent("Show ad setting changed: do not show ads")
        }
        AppSettingsDomainStore.showAds = showAds
        AppSettingsDomainStore.persistSettingsData()
    }
}

export default new AppSettingsActions()
