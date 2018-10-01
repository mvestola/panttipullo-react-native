import {computed} from "mobx"
import ProductDepositDomainStore from "./ProductDepositDomainStore"

class AppUiState {

    @computed get
    showLoadingSpinner() {
        return ProductDepositDomainStore.barcode !== null
    }
}

export default new AppUiState()
