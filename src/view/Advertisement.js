import React from "react"
import AppSettingsDomainStore from "../state/AppSettingsDomainStore"
import {observer} from "mobx-react"
import {AdMobBanner} from "expo"

const Advertisement = observer(() => {
    if (AppSettingsDomainStore.showAds) {
        return (
            <AdMobBanner
                style={{
                    backgroundColor: "#EEEEEE",
                }}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-0260854390576047/9007788100"
                testDeviceID="EMULATOR"
            />
        )
    } else {
        return null
    }
})

export default Advertisement
