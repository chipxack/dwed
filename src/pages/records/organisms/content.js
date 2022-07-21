import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Unregistered} from './unregistered'
import {MyNotes} from './my-notes'
import {Checkout} from './checkout'
import {RecordDetail} from './record-detail'

export const MerchandiseContent = () => {
    return (
        <Switch>
            <Route exact path='/records/unregistered' component={Unregistered}/>
            <Route exact path='/records/registered' component={MyNotes}/>
            <Route exact path='/records/checkout' component={Checkout}/>
            <Route exact path='/records/:order_id' component={RecordDetail}/>
        </Switch>
    )
}