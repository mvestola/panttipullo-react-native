class ProductDepositApi {

    url = "https://extra.palpa.fi/pantillisuus/"

    fetchCookieAndCsrfToken() {
        return fetch(this.url,
            {
                headers: {
                    Accept: 'text/html',
                    Host: 'extra.palpa.fi'
                },
                credentials: "include",
                method: "GET"
            })
    }

    fetchProductDepositInformation(barcode, csrfTokenHeader, csrfToken) {
        return fetch(this.url,
            {
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    [csrfTokenHeader]: csrfToken
                },
                referrer: this.url,
                referrerPolicy: "no-referrer-when-downgrade",
                body: JSON.stringify({
                    ean: barcode
                }),
                method: "POST",
                mode: "cors"
            })
    }

}

export default new ProductDepositApi()
