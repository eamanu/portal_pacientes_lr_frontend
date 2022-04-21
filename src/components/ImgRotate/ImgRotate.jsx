import { useState } from "react";
import notImg from '../../assets/statics/img-idn-not-found.jpg';
import * as MdIcon from 'react-icons/md';

const ImgRotate = ({ img }) => {

    const nImg = notImg //hardcode
    //rotate img
    const [rotate, setRotate] = useState(false);
    const [deg, setDeg] = useState(0);
    const rotateImg = () => {
        setRotate(true)
        setDeg(deg + 90)
    }

    return (
        <>
            <div className="d-flex justify-content-end my-1 my-tooltip">
                <button className='btn text-secondary btn-icon' onClick={(e) => rotateImg()}><MdIcon.MdRotateRight /></button>
                <span className="tiptext">
                   Rotar 90º
                </span>
            </div>
            <div className="admin-patient__img-container">
                <img className={`admin-patient__img ${rotate ? 'rotate-img' : ''}`} style={{ transform: `rotate(${deg}deg)` }} src={nImg} alt={`document image patient ${nImg}`} />
            </div>
        </>
    )
}

export default ImgRotate