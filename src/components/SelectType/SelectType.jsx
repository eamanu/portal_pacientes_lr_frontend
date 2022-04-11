import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const SelectType = React.forwardRef((props, ref) => {

    const { variants, name, handleChange, onBlur, selectValue, disabled } = props;
    const [idValue, setIdValue] = useState(selectValue ? selectValue : false)
    const change = (e) => {
            handleChange(e)
            setIdValue(e.target.value)
    }

    return (
        <Form.Select className='m-0'
            name={name}
            type="number"
            disabled={disabled}
            value={idValue}
            onBlur={onBlur}
            onChange={(e) => change(e)}
        >
            {!idValue && <option>Seleccionar...</option>}
            {variants.map((variant) => {
                return (
                    <option key={`${variant.id}-${variant.name}`} value={variant.id} >{variant.name}</option>
                )
            })}
        </Form.Select>
    )
})
export default SelectType;