import React from "react"
import {
 Body, Card, CardItem, Icon, Text, View,
} from "native-base"

const HelpView = () => (
    <Card style={{ marginBottom: 20 }}>
        <CardItem header>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Icon name="help-circle" type="MaterialCommunityIcons" style={{ fontSize: 26, color: "blue" }} />
                <Text> Ohjelman käyttöohje</Text>
            </View>
        </CardItem>
        <CardItem>
            <Body>
            <Text>
                Skannaa viivakoodi pullosta tai tölkistä "Skannaa uusi viivakoodi" -painikkeella
                ja saat tietää saako juomapakkauksesta pantin. Klikkaa vain painiketta ja kohdista
                kameran kuva viivakoodiin. Kamera tunnistaa viivakoodin automaattisesti yleensä
                parissa sekunnissa.
            </Text>
            </Body>
        </CardItem>
    </Card>
)

export default HelpView
