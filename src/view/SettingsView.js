import React from 'react';
import _ from "lodash"
import {StyleSheet} from 'react-native';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Body, Button, Card, CardItem, Icon, Left, List, ListItem, Picker, Right, Switch, Text, View} from 'native-base';
import {observer} from "mobx-react";
import AppSettingsDomainStore from "../state/AppSettingsDomainStore";
import AppSettingsActions from "../actions/AppSettingsActions";

const SettingsView = observer(() => {
    return (
        <List>
            <ListItem itemDivider>
                <Text>Yleiset asetukset</Text>
            </ListItem>
            <ListItem icon>
                <Left>
                        <Icon active name="sign-text" type='MaterialCommunityIcons' />
                </Left>
                <Body>
                <Text>Näytä mainoksia</Text>
                </Body>
                <Right>
                    <Switch value={AppSettingsDomainStore.showAds} onValueChange={(val) => AppSettingsActions.saveShowAds(val)} />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                        <Icon active name="language" type='FontAwesome' />
                </Left>
                <Body>
                    <Picker
                        mode="dropdown"
                        placeholder="Kieli"
                        selectedValue={AppSettingsDomainStore.language}
                        onValueChange={(val) => AppSettingsActions.saveLanguage(val)}
                    >
                        <Picker.Item label="Kieli: Suomi" value="fi" />
                        <Picker.Item label="Kieli: Englanti" value="en" />
                    </Picker>
                </Body>
            </ListItem>
        </List>
    )
})

export default SettingsView
