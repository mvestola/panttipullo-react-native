import React from "react"
import {observer} from "mobx-react"
import {Container} from "native-base"
import AppContentView from "./src/feature/app/view/AppContentView"
import AppHeaderView from "./src/feature/app/view/AppHeaderView"
import AppUiState from "./src/feature/app/state/AppUiState"
import AppInitializingView from "./src/feature/app/view/AppInitializingView"

const App = observer(() => {
    if (AppUiState.showAppIsInitialising) {
        return <AppInitializingView/>
    }
    return (
        <Container>
            <AppHeaderView/>
            <AppContentView/>
        </Container>
    )
})

export default App
