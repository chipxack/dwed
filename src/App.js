import React, {useEffect} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {theme} from './theme'
import {ThemeProvider} from 'styled-components'
import {MainTemplate} from './ui/template'
import {CustomModal} from './components/modal'
import {CreateOrganization, Recovery, SignIn, SignUp} from './pages/auth'
import {I18nextProvider} from 'react-i18next'
import i18n from './config/i18n'
import {PrivateRoute} from './routes/PrivateRoutes'
import {accountInfoMount} from './models/accountModel'
import {$appModel, currencyListMount} from './models/app'
import {useStore} from 'effector-react'
import {Generic} from './pages/generic'
import {ImageEditor} from './UIComponents/image-editor'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'
import moment from 'moment'
import 'moment/locale/ru'
import {ENVIRONMENT_MODE} from './constants'
import {useAppDb} from './hooks/app'
import {FastAuth} from './components/fast-auth'
import {regionDetectMount} from './models/app/events'

function App() {
    const {$app: {token, prodsMode}} = useStore($appModel)

    useEffect(() => {
        if (token) {
            accountInfoMount()
        }
    }, [token])

    useEffect(() => {
        currencyListMount()
        regionDetectMount()
    }, [])

    useAppDb()

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider libInstance={moment} utils={DayjsUtils} locale='ru'>
                    <Router>
                        <CustomModal/>
                        <ImageEditor/>
                        <FastAuth/>
                        <Switch>
                            <Route exact path='/generic' component={Generic}/>
                            <Route exact path='/sign-in' component={SignIn}/>
                            <Route exact path='/sign-up' component={SignUp}/>
                            {
                                prodsMode !== ENVIRONMENT_MODE.PRODUCTION &&
                                <PrivateRoute exact path='/create-organization' component={CreateOrganization}/>
                            }
                            <Route exact path='/recovery' component={Recovery}/>
                            <Route path='/' component={MainTemplate}/>
                            <Redirect from='*' to={'/404'}/>
                        </Switch>
                    </Router>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </I18nextProvider>
    )
}

export default App
