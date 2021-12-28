import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerComponent() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            className='form-control'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            popperClassName="some-custom-class"
            popperPlacement="top-end"
            popperModifiers={[
                {
                    name: "offset",
                    options: {
                        offset: [5, 10],
                    },
                },
                {
                    name: "preventOverflow",
                    options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                    },
                },
            ]}
        />
    );
}
