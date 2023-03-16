import React from 'react';
import './Login.scss';
import authorizationImage from './images/authorizationImage.svg';
import Forms from './Forms/Forms';






function Login () {
    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='contentLeft'>
                    <h3 className='h h3'>Для оформления подписки на тариф, необходимо авторизоваться.</h3>
                    <img src={authorizationImage} alt="Изображение" className='authorizationImage'/>
                </div>
                <Forms/>
            </div>
        </div>
    )
}

export default Login;



