import i18n from "i18n-js"
import React from "react"
import {
  Body, Card, CardItem, Icon, Text, View,
} from "native-base"
import { ScrollView } from "react-native"

export const HelpView = () => (
  <ScrollView>
    <Card style={{ marginBottom: 20 }}>
      <CardItem header>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Icon name="help-circle" type="MaterialCommunityIcons" style={{ fontSize: 26, color: "blue" }} />
          <Text>{` ${i18n.t("appInstructionsTitle")}`}</Text>
        </View>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{i18n.t("appInstructions")}</Text>
        </Body>
      </CardItem>
    </Card>
  </ScrollView>
)
