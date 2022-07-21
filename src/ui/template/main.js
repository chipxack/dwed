import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {HomePage} from '../../pages/home'
import {Chat} from '../../components/chat'
import {Header} from '../../components/header'
import {UserMainAccount} from '../../pages/user'
import {OrgMainAccount} from '../../pages/organization'
import {Records} from '../../pages/records'
import {PrivateRoute} from '../../routes/PrivateRoutes'
import {NotFoundPage} from '../../pages/404'
import {Stream} from '../../pages/stream'
import {SettingsPage} from '../../pages/settings'
import {Reviews} from '../../pages/reviews'
import {useStore} from 'effector-react'
import {$appModel} from '../../models/app'
import {useUserStatus} from '../../hooks/app'

export const MainTemplate = () => {
    const {$app: {token}} = useStore($appModel)
    useUserStatus()

    return (
        <>
            {token && <Chat/>}
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/404' component={NotFoundPage}/>
                <PrivateRoute path='/settings' component={SettingsPage}/>
                <Route exact path='/stream/:channel_slug' component={Stream}/>
                <PrivateRoute path='/reviews' component={Reviews}/>
                <PrivateRoute path='/records' component={Records}/>
                <Route path='/@:account' component={UserMainAccount}/>
                <Route path='/:organization' component={OrgMainAccount}/>
            </Switch>
        </>
    )
}