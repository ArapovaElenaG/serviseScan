import React from 'react';
import './Home.scss';
import image2_home from './images/image2_home.svg';
import Carousel from './carousel/Carousel';
import Tarrifs from './tariffs/Tariffs';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function Home () {

    // достаем токен из стора
    const token = useSelector(state => state.loginReduсer.token);


    return (
        <div className='container'>
            <section className='home_section1'>
                <div className='content_left'>
                    <h1 className='h h1'>сервис по поиску публикаций<br/>о компании<br/>по его ИНН</h1>
                    <p className='subtitle'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    {token && <Link to="/search" className='button'>Запросить данные</Link>}
                </div>
                <div className='content_right'></div>
            </section>

            <section className='home_section2'>
                <h2 className='h h2'>Почему именно мы</h2>
                <Carousel/>
                <div className='wrapperImage'>
                    <img src={image2_home} alt="Изображение 2" className='image_sec2'/>
                </div>
            </section>

            <section className='home_section3'>
                <h2 className='h h2'>наши тарифы</h2>
                <Tarrifs/>
            </section>
        </div>
    )
} 

export default Home;