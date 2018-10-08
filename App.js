import React from "react"
import {observer} from "mobx-react"
import {Container} from "native-base"
import ContentView from "./src/view/ContentView"
import HeaderView from "./src/view/HeaderView"
import AppUiState from "./src/state/AppUiState"
import AppInitializingView from "./src/view/AppInitializingView"

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
