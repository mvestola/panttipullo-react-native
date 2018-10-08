import React from "react"
import {Body, Icon, Left, List, ListItem, Picker, Right, Switch, Text,} from "native-base"
import {observer} from "mobx-react"
import AppSettingsDomainStore from "./state/SettingsDomainStore"
import AppSettingsActions from "./actions/AppSettingsActions"

const SettingsView = observer(() => (
    <List>
        <ListItem itemDivider>
            <Text>Yleiset asetukset</Text>
        </ListItem>
        <ListItem icon>
            <Left>
                <Icon active name="sign-text" type="MaterialCommunityIcons"/>
            </Left>
            <Body>
            <Text>Näytä mainoksia</Text>
            </Body>
            <Right>
                <Switch value={AppSettingsDomainStore.showAds}
                        onValueChange={val => AppSettingsActions.saveShowAds(val)}/>
            </Right>
        </ListItem>
        <ListItem icon>
            <Left>
                <Icon active name="language" type="FontAwesome"/>
            </Left>
            <Body>
            <Picker
                mode="dropdown"
                selectedValue={AppSettingsDomainStore.language}
                onValueChange={val => AppSettingsActions.saveLanguage(val)}
            >
                <Picker.Item label="Kieli: Suomi" value="fi"/>
            </Picker>
            </Body>
        </ListItem>
    </List>
))

export default SettingsView
