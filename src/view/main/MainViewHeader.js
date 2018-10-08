import MainStyles from "./MainStyles"
import {Button, Icon, Row, View} from "native-base"
import React from "react"
import {Text} from "react-native"

const MainViewHeader = ({title, onClear}) => (
    <Row style={MainStyles.sectionHeader}>
        <View style={MainStyles.sectionHeaderWithClearButton}>
            <Text style={MainStyles.sectionHeaderText}>{title}</Text>
            <Button
                small
                onPress={onClear}
                style={MainStyles.clearIcon}
            >
                <Icon name="delete-forever" type="MaterialCommunityIcons"/>
            </Button>
        </View>
    </Row>
)

export default MainViewHeader