import React from "react"
import { observer } from "mobx-react"
import ProductDepositActions from "../productDeposit/actions/ProductDepositActions"
import MainViewHeader from "./MainViewHeader"
import RecentScanList from "./RecentScanList"

const RecentScansView = observer(() => (
        [
            <MainViewHeader
                title="VIIMEISIMMÄT SKANNAUKSESI"
                key="header"
                onClear={() => ProductDepositActions.clearRecentScans()}
            />,
            <RecentScanList key="content" />,
        ]
    ))

export default RecentScansView
