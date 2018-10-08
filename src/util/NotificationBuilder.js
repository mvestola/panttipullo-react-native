import {Alert} from "react-native"

class NotificationBuilder {

    showNotification(title, text, onClose = () => {}) {
        Alert.alert(
            title,
            text,
            [
                {text: "Sulje", style: "cancel", onPress: () => onClose()},
            ],
            {cancelable: false},
        )
    }
}

export default new NotificationBuilder()
