import React from "react"
import {Body, Card, CardItem, Text,} from "native-base"
import {observer} from "mobx-react"
import AppSettingsDomainStore from "../settings/state/SettingsDomainStore"
import Hyperlink from "react-native-hyperlink"
import {StyleSheet} from "react-native"

const InfoView = observer(() => (
    <Card>
        <CardItem header>
            <Text>Panttipullo v{AppSettingsDomainStore.getAppVersion()}</Text>
        </CardItem>
        <CardItem>
            <Body>
            <Hyperlink linkDefault={true} linkStyle={styles.hyperlink}>
                <Text>
                    Skannaa viivakoodi juomapakkauksesta ja katso saako siitä panttia.
                    Ohjelma hakee tiedot Palpan sivuilta: https://extra.palpa.fi/pantillisuus.
                    Ohjelma on yksityinen projekti, ei siis Palpan kehittämä.
                    Ohjelmaan liittyvissä asioissa, ota yhteyttä kehittäjään, ei Palpaan.
                </Text>
            </Hyperlink>
            </Body>
        </CardItem>
        <CardItem>
            <Body>
            <Hyperlink linkDefault={true}
                       linkStyle={[styles.hyperlink, styles.appLink]}
                       linkText="Ohjelman kotisivulle">
                <Text style={styles.appLink}>
                    https://mvestola.github.io/panttipullo-react-native/
                </Text>
            </Hyperlink>
            </Body>
        </CardItem>
        <CardItem>
            <Body>
            <Hyperlink linkDefault={true}
                       linkStyle={[styles.hyperlink, styles.appLink]}
                       linkText="Tietosuojakäytäntö (englanniksi)">
                <Text style={styles.appLink}>
                    https://mvestola.github.io/panttipullo-react-native/privacy-policy.html
                </Text>
            </Hyperlink>
            </Body>
        </CardItem>
    </Card>
))

const styles = StyleSheet.create({
    hyperlink: {
        color: "#2980b9"
    },
    appLink: {
        fontSize: 16,
    },
})

export default InfoView
