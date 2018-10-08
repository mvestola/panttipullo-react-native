import React from "react"
import {Col, Grid, Text,} from "native-base"
import {observer} from "mobx-react"
import {toJS} from "mobx"
import ProductDepositDomainStore from "../productDeposit/state/ProductDepositDomainStore"
import {FlatList, StyleSheet} from "react-native"
import moment from "moment"

const RecentScanList = observer(() => {
    const lastScanResultsSorted = toJS(ProductDepositDomainStore.lastScanResultsSorted)
    if (lastScanResultsSorted.length > 0) {
        return (
            <FlatList
                data={lastScanResultsSorted}
                ListHeaderComponent={(
                    <Grid style={styles.listHeaderContainer}>
                        <Col size={colValues.deposit}>
                            <Text style={styles.listHeader}>Pantti</Text>
                        </Col>
                        <Col size={colValues.date}>
                            <Text style={styles.listHeader}>Aika</Text>
                        </Col>
                        <Col size={colValues.desc}>
                            <Text style={styles.listHeader}>Kuvaus</Text>
                        </Col>
                    </Grid>
                )}
                renderItem={({item}) => (
                    <Grid style={styles.listItem}>
                        <Col size={colValues.deposit}>
                            {
                                item.deposit ?
                                    <Text style={[styles.listItemText, styles.listItemHighlight, {color: "green"}]}>
                                        {item.deposit}
                                    </Text> :
                                    <Text style={[styles.listItemText, styles.listItemHighlight]}>0 €</Text>
                            }
                        </Col>
                        <Col size={colValues.date}>
                            <Text style={[styles.listItemText, styles.listItemNotImportant]}>
                                {moment(item.date).format("DD.MM.YYYY HH:mm:ss")}
                            </Text>
                        </Col>
                        <Col size={colValues.desc}>
                            {item.productName && (
                                <Text style={[styles.listItemText, styles.listItemHighlight]}>
                                    {item.productName}
                                </Text>
                            )}
                            <Text style={[styles.listItemText, styles.listItemNotImportant]}>{item.productType}</Text>
                            <Text style={[styles.listItemText, styles.listItemNotImportant]}>EAN: {item.ean}</Text>
                        </Col>
                    </Grid>
                )}
            />
        )
    } else {
        return <Text style={[styles.listItemText, styles.noRecentScans]}>Ei tallennettuja skannauksia</Text>
    }
})

const colValues = {
    deposit: 15,
    date: 25,
    desc: 60
}

const styles = StyleSheet.create({
    listHeader: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
    listHeaderContainer: {
        padding: 5,
        backgroundColor: "#5d9a53",
    },
    listItem: {
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 1,
        padding: 5,
        borderStyle: "solid",
    },
    listItemText: {
        color: "#989898",
    },
    listItemNotImportant: {
        fontSize: 11,
        color: "#989898",
    },
    listItemHighlight: {
        fontSize: 12,
        fontWeight: "bold",
    },
    noRecentScans: {
        fontSize: 14,
        padding: 10,
    },
})

export default RecentScanList
