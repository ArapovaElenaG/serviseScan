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
    // СТЕЙТ - слайды карусели (такой стейт нужен для 1го способа слайдера)
    const [carouselItems, setCarouselItems] = React.useState([
        {image: watch, description: 'Высокая и оперативная скорость обработки заявки'},
        {image: magnifier, description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'},
        {image: keyhole, description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'},
        {image: earth, description: 'Глобальный поиск упоминаний компании в том числе в зарубежных источниках информации'},
        {image: article, description: 'Сканирование архивных статей'}
    ]);

    // СТЕЙТ - смещение ленты карусели
    const [offset, setOffset] = React.useState(0);

    // функция передвижения ленты слайдера
    const moveSlider = (side) => {
        // // для 1го и 2го способа слайдера без анимации
        // // в массиве слайдов элементы перемещятся и отрисовывается только первые 3 при ширине экрана > 700 и первый 1 если ширина экрана < 700
        // let modifiedCarouselItems;
        // if (side === 'left') {
        //     modifiedCarouselItems = carouselItems.slice(0, carouselItems.length-1);
        //     modifiedCarouselItems.unshift(carouselItems[carouselItems.length-1]);
        // } else {
        //     modifiedCarouselItems = carouselItems.slice(1);
        //     modifiedCarouselItems.push(carouselItems[0]);
        // }
        // setСarouselItems(modifiedCarouselItems);


        // для второго способа
        // из слайдов карусели отрисовывается длинная лента, которая не помещается в область просмотра карусели. С помощью overflow: hidden, лента скрывается и перемещается с помощью transform: translateX.
        // если ширина экрана > 700px -  видны 3 слайда, их ширина 33.33% от области просмотра карусели
        // если ширина экрана < 700px - виден 1 слайд, его ширина 100%
        if (window.innerWidth > 700) {
            if (side === 'left') {
                if (offset < 0) {
                    setOffset(offset + 33.33);
                } else {setOffset((-carouselItems.length + 3) * 33.33)}
            } else {
                if (offset > ((-carouselItems.length + 3) * 33.33)) {
                    setOffset(offset - 33.33);
                } else (setOffset(0));
            }
        }
        else {
            if (side === 'left') {
                if (offset < 0) {
                    setOffset(offset + 100);
                } else {setOffset((-carouselItems.length + 1) * 100)}
            } else {
                if (offset > ((-carouselItems.length + 1) * 100)) {
                    setOffset(offset - 100);
                } else {setOffset(0)};
            }
        }
    }


    // 
    React.useEffect(() => {
        let timerID = setInterval(() => moveSlider(), 3000);
        return () => {
            clearInterval(timerID);
        };
    }, [carouselItems, offset]);



    return (
        <div className='wrapper_carousel'>
            <div className='arrow_carousel left' onClick={() => moveSlider('left')}>
                <img src={arrow_left_carousel} alt="Стрелка влево" />
            </div>

            
            <div className='carousel'>
                {/* 1 способ: отрисовываются только первые 3 элемента массива (или только 1 если ширина экрана < 900px)*/}
                {/* {carouselItems.map((item, index) => {
                    if ((window.innerWidth > 900 && index < 3) || (window.innerWidth <= 900 && index < 1)) {
                        return (
                            <div className='carousel_item'>                                
                                <img src={item.image} alt="" className='svgIcon'/>
                                <p className='carousel_text'>{item.description}</p>
                            </div>
                        )
                    }
                })} */}

                {/* 2 способ: отрисовываются все элемента массива в одну ленту*/}
                <div className='flow' style={{'transform': `translateX(${offset}%)`}}>
                    {carouselItems.map((item, index) => {
                        return (
                            <div className='carousel_item' key={index}>
                                <img src={item.image} alt="" className='svgIcon'/>
                                <p className='carousel_text'>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>

            <div className='arrow_carousel right' onClick={() => moveSlider('right')}>
                <img src={arrow_right_carousel} alt="Стрелка вправо" />
            </div>
        </div>
    )
}

export default Carousel;