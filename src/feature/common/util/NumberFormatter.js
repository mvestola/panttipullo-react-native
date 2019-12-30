import i18n from "i18n-js"
import numeral from "numeral"

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

export const formatCurrency = (numberValue) => {
    return `${numeral(numberValue).format("0,0.00")} €`
}

export const formatPieces = (numberValue) => {
    return `${numberValue} ${i18n.t("pcs")}`
}
