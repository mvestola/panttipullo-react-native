import React from 'react';
import _ from "lodash"
import {StyleSheet} from 'react-native';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import {Body, Button, Card, CardItem, Icon, Left, List, ListItem, Switch, Text, View} from 'native-base';

const InfoView = () => {
    return (
        <Card>
            <CardItem header>
                <Text>Panttipullo v1.0.1</Text>
            </CardItem>
            <CardItem>
                <Body>
                <Text>
                    Panttipullo on applikaatio...
                    kotisivulle
                    Privacy policy (tietosuojakäytäntö)
                </Text>
                </Body>
            </CardItem>
        </Card>
    )
}

export default InfoView
