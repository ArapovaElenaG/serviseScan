import React from 'react';
import logo from './images/logo.png';
import vertBar from './images/vertBar.svg';
import spinner from '../images/spinner.png';
import './Header.scss';
import '../../App.scss';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {displayRegistration, displayAuthorization, getResponseAccountSettings, getErrorAccountSettings, logOutAccount} from '../store/actions';



function Header() {
    // стейт нажато ли бургер меню
    const [clickedBM, setClickedBM] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // достаем из стора токен, лимит аккаунта и данные пользователя
    const token = useSelector(state => state.loginReduсer.token);
    const accountSettings = useSelector(state => state.loginReduсer.accountSettings);
    const userData = useSelector(state => state.loginReduсer.userData);

    // выбор активной формы регстрации 
    const handleRegistration = () => {
        navigate("/login");
        dispatch(displayRegistration())
    }

    // выбор активной формы авторизации
    const handleAuthorization = () => {
        navigate("/login");
        dispatch(displayAuthorization())
    }

    // функция нжатия на бургер меню - отображает/скрывает БМ
    const handleBurgerMunu = () => {
        setClickedBM(!clickedBM);
    }

    // функция скрытия БМ при нажатии вне БМ
    // проверяем если нажато не само БМ, то скрываем БМ
    const hideBurgerMenu = (e) => {
        if (e.target.className !== 'burgerMenu' && clickedBM) {
            setClickedBM(false);
            // console.log(e.target.className);
        }
    }

    // обработчик на клик по window для закрытия БМ
    React.useEffect(() => {
        document.addEventListener("click", hideBurgerMenu);
        return () => {
          document.removeEventListener("click", hideBurgerMenu)
        }
    }, [])

    // функция запроса лимитов аккаунта через FETCH
    const sendRequestAccountSettings = () => {
        const url = `https://gateway.scan-interfax.ru/api/v1/account/info`;

        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json", 
                "Accept": "application/json",
                'Authorization': `Bearer ${token.accessToken}`,
            }
        }

        fetch(url, options)
            .then(response => {
                let result = response.json();
                return result;
            })
            .then(result => {
                if (result.eventFiltersInfo) {
                    dispatch(getResponseAccountSettings(result));
                } else {
                    dispatch(getErrorAccountSettings(result));
                }
                return result;
            })
            .catch(() => {
                dispatch(getErrorAccountSettings({errorCode: '', message: 'Ошибка запроса'}));
            })

        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', urlAccountSettings, true);
        // xhr.setRequestHeader("Accept", 'application/json');
        // xhr.setRequestHeader("Content-type", 'application/json');
        // xhr.setRequestHeader("Authorization", JSON.stringify({accessRespAut}));
        // xhr.onload = () => {
        //     console.log(xhr, xhr.status)
        //     if (xhr.status === 200) {
        //         const result = JSON.parse(xhr.response);
        //         dispatch(getResponseAccountSettings(result));
        //     } else {
        //         dispatch(getErrorAccountSettings(xhr.status));
        //     }
        // }
        // xhr.onerror = () => {
        //     dispatch(getErrorAccountSettings(xhr.status));
        // }
        // const token = JSON.stringify({accessRespAut})
        // const config = {headers: {Authorization: `Bearer ${accessRespAut}`}}
        // xhr.send();
    }

    // выход из аккаунта
    const handleExit = () => {
        dispatch(logOutAccount())
    }

    // если есть токен и нет лимита аккаунта - запускаем функцию запроса лимита аккаунта
    if (token && !accountSettings) {sendRequestAccountSettings()};


    return (
        <header>
            <div className='container'>
                <div className='header'>
                    <div className='itemHeader'>
                        <img src={logo} alt="Логотип" width="141"/>
                    </div>

                    <nav className='itemHeader nav'>
                        <ul className='ul'>
                            <li className='li'>
                                <Link className='a' to="/">Главная</Link>
                            </li>
                            <li className='li'>
                                <Link className='a' to="/tariffs">Тарифы</Link>
                            </li>
                            <li className='li'>
                                <Link className='a' to="/">FAQ</Link>
                            </li>
                        </ul>
                    </nav>

                    {token ? 
                    <div className='itemHeader wrapperPersonalData '>
                        <div className='accountSettings'>
                            {accountSettings ?
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='propertyTite'>Использовано компаний</td>
                                        <td className='propertyValue'>{accountSettings.eventFiltersInfo.usedCompanyCount}</td>
                                    </tr>
                                    <tr>
                                        <td className='propertyTite'>Лимит по компаниям</td>
                                        <td className='propertyValue limit'>{accountSettings.eventFiltersInfo.companyLimit}</td>
                                    </tr>
                                </tbody>
                            </table>
                            :
                            <div className='spinner'><img src={spinner} alt="" /></div>
                            }
                        </div>

                        <div className='accountData'>
                            <div className='name'>
                                {userData.firstName.slice(0, 1).toUpperCase() + userData.firstName.slice(1).toLowerCase() + ' ' + userData.lastName.slice(0, 1).toUpperCase() + '.'}
                                <p className='exit' onClick={handleExit}>Выйти</p>
                            </div>
                            <div className='avatar'>
                                <img src={userData.avatar} alt="аватар" width='100%'/>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='buttons itemHeader'>
                        <button className='buttonHeader' onClick={handleRegistration}>Регистрация</button>
                        <img className='vertBar' src={vertBar} alt="" />
                        <button className='buttonHeader' onClick={handleAuthorization}>Войти</button>
                    </div>
                    }

                    <div className='burgerMenu' onClick={handleBurgerMunu}>&#9776;</div>
                    
                    {clickedBM && 
                    <div className='dropDown'>
                        <nav className='navBM'>
                            <ul className='ulBM'>
                                <li className='liBM'>
                                    <Link className='aBM' to="/">Главная</Link>
                                </li>
                                <li className='liBM'>
                                    <Link className='aBM' to="/tariffs">Тарифы</Link>
                                </li>
                                <li className='liBM'>
                                    <Link className='aBM' to="/">FAQ</Link>
                                </li>
                            </ul>
                        </nav>
                        {token ?
                        <div className='accountDataBM'>
                            {userData.firstName.slice(0, 1).toUpperCase() + userData.firstName.slice(1).toLowerCase() + ' ' + userData.lastName.slice(0, 1).toUpperCase() + '.'}
                            <p className='exit' onClick={handleExit}>Выйти</p>
                        </div>
                        :
                        ''
                        }
                        
                    </div>
                    }
                </div>
            </div>
        </header>
    )
}



export default Header;