import React from "react"
import {
    Body, Card, CardItem, Text,
} from "native-base"

const InfoView = () => (
    <Card>
        <CardItem header>
            <Text>Panttipullo v1.0.1</Text>
        </CardItem>
        <CardItem>
            <Body>
            <Text>
                Panttipullo on applikaatio...
                kotisivulle
                Privacy policy (tietosuojakäytäntö)
            </Text>
            </Body>
        </CardItem>
    </Card>
)

export default InfoView
