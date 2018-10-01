import React from 'react';
import _ from "lodash"
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";

const ProductDepositView = ({depositResponse}) => {
    if (!_.isNil(depositResponse.deposit)) {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 20
            }}>
                <Text style={{marginBottom: 20}}><Ionicons name="md-checkmark" size={32} color="green"/> Tuote on pantillinen.</Text>
                <Text style={{fontWeight: 'bold'}}>Pantti: {depositResponse.deposit}</Text>
                <Text>Skannattu viivakoodi: {ProductDepositDomainStore.barcode}</Text>
                <Text>EAN: {depositResponse.ean}</Text>
                <Text>Tuotteen nimi: {depositResponse.productName}</Text>
                <Text>Tuotteen tyyppi: {depositResponse.productType}</Text>
                <Text style={{fontStyle: 'italic', marginTop: 10}}>"{depositResponse.message}"</Text>
            </View>
        )
    } else {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 20
            }}>
                <Text style={{marginBottom: 20}}><Ionicons name="md-alert" size={32} color="red"/> Tuote ei ole pantillinen</Text>
                <Text>Skannattu viivakoodi: {ProductDepositDomainStore.barcode}</Text>
                <Text style={{fontStyle: 'italic', marginTop: 10}}>"{depositResponse.message}"</Text>
            </View>
        )
    }
}

export default ProductDepositView
