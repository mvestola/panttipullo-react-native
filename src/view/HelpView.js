import React from 'react';
import _ from "lodash"
import {StyleSheet} from 'react-native';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Body, Card, CardItem, Icon, Text, View} from 'native-base';

const HelpView = () => {
    return (
        <Card style={{marginBottom: 20}}>
            <CardItem header>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='help-circle' type='MaterialCommunityIcons' style={{fontSize: 26, color: 'blue'}} />
                    <Text> Ohje</Text>
                </View>
            </CardItem>
            <CardItem>
                <Body>
                <Text>Skannaa viivakoodi pullosta tai tölkistä alla olevalla painikkeella ja saat tietää saako juomapakkauksesta pantin.</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

export default HelpView
