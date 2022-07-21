import React from 'react'
import {ModalCustom} from '../atoms'

export const Modal = (
    {
        modalIsOpen,
        setModalIsOpen,
        title,
        component,
        ...otherProps
    }
) => {

    return (
        <ModalCustom
            title={title}
            visible={modalIsOpen}
            footer={null}
            onCancel={() => setModalIsOpen(false)}
            {...otherProps}
            destroyOnClose
        >
            {component}
        </ModalCustom>
    )
}