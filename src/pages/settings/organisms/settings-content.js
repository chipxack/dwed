import React, {useMemo} from 'react'
import {PaymentSettings} from './payment'
import {ProfileSettings} from './profile'
import {Route, Switch} from 'react-router-dom'
import {Coupon} from './coupons'
import {CouponForm} from '../maleculas'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {PROFILE_TYPE} from '../../../constants'
import {UserSecuritySettings} from './user-security'
import {AccountVerifying} from '../../../components/account-verifying'


export const SettingsContent = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const org_profile = useMemo(() => {
        return currentProfile?.type === PROFILE_TYPE.ORGANIZATION
    }, [currentProfile?.type])

    const isVerification = useMemo(() => {
        return currentProfile?.type === PROFILE_TYPE.USER && currentProfile?.status !== 5
    }, [currentProfile?.type, currentProfile?.status])

    return (
        <Switch>
            <Route path="/settings/profile" component={ProfileSettings} />
            {/*<Route path="/settings/contacts" component={ContactSettings} />*/}
            {/*<Route path="/settings/notification" component={NotificationSettings} />*/}
            {
                !org_profile && <Route path="/settings/security" component={UserSecuritySettings} />
            }
            {/*<Route path="/settings/chat-settings" component={ChatSettings} />*/}
            <Route path="/settings/payment" component={PaymentSettings} />
            {org_profile && <Route path="/settings/coupon/edit/:coupon_id" component={CouponForm} />}
            {org_profile && <Route path="/settings/coupon/add" component={CouponForm} />}
            {org_profile && <Route path="/settings/coupon" component={Coupon} />}
            {isVerification && <Route path="/settings/verification" component={AccountVerifying} />}
        </Switch>
    )
}
