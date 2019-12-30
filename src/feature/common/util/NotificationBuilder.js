import i18n from "i18n-js"
import { Alert } from "react-native"

class NotificationBuilder {
    showNotification(title, text, onClose = () => {
    }) {
        Alert.alert(
            title,
            text,
            [
                { text: i18n.t("close"), style: "cancel", onPress: () => onClose() },
            ],
            { cancelable: false },
        )
    }
}

export default new NotificationBuilder()
