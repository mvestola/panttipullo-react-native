import React from "react"
import {observer} from "mobx-react"
import ProductDepositActions from "../../actions/ProductDepositActions"
import MainViewHeader from "./MainViewHeader"
import RecentScanList from "../RecentScanList"

const RecentScansView = observer(() => {
    return (
        [
            <MainViewHeader title="VIIMEISIMMÄT SKANNAUKSESI"
                            key="header"
                            onClear={() => ProductDepositActions.clearRecentScans()}/>,
            <RecentScanList key="content"/>
        ]
    )
})

export default RecentScansView
