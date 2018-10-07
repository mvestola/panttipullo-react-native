import React from 'react';
import _ from "lodash"
import {StyleSheet} from 'react-native';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Body, Button, Card, CardItem, Icon, Left, List, ListItem, Picker, Right, Switch, Text, View} from 'native-base';

const SettingsView = () => {
    return (
        <List>
            <ListItem itemHeader>
                <Text>Yleiset asetukset</Text>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="sign-text" type='MaterialCommunityIcons' />
                    </Button>
                </Left>
                <Body>
                <Text>Näytä mainoksia</Text>
                </Body>
                <Right>
                    <Switch value={true} />
                </Right>
            </ListItem>
            <ListItem>
                <Picker
                    note={false}
                    mode="dropdown"
                    placeholder="Kieli"
                    selectedValue="fi"
                    onValueChange={() => console.log("picker val changed")}
                >
                    <Picker.Item label="Suomi" value="fi" />
                    <Picker.Item label="Englanti" value="en" />
                </Picker>
            </ListItem>
        </List>
    )
}

export default SettingsView
