import React, {useState} from 'react'
import {useProfile} from '../../../hooks/profile'
import {useStore} from 'effector-react'
import {HeaderQR, ProfileSection, SignBlock} from '../atoms'
import {LoginSvg} from '../../../media'
import {AuthOrgList, AuthSpecialistList, AuthUserList} from '../maleculas'
import {PopoverView} from '../../popover'
import {useTranslation} from 'react-i18next'
import {$accountModel, getCurrentProfile} from '../../../models/accountModel'
import {$appModel} from '../../../models/app'
import {useLocation} from 'react-router-dom'
import {CommonAvatar} from '../../../UIComponents/avatar'
import {AccountPopoverContent} from './account-popover-content'
import {PROFILE_TYPE} from '../../../constants'
import {Col, Row} from 'antd'
import {FastAuthView} from '../../../pages/auth/templates'
import {FastAuthModal} from '../../../UIComponents/global-styles'
import {fastAuthVisibleStatus} from '../../../models/app/events'

export const Account = () => {
    const ddd = useStore($accountModel)
    const {changeAccount, changeOrgProfile} = useProfile()
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()
    const {$app: {token, showFastAuth}} = useStore($appModel)
    const {pathname} = useLocation()

    const {$profiles: {currentProfile}, $accountInfo: {data: accountData}} = ddd

    const menu = [
        {
            id: 'accounts',
            component: <AuthUserList changeAccount={changeAccount}/>
        },
        {
            id: 'organizations',
            component: <AuthOrgList changeAccount={changeOrgProfile}/>
        },
        {
            id: 'my_works',
            component: (
                <AuthSpecialistList
                    changeAccount={(slug_name) => getCurrentProfile({slug_name, type: PROFILE_TYPE.USER})}
                />
            )
        }
    ]


    if (!token) {
        return (
            <>
                <FastAuthModal
                    visible={showFastAuth}
                    onCancel={() => fastAuthVisibleStatus(false)}
                    width='100%'
                    closable={false}
                    title={false}
                >
                    <FastAuthView onClose={() => fastAuthVisibleStatus(false)}/>
                </FastAuthModal>
                <SignBlock onClick={() => fastAuthVisibleStatus(true)}>{t('enter')}<LoginSvg/></SignBlock>
                {/*<SignLink to='/sign-in'>{t('enter')}<LoginSvg/></SignLink>*/}
            </>

        )
    }

    return (
        <ProfileSection>
            {
                accountData && currentProfile
                && (
                    <>
                        {
                            currentProfile.type === PROFILE_TYPE.USER
                            && (
                                <Row gutter={16}>
                                    {/* <Col> */}
                                    {/* <HeaderNotification> */}
                                    {/* <BellSvg/> */}
                                    {/*{*/}
                                    {/*    count.not_seen*/}
                                    {/*        ? (*/}
                                    {/*            <HeaderNotificationCount>*/}
                                    {/*                {count.not_seen}*/}
                                    {/*            </HeaderNotificationCount>*/}
                                    {/*        ) : null*/}
                                    {/*}*/}
                                    {/* </HeaderNotification> */}
                                    {/* </Col> */}
                                    <Col>
                                        <HeaderQR
                                            to={'/records/unregistered'}
                                            isActive={() => pathname.indexOf('merchandise') !== -1}
                                        />
                                    </Col>
                                </Row>
                            )
                        }

                        <PopoverView
                            content={<AccountPopoverContent menu={menu}/>}
                            open={open}
                            handleClose={() => setOpen(false)}
                        >
                            <div>
                                <CommonAvatar imgUrl={currentProfile.avatar} size={32}/>
                            </div>
                        </PopoverView>
                    </>
                )
            }
        </ProfileSection>
    )
}
