import i18n from "i18n-js"
import numeral from "numeral"

class NumberFormatter {
    constructor() {
        numeral.register("locale", "fi", {
            delimiters: {
                thousands: " ",
                decimal: ",",
            },
            currency: {
                symbol: "€",
            },
        })

        numeral.locale("fi")
    }

    formatCurrency(numberValue) {
        return `${numeral(numberValue).format("0,0.00")} €`
    }

    formatPieces(numberValue) {
        return `${numberValue} ${i18n.t("pcs")}`
    }
}

export default new NumberFormatter()
