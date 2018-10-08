class Analytics {
    constructor() {
        Expo.Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
    }

    logEvent(event) {
        Expo.Amplitude.logEvent(event)
    }
}

export default new Analytics()
