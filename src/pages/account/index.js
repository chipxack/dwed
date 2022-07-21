import {Block, NavBlock, TemplateInfoBlock} from "../../ui/atoms";
import React from "react";
import {useStore} from "effector-react";
import {$isDataPending, AccountPageHooks} from "../../models/account";
import {ContentInfoBlock, LeftInfoBlock} from "../../ui/template";
import {NavLink, useParams, Switch, Route} from "react-router-dom";
import {AccountJobs, AccountOffers} from "./template";
import {Row} from 'antd';
import {JobRequest} from "./template/job-request";
import Cookies from "js-cookie";

export const AccountPage = () => {
    const {account} = useParams();


    const isDataPending = useStore($isDataPending);

    AccountPageHooks();
    const currentJob = Cookies.get('currentJob') && JSON.parse(Cookies.get('currentJob'))

    const header =
        <NavBlock>
            <NavLink to={`/@${account}/tape`}>{t('tape')}</NavLink>
            <NavLink to={`/@${account}/media`}>{t('media_files')}</NavLink>
            <NavLink to={`/@${account}/offers`}>dwfegrfh</NavLink>
            <NavLink to={{
                pathname: `/@${account}/jobs`,
                search: currentJob ? `job_id=${currentJob.id}` : ''
            }}>Работа</NavLink>
            <NavLink to={`/@${account}/invoices`}>Инвойсы</NavLink>
        </NavBlock>

    return (
        <Block style={{minHeight: 'calc(100vh - 92px)'}} jContent='middle' aItems='start'>
            <TemplateInfoBlock> 
                <LeftInfoBlock
                    username={isDataPending.$accountInfo.data && isDataPending.$accountInfo.data.username}
                    subs={isDataPending.$accountInfo.data && isDataPending.$accountInfo.data.subs}
                    image={isDataPending.$accountInfo.data && isDataPending.$accountInfo.data.avatar}
                    name={isDataPending.$accountInfo.data && isDataPending.$accountInfo.data.name && `${isDataPending.$accountInfo.data.name} ${isDataPending.$accountInfo.data.lastname}`}
                    category={isDataPending.$accountInfo.data && isDataPending.$accountInfo.data.main_cat && isDataPending.$accountInfo.data.main_cat.name}
                    subscribersData={isDataPending.$accountSubscribers.data && isDataPending.$accountSubscribers.data.results}
                    subscriptionsData={isDataPending.$accountSubscriptions.data && isDataPending.$accountSubscriptions.data.results}
                />
                <Row type='flex' style={{flex: 1, flexDirection: 'column'}}>
                    <ContentInfoBlock
                        header={header}
                    />
                    <Switch>
                        <Route exact path='/@:account/offers'>
                            <AccountOffers/>
                        </Route>
                        <Route exact path='/@:account/jobs'>
                            <AccountJobs />
                        </Route>
                        <Route exact path={'/@:account/jobs/:jobId/order/:orderId'}>
                            <JobRequest />
                        </Route>
                        <Route exact path={'/@:account/jobs/:jobId/order/:orderId/qr_code/:qrCode'}>
                            <JobRequest />
                        </Route>
                        <Route exact path={'/@:account/:selfJob/order/:orderId'}>
                            <JobRequest />
                        </Route>
                        <Route exact path={'/@:account/:selfJob/order/:orderId/qr_code/:qrCode'}>
                            <JobRequest />
                        </Route>
                    </Switch>
                </Row>

            </TemplateInfoBlock>
        </Block>
    )
};