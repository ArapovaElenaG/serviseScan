import React from 'react';
import './Input.scss';
import eye_not_visible from './images/eye_not_visible.svg';
import eye_visible from './images/eye_visible.svg';
import infoCircle from './images/info-circle.svg';
import {useSelector, useDispatch} from 'react-redux';
import {showHidePassword} from '../../../../store/actions';



function Input ({name, type, id, validate, invalidValue, placeholder, tooltip}) {

    const [touched, setTouched] = React.useState(false);
    const [invalid, setInvalid] = React.useState('');

    const dispatch = useDispatch();
    const passwordVisible = useSelector(state => state.loginReduсer.passwordVisible);


    const handleChange = (value) => {
        if (validate(id, value)) {setInvalid('')}
        else if (!value) {setInvalid('Это поле не может быть пустым')}
        else {setInvalid(invalidValue)}
    }

    const handleBlur = () => {setTouched(true)}

    const clickEyePas = () => {dispatch(showHidePassword())}


    return (
        <div 
            className="wrapperInput" 
            // dataTooltip={tooltip}
        >
            <div className='wrapperLabel'>
                <label htmlFor={id} className='label'>{name}</label>
                {tooltip && 
                <div className='question' dataTooltip={tooltip}>
                    <img src={infoCircle} alt="Подсказка"/>
                </div>
                }
            </div>
            
            <input 
                type={type} 
                id={id} 
                className={`input ${(invalid && id !== 'passwordAut') ? 'inputInvalid' : ''}`}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => handleBlur()} 
                placeholder={placeholder} 
                // pattern='/\+7\d{10}/' для этого псевдокласс .input:invalid
            />
            <div className='wrapperError'>
                {(touched && invalid) && 
                <span className={`errorInput ${id === 'passwordAut' ? 'errorPassAut' : ''}`}>{invalid}</span>}
            </div>
            {id.includes('assword') && <img src={passwordVisible ? eye_visible : eye_not_visible} alt="" className='eye' onMouseOver={clickEyePas} onMouseOut={clickEyePas}/>}
        </div>
    )
}

export default Input;