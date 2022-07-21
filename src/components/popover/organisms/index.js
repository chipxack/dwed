import React from 'react'
import {PopoverContent} from "../atoms";
import {Popover} from "antd";

export default ({open, handleClose, children, content, overlayClassName}) => {
    return (
        <Popover
            overlayClassName={overlayClassName || 'avatar-popover'}
            isOpen={open}
            position='bottom'
            placement='bottomRight'
            trigger='click'
            onVisibleChange={handleClose}
            content={<PopoverContent>{content}</PopoverContent>}
        >
            {children}
        </Popover>
    )
}