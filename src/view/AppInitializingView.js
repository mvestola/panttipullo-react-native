import React from "react"
import {
    Col, Container, Content, Grid, Spinner,
} from "native-base"
import {observer} from "mobx-react"
import {StyleSheet} from "react-native"

const AppInitializingView = observer(() => (
    <Container>
        <Content contentContainerStyle={styles.container} style={{padding: 10}}>
            <Grid style={{alignItems: "center", justifyContent: "center"}}>
                <Col>
                    <Spinner color="blue"/>
                </Col>
            </Grid>
        </Content>
    </Container>
))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
export default AppInitializingView
