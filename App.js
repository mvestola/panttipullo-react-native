import React from "react"
import {observer} from "mobx-react"
import {Container} from "native-base"
import ContentView from "./src/feature/app/view/ContentView"
import HeaderView from "./src/feature/app/view/HeaderView"
import AppUiState from "./src/feature/app/state/AppUiState"
import AppInitializingView from "./src/feature/app/view/AppInitializingView"

const App = observer(() => {
    if (AppUiState.showAppIsInitialising) {
        return <AppInitializingView/>
    }
    return (
        <Container>
            <HeaderView/>
            <ContentView/>
        </Container>
    )
})

export default App
