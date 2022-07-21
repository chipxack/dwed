import React, {useState} from 'react'
import {TemplateForm} from './template-form'
import {TemplateList} from './template-list'

export const Templates = ({spec_id, onSelect}) => {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            {
                showForm
                    ? <TemplateForm spec_id={spec_id} setShowForm={() => setShowForm(false)}/>
                    : <TemplateList onSelect={onSelect} setShowForm={() => setShowForm(true)} spec_id={spec_id}/>
            }
        </>
    )
}