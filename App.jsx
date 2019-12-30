import React from "react"
import {observer} from "mobx-react"
import {View} from "native-base"
import { AppContentView } from "./src/feature/app/view/AppContentView"
import {AppHeaderView} from "./src/feature/app/view/AppHeaderView"
import {AppUiState} from "./src/feature/app/state/AppUiState"
import {AppInitializingView} from "./src/feature/app/view/AppInitializingView"
import {SettingsDomainStore} from "./src/feature/settings/state/SettingsDomainStore"

const App = observer(() => {
    if (AppUiState.showAppIsInitialising) {
        return <AppInitializingView/>
    }
    return (
        <View style={{flex: 1}}>
            <AppHeaderView/>
            <AppContentView key={`language-${SettingsDomainStore.language}`} />
        </View>
    )
})

export default App
