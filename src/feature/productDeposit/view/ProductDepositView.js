import React from "react"
import _ from "lodash"
import {StyleSheet} from "react-native"
import {Body, Card, CardItem, Icon, Text, View,} from "native-base"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import ScanBarcodeButton from "../../common/view/ScanBarcodeButton"

const ProductDepositView = ({depositResponse}) => {
    if (!_.isNil(depositResponse.deposit)) {
        return (
            <Card>
                <CardItem header>
                    <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                        <Icon name="check-circle" type="MaterialCommunityIcons" style={{fontSize: 26, color: "green"}}/>
                        <Text style={styles.hasDepositTitle}> Tästä saa pantin!</Text>
                    </View>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text style={styles.depositValue}>
                        Pantin määrä:
                        {depositResponse.deposit}
                    </Text>
                    <Text style={styles.depositExtraInfo}>
                        EAN:
                        {depositResponse.ean}
                    </Text>
                    <Text style={styles.depositExtraInfo}>
                        Nimi:
                        {depositResponse.productName}
                    </Text>
                    <Text style={styles.depositExtraInfo}>
                        Tyyppi:
                        {depositResponse.productType}
                    </Text>
                    <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                        Palpan kuvaus: &quot;
                        {depositResponse.message}
                        &quot;
                    </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                    <ScanBarcodeButton/>
                    </Body>
                </CardItem>
            </Card>
        )
    }
    return (
        <Card>
            <CardItem header>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                    <Icon name="alert-circle" type="MaterialCommunityIcons" style={{fontSize: 26, color: "red"}}/>
                    <Text style={styles.noDepositTitle}> Tästä ei ehkä saa panttia</Text>
                </View>
            </CardItem>
            <CardItem>
                <Body>
                <Text style={styles.depositExtraInfo}>
                    Viivakoodi:
                    {ProductDepositDomainStore.barcode}
                </Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                    Palpan kuvaus: &quot;
                    {depositResponse.message}
                    &quot;
                </Text>
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                <ScanBarcodeButton/>
                </Body>
            </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        padding: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#C2C2C2",
        backgroundColor: "#F2F2F2",
    },
    hasDepositTitle: {
        color: "green",
        fontSize: 18,
    },
    noDepositTitle: {
        color: "red",
        fontSize: 18,
    },
    depositValue: {
        fontSize: 20,
        marginBottom: 20,
    },
    depositExtraInfo: {
        color: "#525252",
    },
    depositExtraDesc: {
        fontStyle: "italic",
        marginTop: 10,
    },
})

export default ProductDepositView
