import React from 'react';
import './Login.scss';
import authorizationImage from './images/authorizationImage.svg';
import FormsLogin from './FormsLogin/FormsLogin';
import { useLocation } from 'react-router-dom';


function Login () {
    const location = useLocation();
    // вытаскием информацию из location откуда мы попали на эту страницу
    const fromPage = location.state?.from?.pathname;

    return (
        <div className='container'>
            {fromPage && <div className='nonAuth'>Вы попали сюда со страницы {fromPage}, для отображения которой нужна авторизация.</div>}
            <div className='wrapper'>
                <div className='contentLeft'>
                    <h3 className='h h3'>Для оформления подписки на тариф, необходимо авторизоваться.</h3>
                    <img src={authorizationImage} alt="Изображение" className='authorizationImage701'/>
                </div>
                <FormsLogin/>
                <img src={authorizationImage} alt="Изображение"
                className='authorizationImage700'/>
            </div>
        </div>
    )
}

export default Login;



