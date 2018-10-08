import {action} from "mobx"
import AppSettingsDomainStore from "../state/SettingsDomainStore"
import {Alert} from "react-native"

class AppSettingsActions {
    @action
    saveLanguage(language) {
        AppSettingsDomainStore.language = language
        AppSettingsDomainStore.savePersistData()
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
        AppSettingsDomainStore.showAds = showAds
        AppSettingsDomainStore.savePersistData()
    }
}

export default new AppSettingsActions()
