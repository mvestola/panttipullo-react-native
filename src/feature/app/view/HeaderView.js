import React from "react"
import {Body, Button, Header, Icon, Left, Right, Subtitle, Title,} from "native-base"
import {observer} from "mobx-react"
import NavigationActions from "../actions/NavigationActions"
import AppUiState from "../state/AppUiState"

const HeaderView = observer(() => (
    <Header
        style={{backgroundColor: "#009A49"}}
        androidStatusBarColor="#004521"
    >
        <Left>
            {
                AppUiState.showBackButton
                && (
                    <Button transparent>
                        <Icon name="arrow-back" onPress={() => NavigationActions.showMainPage()}/>
                    </Button>
                )
            }
        </Left>
        <Body>
        <Title>Panttipullo</Title>
        <Subtitle>{AppUiState.subtitleText}</Subtitle>
        </Body>
        <Right>
            <Button transparent onPress={() => NavigationActions.showSettings()}>
                <Icon name="settings" type="MaterialIcons"/>
            </Button>
            <Button transparent onPress={() => NavigationActions.showInfo()}>
                <Icon name="information" type="MaterialCommunityIcons"/>
            </Button>
            <Button transparent onPress={() => NavigationActions.showHelp()}>
                <Icon name="help-circle" type="MaterialCommunityIcons"/>
            </Button>

        </Right>
    </Header>
))

export default HeaderView
