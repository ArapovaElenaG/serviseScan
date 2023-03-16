import React from 'react';
import './Forms.scss';
import Input from './Input/Input';
import google from './images/Google.svg';
import facebook from './images/Facebook.svg';
import yandex from './images/Yandex.svg';
import padlock from './images/padlock.svg';
import {useSelector, useDispatch} from 'react-redux';
import {displayAuthorization, displayRegistration, sendRequestAut, getResponseAut} from '../../../store/actions';

 


function Forms () {

    const [formReg, setFormReg] = React.useState({
        telValue: '',
        mailValue: '',
        loginValue: '',
        passwordValue: '',
        confirmPasswordValue: '',
    });
    
    const [formAut, setFormAut] = React.useState({
        loginValue: '',
        passwordValue: '',
    });
    

    const dispatch = useDispatch();
    const activeRegistration = useSelector(state => state.loginReduсer.activeRegistration);
    const passwordVisible = useSelector(state => state.loginReduсer.passwordVisible);

    const isFormAutFull = formAut.loginValue && formAut.passwordValue ? true : false;
    const isFormRegFull = formReg.telValue && formReg.mailValue && formReg.loginValue && formReg.passwordValue && formReg.confirmPasswordValue ? true : false;

    const clickAuthorization = () => {
        dispatch(displayAuthorization())
    }

    const clickRegistration = () => {
        dispatch(displayRegistration())
    }

    
    const validate = (id, value) => {
        const regExpLogin = /^[a-zA-Z0-9_]{3,20}$/i;
        const regExpTel = /\+7\d{10}/;
        const regExpMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const regExpPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (id === 'loginAut') {
            if (regExpLogin.test(value) || regExpTel.test(value) || regExpMail.test(value)) {
                setFormAut({...formAut, loginValue: value})
            }
            return regExpLogin.test(value) || regExpTel.test(value) || regExpMail.test(value);
        }
        else if (id === 'passwordAut') {
            if (value!=='') {setFormAut({...formAut, passwordValue: value})};
            return regExpPass.test(value);
        }

        else if (id === 'telReg') {
            if (regExpTel.test(value)) {setFormReg({...formReg, telValue: value})}
            return regExpTel.test(value);
        }
        else if (id === 'mailReg') {
            if (regExpMail.test(value)) {setFormReg({...formReg, mailValue: value})}
            return regExpMail.test(value);
        }
        else if (id === 'loginReg') {
            if (regExpLogin.test(value)) {setFormReg({...formReg, loginValue: value})}
            return regExpLogin.test(value);
        }
        else if (id === 'passwordReg') {
            if (regExpPass.test(value)) {setFormReg({...formReg, passwordValue: value})}
            return regExpPass.test(value);
        }
        else if (id === 'confirmPasswordReg') {
            if (value === formReg.passwordValue) {setFormReg({...formReg, confirmPasswordValue: value})}
            return value === formReg.passwordValue
        }
    }


    const invalidField = 'Введите корректные данные';
    const invalidPasAut = 'Возможно в пароле допущена ошибка';
    const invalidConfPasReg = 'Пароли не совпадают';
    const validTel = 'Номер телефона должен содержать 11 цифр и начинаться с +7, не допускаются буквы и другие символы.';
    const validMail = 'E-mail адрес состоит из двух частей, разделённых символом @.';
    const validLogin = 'Логин должен содержать только латинские буквы или цыфры. Не допускается употребление специальных символов. Общая длина логина от 3 до 20 символов.';
    const validPassword = 'Пароль должен иметь не менее 8 символов, содержать хотя бы: 1 цифру, 1 символ нижнего регистра, 1 символ верхнего регистра латиницы, один специальный символ !@#$%^&*';
    const validConfirmPas = 'Пароли должны совпадать';
    



    const url = `https://gateway.scan-interfax.ru/api/v1/account/login`;
    const login = 'sf_student10';
    const password = 'r$YtM#sXy3';


    const sendRequest = (event) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "login": `${formAut.loginValue}`,
                "password": `${formAut.passwordValue}`
            }),
            headers: {
                "Content-type": "application/json", 
                "Accept": "application/json",
            }
        }

        fetch(url, options)
            .then(response => {
                let result = response.json();
                console.log(response.status);
                dispatch(sendRequestAut(response.status));
                return result;
            })
            .then(result => {
                if (result.expire) {dispatch(getResponseAut(result.expire))}
                else if (result.message) {dispatch(getResponseAut(result.message))}
                else {dispatch(getResponseAut('Отказ в доступе'))}
                console.log(result.message);
                return result;
            })
            .catch(() => {
                console.log('Ошибка запроса');
                dispatch(sendRequestAut('Ошибка запроса'));
            })

        event.preventDefault();
    }





    return (
        <div className='wrapperForm'>
            <img src={padlock} alt="Изображение замок" className='padlock'/>
            <div className="wrapperTab">
                <div className={`tab ${activeRegistration ? '' : 'activeTab'}`} onClick={clickAuthorization}>Войти</div>
                <div className={`tab ${activeRegistration ? 'activeTab' : ''}`} onClick={clickRegistration}>Зарегистрироваться</div>
            </div>

            {activeRegistration &&
                // ФОРМА РЕГИСТРАЦИИ 
                <form action="" className='form'>
                    <Input
                        name={'Номер телефона:'}
                        type={"tel"} 
                        id={'telReg'} 
                        validate={validate}
                        invalidValue={invalidField}
                        placeholder={'+70000000000'}
                        tooltip={validTel} 
                    />

                    <Input
                        name={'E-mail:'}
                        type={"email"} 
                        id={'mailReg'} 
                        validate={validate}
                        invalidValue={invalidField}
                        placeholder={'xxxxxx@xxxxx.xx'}
                        tooltip={validMail} 
                    />

                    <Input
                        name={'Логин:'}
                        type={"text"} 
                        id={'loginReg'} 
                        validate={validate}
                        invalidValue={invalidField}
                        tooltip={validLogin} 
                    />

                    <Input
                        name={'Пароль:'}
                        type={`${passwordVisible ? 'text' : "password"}`} 
                        id={'passwordReg'} 
                        validate={validate}
                        invalidValue={invalidField}
                        tooltip={validPassword}  
                    />

                    <Input
                        name={'Повторите пароль:'}
                        type={`${passwordVisible ? 'text' : "password"}`} 
                        id={'confirmPasswordReg'} 
                        validate={validate}
                        invalidValue={invalidConfPasReg}
                        tooltip={validConfirmPas}  
                    />

                    <button 
                        type='submit' 
                        // className={`button ${isFormRegFull ? '' : 'buttonDisabled'}`} 
                        className='button'
                        disabled={!isFormRegFull}
                        {...(isFormRegFull ? {} : {dataTooltip: 'Пожалуйста заполните все поля для ввода'})}
                    >
                        Зарегистрироваться
                    </button>
                </form>
                ||
                // ФОРМА АВТОРИЗАЦИИ
                <form action="" className='form' onSubmit={sendRequest}>
                    <Input
                        name={'Логин, e-mail или номер телефона:'}
                        type={"text"} 
                        id={'loginAut'} 
                        validate={validate}
                        invalidValue={invalidField} 
                    />

                    <Input
                        name={'Пароль:   r$YtM#sXy3'}
                        type={`${passwordVisible ? 'text' : "password"}`} 
                        id={'passwordAut'} 
                        validate={validate}
                        invalidValue={invalidPasAut} 
                    />

                    <div className='wrapperMessage'>

                    </div>

                    <button 
                        type='submit' 
                        className={`button ${isFormAutFull ? '' : 'buttonDisabled'}`} 
                        disabled={!isFormAutFull}
                        {...(isFormAutFull ? {} : {dataTooltip: 'Пожалуйста заполните все поля для ввода'})}
                        
                    >
                        Войти
                    </button>

                    <a href="/#" className='recover'>Восстановить пароль</a>
                </form>
            }
                    
            <div>Войти через:</div>
            <div className='wrapperButtons'>
                <button className='servises'>
                    <img src={google} alt="Google" width="59"/>
                </button>
                <button className='servises'>
                    <img src={facebook} alt="Facebook" width="59"/>
                </button>
                <button className='servises'>
                    <img src={yandex} alt="Yandex" width="59"/>
                </button>
            </div>
        </div>
    )
}

export default Forms;