import React from 'react'
import {Route, Switch, useParams} from 'react-router-dom'
import {OrgAddSpecialistCategory} from './add-sepcialist-category'
import {OrgMedia} from './media'
import {OrgTape} from './tape'
import {OrgAddSpecialist} from './add-specialist'
import {OrgAddOffer} from './add-offer'
import {OrgOfferDetail} from './offer-detail'
import {PrivateRoute} from '../../../routes/PrivateRoutes'
import {OrgAddOffersGroup} from './add-offers-group'
import {OrgOfferings} from './offerings'
import {PERMISSIONS} from '../../../constants'
import {OrgFinanceStatistic} from './finance-statistic'
import {OrgClientsStatistic} from './clients-statistic'
import {OrgOfferingStatistic} from './offer-statistic'
import {OrgEmployeeStatistic} from './employees-statistic'
import {OrgRequestStatistic} from './request-statistic'

export const OrgContent = () => {
    const renderPath = (id) => `/:organization/${id}`
    const {organization} = useParams()

    return (
        <Switch>
            <Route
                exact
                path={renderPath('tape')}
                component={OrgTape}
            />
            <Route
                exact
                path={renderPath('media')}
                component={OrgMedia}
            />
            <Route
                exact
                path={renderPath('offerings')}
                component={OrgOfferings}
            />
            <PrivateRoute
                exact
                path={renderPath('statistics/finance')}
                component={OrgFinanceStatistic}
                redirectPath={`/404`}
                permission={PERMISSIONS.GRAND}
            />
                <PrivateRoute
                    exact
                    path={renderPath('statistics/requests')}
                    component={OrgRequestStatistic}
                    redirectPath={`/404`}
                    permission={PERMISSIONS.GRAND}
                />
            <PrivateRoute
                exact
                path={renderPath('statistics/clients')}
                component={OrgClientsStatistic}
                redirectPath={`/404`}
                permission={PERMISSIONS.GRAND}
            />
            <PrivateRoute
                exact
                path={renderPath('statistics/offer')}
                component={OrgOfferingStatistic}
                redirectPath={`/404`}
                permission={PERMISSIONS.GRAND}
            />
            <PrivateRoute
                exact
                path={renderPath('statistics/employees')}
                component={OrgEmployeeStatistic}
                redirectPath={`/404`}
                permission={PERMISSIONS.GRAND}
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/specialist_category/add')}
                component={OrgAddSpecialistCategory}
                redirectPath={`/${organization}/offerings`}
                permission='specialist'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/specialist_category/edit/:spec_cat_id')}
                component={OrgAddSpecialistCategory}
                redirectPath={`/${organization}/offerings`}
                permission='specialist'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/specialist/add')}
                component={OrgAddSpecialist}
                redirectPath={`/${organization}/offerings`}
                permission='specialist'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/specialist/edit/:spec_id')}
                component={OrgAddSpecialist}
                redirectPath={`/${organization}/offerings`}
                permission='specialist'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/offerings_group/add')}
                component={OrgAddOffersGroup}
                redirectPath={`/${organization}/offerings`}
                permission='offerings'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/offerings_group/edit/:group_id')}
                component={OrgAddOffersGroup}
                redirectPath={`/${organization}/offerings`}
                permission='offerings'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/add')}
                component={OrgAddOffer}
                redirectPath={`/${organization}/offerings`}
                permission='offerings'
            />
            <PrivateRoute
                exact
                path={renderPath('offerings/edit/:offering_id')}
                component={OrgAddOffer}
                redirectPath={`/${organization}/offerings`}
                permission='offerings'
            />
            <Route
                exact
                path={renderPath('offerings/:offering_id')}
                component={OrgOfferDetail}
            />
        </Switch>
    )
}