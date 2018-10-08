import {action} from "mobx"
import AppSettingsDomainStore from "../state/AppSettingsDomainStore"

class AppSettingsActions {
    @action
    saveLanguage(language) {
        AppSettingsDomainStore.language = language
        AppSettingsDomainStore.savePersistData()
    }

    @action
    saveShowAds(showAds) {
        AppSettingsDomainStore.showAds = showAds
        AppSettingsDomainStore.savePersistData()
    }
}

export default new AppSettingsActions()
