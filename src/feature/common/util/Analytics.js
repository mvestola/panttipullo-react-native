import * as Amplitude from "expo-analytics-amplitude"

class Analytics {
    constructor() {
        Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")
    }

    logEvent(event) {
        Amplitude.logEvent(event)
    }
}

export default new Analytics()
