import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainView from "./src/view/MainView"

const App = () => {
    return (
        <View style={styles.container}>
            <MainView />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
