import React from "react"
import { observer } from "mobx-react"
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob"
import {SettingsDomainStore} from "../../settings/state/SettingsDomainStore"

setTestDeviceIDAsync("EMULATOR")

export const Advertisement = observer(() => {
    if (SettingsDomainStore.showAds) {
        return (
            <AdMobBanner
                style={{
                    backgroundColor: "#EEEEEE",
                    borderStyle: "solid",
                    borderBottomWidth: 1,
                    borderBottomColor: "#EEEEEE",
                }}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-0260854390576047/9007788100"
            />
        )
    }
    return null
})
