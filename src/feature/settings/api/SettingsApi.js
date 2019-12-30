class Api {
    url = "https://raw.githubusercontent.com/mvestola/panttipullo-react-native/master/production-live-settings.json"

    fetchProductionLiveSettings() {
      return fetch(this.url,
        {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        })
    }
}

export const SettingsApi = new Api()
