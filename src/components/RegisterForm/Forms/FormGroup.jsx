import React, { useCallback, useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import institutionsServices from '../../../services/institutionsServices';
import identificationsTypeServices from '../../../services/parametricServices';
import { variantsGender } from '../../ComponentsData';
import DatePickerComponent from '../../DatePickerComponent';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import SelectType from '../../SelectType';

const FormGroup = React.forwardRef((props, ref) => {

  const {
    inputType,
    label,
    name,
    type,
    value,
    className,
    onChange,
    onBlur,
    variants,
    selectValue,
    handleChange,
    maxDate } = props

  const vaGender = variantsGender
  const [options, setOptions] = useState([]);

  const getInstitutionsVariants = useCallback(
    () => {
      institutionsServices()
        .then((res) => {
          const inst = res
          return inst;
        })
        .then((res) => {
          if(res?.length > 0) {
            setOptions(res);
            return options
          }
        })
        .catch((err) => { console.log(err) })
    },
    [],
  )

  const getDNIVariants = useCallback(
    () => {
      identificationsTypeServices()
        .then((res) => {
          const types = res
          return types;
        })
        .then((res) => {
          if(res?.length > 0) {
            setOptions(res);
            return options
          }
        })
        .catch((err) => { console.log(err) })
    },
    [],
  )

  const getGenderVariants = () => {
    setOptions(vaGender);
    return options
  }

  useEffect(() => {
    if (variants === "variantsInstitutions") {
      getInstitutionsVariants();
    }
    if (variants === "variantsDNI") {
      getDNIVariants();
    }
    if (variants === "variantsGender") {
      getGenderVariants();
    }
  }, [])


  return (
    <Form.Group>
      <Form.Label className="mb-0">{label}</Form.Label>
      {inputType === 'input' &&
        <Form.Control
          name={name}
          value={value}
          type={type ? type : 'text'}
          className="form-control"
          onChange={onChange}
          onBlur={onBlur}
          onPaste={(e) => {
            e.preventDefault();
            return false
          }}
        />
      }
      {inputType === 'select' &&
        <SelectType
          name={name}
          variants={options}
          selectValue={selectValue}
          handleChange={handleChange}
        />
      }
      {inputType === 'datePicker' &&
        <DatePickerComponent
          name={name}
          selectValue={selectValue}
          handleChange={handleChange}
          maxDate={maxDate}
        />
      }
      {
        inputType === 'radio' &&
        <>
          <br />
          <input
            type={type}
            name={name}
            className="form-check-input"
            value={true}
            onChange={onChange}
          /> <label className="form-label me-3">
            Sí
          </label>
          <input
            type={type}
            name={name}
            className="form-check-input"
            value={false}
            onChange={onChange}
          /> <label className="form-label">
            No
          </label>
        </>
      }
      {
        inputType === 'file' &&
        <>
          <input className="form-control border mb-3" type="file" id="formFile" accept=".png,.jpg" />
          <br />
        </>
      }

    </Form.Group>
  )
});

export default FormGroup