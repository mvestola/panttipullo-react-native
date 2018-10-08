import React from "react"
import {observer} from "mobx-react"
import {Container} from "native-base"
import ContentView from "./ContentView"
import HeaderView from "./HeaderView"
import AppUiState from "../state/AppUiState"
import AppInitializingView from "./AppInitializingView"

const MainView = observer(() => {
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

export default MainView
