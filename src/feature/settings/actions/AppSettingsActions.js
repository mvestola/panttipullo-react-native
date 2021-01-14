import i18n from "i18n-js"
import { action, makeObservable } from "mobx"
import { Alert } from "react-native"
import { SettingsDomainStore } from "../state/SettingsDomainStore"
import { logEvent } from "../../common/util/Analytics"

class Actions {
  constructor() {
    makeObservable(this)
  }

  @action
  saveLanguage(language) {
    if (language !== SettingsDomainStore.language) {
      SettingsDomainStore.language = language
      i18n.locale = language
      SettingsDomainStore.persistSettingsData()
      logEvent("Language setting changed")
    }
  }

  @action
  saveShowAds(showAds) {
    if (showAds !== SettingsDomainStore.showAds) {
      SettingsDomainStore.showAds = showAds
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
      logEvent("Show ad setting changed: do show ads")
    } else {
      logEvent("Show ad setting changed: do not show ads")
    }
    SettingsDomainStore.showAds = showAds
    SettingsDomainStore.persistSettingsData()
  }
}

export const AppSettingsActions = new Actions()
