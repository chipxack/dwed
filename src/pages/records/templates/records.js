import React from 'react'
import {MerchandiseWireframe} from '../../../UIComponents/wireframe'
import {MerchandiseContent, MerchandiseMenu} from '../organisms'

export const Records = () => {
    return (
        <MerchandiseWireframe
            header={<MerchandiseMenu/>}
            content={<MerchandiseContent/>}
        />
    )
}