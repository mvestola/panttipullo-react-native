import {StyleSheet} from "react-native"

export default StyleSheet.create({
    sectionHeader: {
        backgroundColor: "#009A49",
        padding: 10,
    },
    sectionHeaderText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
    sectionContent: {
        backgroundColor: "white",
        padding: 10,
    },
    sectionHeaderWithClearButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    clearIcon: {
        backgroundColor: "#c30101",
    },
})
