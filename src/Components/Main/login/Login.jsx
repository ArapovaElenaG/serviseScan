import React from 'react';
import './Login.scss';
import authorizationImage from './images/authorizationImage.svg';
import padlock from './images/padlock.svg';

function Authorization () {
    return (
        <div className='wrapper'>
            <div className='contentLeft'>
                <h3 className='h h3'>Для оформления подписки на тариф, необходимо авторизоваться.</h3>
                <img src={authorizationImage} alt="Изображение" className='authorizationImage'/>
            </div>

            <div className='form'>
                <div wrapperLink>
                    <div className='linkLogIn'>Войти</div>
                    <div className='linkRegistration'>Зарегистрироваться</div>
                </div>
                <form action="">
                    <label htmlFor="login">Логин или номер телефона:</label>
                    <input type="text" id='login' className='input'/>

                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id='password' className='input'/>

                    <button type='submit' className='button'>Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Authorization;
