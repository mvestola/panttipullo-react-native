import React from "react"
import {StyleSheet} from "react-native"
import {Body, Card, CardItem, Icon, Text, View,} from "native-base"
import ScanBarcodeButton from "../../common/view/ScanBarcodeButton"

const ProductDepositCard = ({title, titleStyle, iconStyle, iconName, iconType, children}) => (
    <Card>
        <CardItem header>
            <View style={styles.iconWithText}>
                <Icon name={iconName} type={iconType} style={iconStyle}/>
                <Text style={titleStyle}> {title}</Text>
            </View>
        </CardItem>
        <CardItem>
            <Body>
            {children}
            </Body>
        </CardItem>
        <CardItem>
            <Body>
            <ScanBarcodeButton/>
            </Body>
        </CardItem>
    </Card>
)

const styles = StyleSheet.create({
    iconWithText: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    }
})

export default ProductDepositCard