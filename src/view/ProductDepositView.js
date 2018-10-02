import React from 'react';
import _ from "lodash"
import {Text, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";

const ProductDepositView = ({depositResponse}) => {
    if (!_.isNil(depositResponse.deposit)) {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Icon name='check-circle' type='material-community' color='green' />
                    <Text style={styles.hasDepositTitle}> Tästä saa pantin!</Text>
                </View>
                <Text style={styles.depositValue}>Pantin määrä: {depositResponse.deposit}</Text>
                <Text style={styles.depositExtraInfo}>EAN: {depositResponse.ean}</Text>
                <Text style={styles.depositExtraInfo}>Nimi: {depositResponse.productName}</Text>
                <Text style={styles.depositExtraInfo}>Tyyppi: {depositResponse.productType}</Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>"{depositResponse.message}"</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Icon name='alert-circle' type='material-community' color='red' />
                    <Text style={styles.noDepositTitle}> Tästä ei ehkä saa panttia</Text>
                </View>
                <Text style={styles.depositExtraInfo}>Viivakoodi: {ProductDepositDomainStore.barcode}</Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>"{depositResponse.message}"</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        padding: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#C2C2C2',
        backgroundColor: '#F2F2F2',
    },
    hasDepositTitle: {
        color: 'green',
        fontSize: 18,
        marginBottom: 20,
    },
    noDepositTitle: {
        color: 'red',
        fontSize: 18,
        marginBottom: 20,
    },
    depositValue: {
        fontSize: 20,
        marginBottom: 20,
    },
    depositExtraInfo: {
        color: "#525252",
    },
    depositExtraDesc: {
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
    }
});

export default ProductDepositView
