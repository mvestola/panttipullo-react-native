import React from 'react';
import {Body, Button, Header, Icon, Left, Right, Subtitle, Title} from 'native-base';

const HeaderView = () => {
    return (
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body>
                <Title>Panttipullo</Title>
                <Subtitle>Asetukset</Subtitle>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name='settings' type='MaterialIcons' />
                </Button>
                <Button transparent>
                    <Icon name='information' type='MaterialCommunityIcons' />
                </Button>
            </Right>
        </Header>
    )
}

export default HeaderView
