import React from 'react';
import "./Carousel.scss";
import arrow_left_carousel from './images/arrow_left_carousel.png';
import arrow_right_carousel from './images/arrow_right_carousel.png';
import watch from './images/watch.svg';
import magnifier from './images/magnifier.svg';
import keyhole from './images/keyhole.svg';
import earth from './images/earth.svg';
import article from './images/article.svg';


function Carousel () {
    return (
        <div className='wrapper_carousel'>
            <div className='arrow_carousel left'>
                <img src={arrow_left_carousel} alt="Стрелка влево" />
            </div>

            <div className='carousel'>
                <div className='carousel_item'>
                    <img src={watch} alt="Изображение часы" height="65px"/>
                    <p className='carousel_text'>Высокая и оперативная скорость обработки заявки</p>
                </div>

                <div className='carousel_item'>
                    <img src={magnifier} alt="Изображение лупа" height="65px"/>
                    <p className='carousel_text'>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                </div>

                <div className='carousel_item'>
                    <img src={keyhole} alt="Изображение замочная скважина" height="65px"/>
                    <p className='carousel_text'>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                </div>

                {/* <div className='carousel_item'>
                    <img src={earth} alt="Изображение земной шар" height="65px"/>
                    <p className='carousel_text'>Глобальный поиск упоминаний компании в том числе в зарубежных источниках информации</p>
                </div>

                <div className='carousel_item'>
                    <img src={article} alt="Изображение архивный документ" height="65px"/>
                    <p className='carousel_text'>Сканирование архивных статей</p>
                </div> */}
            </div>

            <div className='arrow_carousel right'>
                <img src={arrow_right_carousel} alt="Стрелка вправо" />
            </div>
        </div>
    )
}

export default Carousel;