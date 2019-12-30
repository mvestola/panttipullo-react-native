import i18n from "i18n-js"
import React from "react"
import {
 Body, Icon, Left, List, ListItem, Picker, Right, Switch, Text,
} from "native-base"
import { observer } from "mobx-react"
import {SettingsDomainStore} from "../state/SettingsDomainStore"
import {AppSettingsActions} from "../actions/AppSettingsActions"

export const SettingsView = observer(() => (
    <List>
        <ListItem itemDivider>
            <Text>{i18n.t("generalSettings")}</Text>
        </ListItem>
        <ListItem icon>
            <Left>
                <Icon active name="sign-text" type="MaterialCommunityIcons" />
            </Left>
            <Body>
            <Text>{i18n.t("showAds")}</Text>
            </Body>
            <Right>
                <Switch
                    value={SettingsDomainStore.showAds}
                    onValueChange={(val) => AppSettingsActions.saveShowAds(val)}
                />
            </Right>
        </ListItem>
        <ListItem icon>
            <Left>
                <Icon active name="language" type="FontAwesome" />
            </Left>
            <Body>
            <Picker
                mode="dropdown"
                selectedValue={SettingsDomainStore.language}
                onValueChange={(val) => AppSettingsActions.saveLanguage(val)}
            >
                <Picker.Item label={`${i18n.t("language")}: Suomi`} value="fi" />
                <Picker.Item label={`${i18n.t("language")}: English`} value="en" />
            </Picker>
            </Body>
        </ListItem>
    </List>
))
