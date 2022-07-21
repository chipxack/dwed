import React from 'react'
import {Route, Switch, useParams} from "react-router-dom";
import {UserTape} from "./tape";
import {UserMedia} from "./media";
import {UserOffers} from "./offers";
import {PrivateRoute} from "../../../routes/PrivateRoutes";
import {UserJob} from "./jobs";
import {UserJobDetail} from "./user-job-detail";
import {AccountJobTemplate} from '../../../components/account-job'

export const UserContent = () => {
    const {account} = useParams()
    return (
        <Switch>
            <Route exact path='/@:account/tape' component={UserTape}/>
            {
               ( account === 'mukhsinjon' || account === 'ravshan' || account === 'chipxack' || account === 'kabulov' || account === 'fayz' || account === 'xurshid' || account === 'yodgor') &&
                <Route path='/@:account/media' component={UserMedia}/>
            }
            <Route exact path='/@:account/offerings' component={UserOffers}/>
            {/*<PrivateRoute*/}
            {/*    exact*/}
            {/*    path='/@:account/offerings/add_offer'*/}
            {/*    component={UserAddOffer}*/}
            {/*    redirectPath={`/@${account}/offerings`}*/}
            {/*/>*/}
            {/*<PrivateRoute*/}
            {/*    exact*/}
            {/*    path='/@:account/offerings/add_offers_group'*/}
            {/*    component={UserAddOffersGroup}*/}
            {/*    redirectPath={`/@${account}/offerings`}*/}
            {/*/>*/}
            <PrivateRoute
                exact
                path='/@:account/jobs'
                component={UserJob}
                redirectPath={`/@${account}/offerings`}
            />
            <PrivateRoute
                exact
                path='/@:account/jobs/:job_id/templates'
                component={AccountJobTemplate}
                redirectPath={`/@${account}/offerings`}
            />
            <PrivateRoute
                exact
                path='/@:account/jobs/request/:orderId'
                component={UserJobDetail}
                redirectPath={`/@${account}/offerings`}
            />
        </Switch>
    )
}
