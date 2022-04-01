import React, { useCallback, useState } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import * as MdIcon from "react-icons/md";
import Swal from 'sweetalert2';
import searchAddressService, { searchAddressByLatLonService } from '../../services/searchAddressService';
import '../../styles/SearchAddress.scss'

const SearchAddress = React.forwardRef((props, ref) => {

    const { nameForm, className, handleChange, selectValue, onBlur, getAddress } = props
    const [searchText, setSearchText] = useState(selectValue ? selectValue : "")
    const [listItemsSearch, setListItemsSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);

    const search = useCallback(
        (address) => {
            setIsLoading(true);
            setIsListOpen(true);
            searchAddressService(address)
                .then((response) => {
                    if (response) {
                        setListItemsSearch(response)
                    }
                })
                .then((result) => {
                    setIsLoading(false);
                })
                .catch((err) => console.log(err))
        },
        [],
    )

    const get = useCallback(
        (lat, lon) => {
            searchAddressByLatLonService(lat, lon)
                .then((response) => {
                    if (response) {
                        getAddress(response)
                    }
                })
                .then((result) => {
                    setIsLoading(false);
                })
        },
        [],
    )

    const change = (e) => {
        setSearchText(e.target.value);
    }

    const selectedAddress = (item) => {
        if (item.display_name) {
            setSearchText(item.display_name);
            setIsListOpen(false);
            get(item.lat, item.lon);
        } else {
            Swal.fire({
                text: "Error. Dirección no válida",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
              });
        }
    }

    return (
        <div className="position-relative">
            <div className="d-flex flex-row">
                <Form.Control
                    name={nameForm}
                    type="text"
                    value={searchText}
                    className={`w-100 ${className}`}
                    onBlur={onBlur}
                    onChange={(e) => change(e)}
                />
                <Button variant="outline-secondary" onClick={(e) => { search(searchText) }}>
                    <MdIcon.MdSearch /></Button>
            </div>
            <ListGroup className="search-address__list" >
                {!isLoading && isListOpen ? listItemsSearch?.map((item, i) => {
                    return (
                        <div key={`${item}${i}`} className="search-address__list-item">
                            <ListGroup.Item action onClick={() => { selectedAddress(item) }}>
                                <MdIcon.MdRoom className='me-2' />
                                {item.display_name}
                            </ListGroup.Item>
                        </div>
                    )
                    
                })
                : <> {isListOpen && <ListGroup.Item>Cargando...</ListGroup.Item>} </>
                }
                {!isLoading && isListOpen && listItemsSearch.length === 0 &&
                    <div className="search-address__list-item">
                        <ListGroup.Item action onClick={() => setIsListOpen(false)} className="fst-italic">
                            Dirección no encontrada
                        </ListGroup.Item>
                    </div>
                }

            </ListGroup>
        </div>
    )
})

export default SearchAddress