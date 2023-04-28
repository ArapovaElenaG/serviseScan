import React from 'react';
import './TariffsPage.scss';
import Tarrifs from '../home/tariffs/Tariffs';
// import TariffItem from '../home/tariffs/TarifItem';
import {useLocation, Link} from 'react-router-dom';



function TariffsPage () {
    // СТЕЙТ - записываем значение вертикального расположения компонентов TariffsItem на странице /tariffs 
    const [beginerOffsetY, setBeginerOffsetY] = React.useState(0);
    const [proOffsetY, setProOffsetY] = React.useState(0);
    const [businessOffsetY, setBusinessOffsetY] = React.useState(0);


    // функция поднятия вертикально расположения TariffItem-ов на странице /tariffs
    // будет срабатывать в TarifItem после монтирования, возвращать название тарифа и расположение и записывать в расположение в соответствующий стейт
    const getOffsetY = (tarif, top) => {
        if (tarif === "Beginner") {setBeginerOffsetY(top)}
        else if (tarif === "Pro") {setProOffsetY(top)}
        else {setBusinessOffsetY(top)}
    }


    // // на всякий случай пример скролла
    // const { top } = element.getBoundingClientRect();
    // window.scrollTo({ top, behavior: "smooth" });


    // достаем из location state. Если переход на данную страницу был по кнопке на тарифах на странице /home , то в стейт придет информация об этом
    const location = useLocation();


    // если в location state есть информация откуда мы попали на эту этраницу
    // то после перезаписи в стейт вертикального расположения, скролим к нужному
    React.useEffect(() => {
        if (location.state) {
            if (location.state.tarif === "Beginner") {
                window.scrollTo(0, beginerOffsetY);
            } else if (location.state.tarif === "Pro") {
                window.scrollTo(0, proOffsetY);
            } else if (location.state.tarif === "Business") {
                window.scrollTo(0, businessOffsetY);
            }
        }
    }, [beginerOffsetY, proOffsetY, businessOffsetY]);


    return (
        <div className='container'>
            <Link to={-1} className='linkBack'>Назад</Link>
            <Tarrifs getOffsetY={getOffsetY}/>
        </div>
    )
} 

export default TariffsPage;