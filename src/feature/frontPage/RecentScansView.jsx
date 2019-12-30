import React from "react"
import i18n from "i18n-js"
import { observer } from "mobx-react"
import {ProductDepositActions} from "../productDeposit/actions/ProductDepositActions"
import {RecentScanList} from "./RecentScanList"
import {MainViewHeader} from "./MainViewHeader"

export const RecentScansView = observer(() => (
            <React.Fragment>
                <MainViewHeader title={i18n.t("latestScans")} onClear={() => ProductDepositActions.clearRecentScans()} key="header" />
                <RecentScanList key="content" />
            </React.Fragment>
    ))
