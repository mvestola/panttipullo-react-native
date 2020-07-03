import i18n from "i18n-js"
import React from "react"
import {
  Body, Card, CardItem, Text,
} from "native-base"
import { observer } from "mobx-react"
import Hyperlink from "react-native-hyperlink"
import { ScrollView, StyleSheet } from "react-native"
import { SettingsDomainStore } from "../settings/state/SettingsDomainStore"

export const InfoView = observer(() => (
  <ScrollView>
    <Card>
      <CardItem header>
        <Text>{`Panttipullo v${SettingsDomainStore.getAppVersion()}`}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Hyperlink linkDefault linkStyle={styles.hyperlink}>
            <Text>{i18n.t("appDescription")}</Text>
          </Hyperlink>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Hyperlink
            linkDefault
            linkStyle={[styles.hyperlink, styles.appLink]}
            linkText={i18n.t("appHomepage")}
          >
            <Text style={styles.appLink}>
              https://mvestola.github.io/panttipullo-react-native/
            </Text>
          </Hyperlink>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Hyperlink
            linkDefault
            linkStyle={[styles.hyperlink, styles.appLink]}
            linkText={i18n.t("privacyPolicy")}
          >
            <Text style={styles.appLink}>
              https://mvestola.github.io/panttipullo-react-native/privacy-policy.html
            </Text>
          </Hyperlink>
        </Body>
      </CardItem>
    </Card>
  </ScrollView>
))

const styles = StyleSheet.create({
  hyperlink: {
    color: "#2980b9",
  },
  appLink: {
    fontSize: 16,
  },
})
