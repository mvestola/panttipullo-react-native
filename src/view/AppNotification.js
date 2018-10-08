import React from "react"
import {StyleSheet, Text} from "react-native"

const AppNotification = ({message}) => (
    <Text style={styles.message}>{message}</Text>
)

const styles = StyleSheet.create({
    message: {
        color: "red",
        fontSize: 14,
        margin: 20,
        textAlign: "center",
    },
})

export default AppNotification
