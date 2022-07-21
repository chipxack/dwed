import React from "react";
import {SignIn} from "../../pages/auth";
import {useStore} from "effector-react";
import {FastAuthModal} from "./atoms";
import {$widgets, toggleAuthModal} from "../../models/widgets";


export const FastAuth = () => {
    const modalVisible = useStore($widgets).$modal.authModalVisible

    return (
        <FastAuthModal
            closable={false}
            title={false}
            width={'100%'}
            visible={modalVisible}
            footer={null}
            onCancel={() => toggleAuthModal(false)}
        >
            <SignIn closeAuthModal={() => toggleAuthModal(false)}/>
        </FastAuthModal>
    )
}