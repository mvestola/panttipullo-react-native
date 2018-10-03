class ProductDepositApi {
    fetchProductionLiveSettings() {
        return fetch("https://raw.githubusercontent.com/mvestola/panttipullo-react-native/master/production-live-settings.json",
            {
                headers: {
                    Accept: 'application/json'
                },
                method: "GET"
            })
    }
}

export default new ProductDepositApi()
