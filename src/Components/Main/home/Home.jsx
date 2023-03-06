import React from 'react';
import './Home.scss';
import image2_home from './images/image2_home.svg';
import Carousel from './carousel/Carousel';
import Tarrifs from './tariffs/Tariffs';

function Home () {
    return (
        <div className='container'>
            <section className='home_section1'>
                <div className='content_left'>
                    <h1 className='h h1'>сервис по поиску публикаций<br/>о компании<br/>по его ИНН</h1>
                    <p className='subtitle'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    <button className='button'>Запросить данные</button>
                </div>
                <div className='content_right'></div>
            </section>

            <section className='home_section2'>
                <h2 className='h h2'>Почему именно мы</h2>
                <Carousel/>
                <img src={image2_home} alt="Изображение 2" width="100%"/>
            </section>

            <section className='home_section3'>
                <h2 className='h h2'>наши тарифы</h2>
                <Tarrifs/>
            </section>
            
        </div>
    )
} 

export default Home;