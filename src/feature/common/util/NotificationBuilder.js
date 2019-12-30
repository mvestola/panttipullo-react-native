import i18n from "i18n-js"
import { Alert } from "react-native"

export const showNotification = (title, text, onClose = () => {}) => {
    Alert.alert(
        title,
        text,
        [
            { text: i18n.t("close"), style: "cancel", onPress: () => onClose() },
        ],
        { cancelable: false },
    )
}
