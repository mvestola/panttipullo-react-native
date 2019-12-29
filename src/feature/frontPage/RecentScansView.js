import React from "react"
import { observer } from "mobx-react"
import ProductDepositActions from "../productDeposit/actions/ProductDepositActions"
import RecentScanList from "./RecentScanList"
import MainStyles from "./MainStyles"
import {Button, Icon, Text, View, Left} from "native-base"
import MainViewHeader from "./MainViewHeader"

const RecentScansView = observer(() => (
            <React.Fragment>
                <MainViewHeader title="Viimeisimmät skannauksesi" onClear={() => ProductDepositActions.clearRecentScans()} key="header" />
                <RecentScanList key="content" />
            </React.Fragment>
    ))

export default RecentScansView
