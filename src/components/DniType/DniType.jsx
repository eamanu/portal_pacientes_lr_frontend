import React from 'react';
import { InputGroup, Dropdown, FormControl, SplitButton } from 'react-bootstrap';

 
export default function DniType() {
    return (
        <InputGroup className="mb-3">
            <SplitButton
                variant="light"
                title="Tipo"
                id="segmented-button-dropdown-1"
            >
                <Dropdown.Item>DNI</Dropdown.Item>
                <Dropdown.Item>CI</Dropdown.Item>
                <Dropdown.Item>LC</Dropdown.Item>
                <Dropdown.Item>LE</Dropdown.Item>
                <Dropdown.Item>CUIT</Dropdown.Item>
                <Dropdown.Item>CUIL</Dropdown.Item>
                <Dropdown.Item>OTRO</Dropdown.Item>
            </SplitButton>
            <FormControl aria-label="Text input with dropdown button" />
        </InputGroup>
    )
}
