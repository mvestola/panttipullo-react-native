import * as Amplitude from "expo-analytics-amplitude"

Amplitude.initialize("aa669bc10383e87442d83dbfc4522f2d")

export const logEvent = (event) => {
  Amplitude.logEvent(event)
}
