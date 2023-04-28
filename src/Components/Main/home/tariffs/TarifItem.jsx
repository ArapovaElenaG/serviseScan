import React from 'react';
import "./Tariffs.scss";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";


// компонент TarrifsItem используется на 2х страницах /home (в компонентах Home->Tariffs) и /tariffs (в компонентах tariffsPage->Tariffs)
// кнопка в данном компоненте TariffsItem со страницы /home ведет на страницу /tariffs с прокруткой до этого же компонента на странице /tariffs.


function TarrifsItem ({tarif, getOffsetY}) {
    // достаем из стора токен и данные пользователя (чтобы подсветить текущий тариф пользователя)
    const token = useSelector(state => state.loginReduсer.token);
    const userData = useSelector(state => state.loginReduсer.userData);

    // определяем, является ли данный TarrifsItem текущим тарифом
    const isCurrent = token && (tarif.title.toLowerCase() === userData.tarif.toLowerCase()) ? true : false;

    const navigate = useNavigate();

    // направление из компонента на страницу /tariffs с передачей информации о названии данного компонента
    // чтобы на странице /tariffs осуществить прокрутку до соответствующего компонента
    const handleButton = () => {
        navigate("/tariffs", {state:{tarif: tarif.title}});
    }

    // создаем реф для определения вертикального расположения компонента относительно области видимости экрана
    let ref = React.createRef();

    // после монтирования компонента только на странице /tariffs определяем вертикального расположения компонента
    // и поднимаем информацию в компонент TariffsPage для прокрутки
    React.useEffect(() => {
        if (getOffsetY) {
            let rect = ref.current.getBoundingClientRect();
            getOffsetY(tarif.title, rect.top);
        }
    }, []);


    return (
        <div className={`${isCurrent ? 'current' : ''} tarif`} style={{'--background': tarif.background}}>
            <div ref={ref}></div>
            <div 
                className='title' 
                style={{
                    '--background': tarif.background,
                    '--color': tarif.color,
                }}
            >
                <div className='title_text'>
                    <h5 className='h5 sec3_h5'>{tarif.title}</h5>
                    <p>{tarif.subTitle}</p>
                </div>
                <div className='img'>
                    <img src={tarif.img} alt="Изображение лампочка" width="93"/>
                </div>
            </div>

            <div className='currentTariff'>
                {isCurrent && <div className='badge'>Текущий тариф</div>}
            </div>

            <div className='text'>
                <p className='h5 sec3_h5'>
                    {tarif.price} &#8381; &emsp;
                    <span className='oldPrice'>{tarif.oldPrice} &#8381;</span>
                </p>

                <p className='installment'>{`или ${tarif.priceInstallment} ₽/мес. при рассрочке на 24 мес.`}</p>

                <ul className='ul'> 
                    <p className='ul_title'>В тариф входит:</p>
                    {tarif.bonus.map(item => {
                        return <li className='li' key={item}>{item}</li>
                    })}
                </ul>
                {getOffsetY && tarif.text}
            </div>

            {!getOffsetY && 
            <button 
                className={`buttonTariff ${isCurrent? 'buttonCurrent' : ''}`}
                onClick={handleButton}
            >
                {isCurrent? 'Перейти в личный кабинет' : 'Подробнее'}
            </button>}
        </div>
    )
}

export default TarrifsItem;