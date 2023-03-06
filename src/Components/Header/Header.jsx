import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from './logo.png';
import vertBar from './vertBar.svg';
import './Header.scss';
import '../../App.scss';
import {useSelector, useDispatch} from 'react-redux';
import {displayRegistration, displayAuthorization} from '../store/actions';




function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const clickedArrow = useSelector(state => state.clickedArrowHeader);


    const handleRegistration = () => {
        navigate("/login");
        dispatch(displayRegistration())
    }

    const handleAuthorization = () => {
        dispatch(displayAuthorization())
    }


    

    return (
        <header>
            <div className='container'>
                <div className='header'>
                    <div>
                        <img src={logo} alt="Логотип" width="141"/>
                    </div>

                    <nav>
                        <ul className='ul'>
                            <li className='li'>
                                <a className='a' href="/#">Главная</a>
                            </li>
                            <li className='li'>
                                <a className='a' href="/#">Тарифы</a>
                            </li>
                            <li className='li'>
                                <a className='a' href="/#">FAQ</a>
                            </li>
                        </ul>
                    </nav>

                    <div className='buttons'>
                        <button className='button' onClick={handleRegistration}>Регистрация</button>
                        <img className='vertBar' src={vertBar} alt="" />
                        <button className='button' onClick={handleAuthorization}>Войти</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;