import {action} from "mobx"
import AppSettingsDomainStore from "../state/SettingsDomainStore"
import {Alert} from "react-native"
import Analytics from "../../common/util/Analytics"

class AppSettingsActions {
    @action
    saveLanguage(language) {
        AppSettingsDomainStore.language = language
        AppSettingsDomainStore.persistSettingsData()
        Analytics.logEvent("Language setting changed")
    }

    @action
    saveShowAds(showAds) {
        AppSettingsDomainStore.showAds = showAds
        if (!showAds) {
            Alert.alert(
                "Vahvista muutos",
                "Mainoksia näyttämällä tuet ohjelman kehitystä. Haluatko varmasti poistaa mainokset?",
                [
                    {text: "Peruuta", style: "cancel", onPress: () => this._doSaveShowAds(true)},
                    {text: "OK", onPress: () => this._doSaveShowAds(false)},
                ],
                {cancelable: false},
            )
        } else {
            this._doSaveShowAds(showAds)
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
