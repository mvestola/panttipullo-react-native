import React from 'react';
import {Text, View} from 'react-native';
import {DEPOSIT_EXISTS} from "../constants/depositResponseConstants";
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";

const ProductDepositView = ({depositResponse}) => {
    if (depositResponse.status === DEPOSIT_EXISTS) {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Text>{depositResponse.message}</Text>
                <Text>EAN: {depositResponse.ean}</Text>
                <Text>Tuotteen nimi: {depositResponse.productName}</Text>
                <Text>Tuotteen tyyppi: {depositResponse.productType}</Text>
                <Text>Pantti: {depositResponse.deposit}</Text>
            </View>
        )
    } else {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Text>Skannattu viivakoodi: {ProductDepositDomainStore.barcode}</Text>
                <Text>{depositResponse.message}</Text>
            </View>
        )
    }
}

export default ProductDepositView
