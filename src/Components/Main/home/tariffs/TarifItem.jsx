import React from 'react';
import "./Tariffs.scss";


function TarrifsItem ({tarif}) {
    return (
        <div className='tarif'>
            <div className={`${tarif.title} title`}>
                <div className='title_text'>
                    <h5 className='h5 sec3_h5'>{tarif.title}</h5>
                    <p >{tarif.subTitle}</p>
                </div>
                <div className='img'>
                    <img src={tarif.img} alt="Изображение лампочка" width="93"/>
                </div>
            </div>

            <div className='currentTariff'></div>

            <div className='text'>
                <p className='h5 sec3_h5'>
                    {tarif.price} &#8381; &emsp;
                    <span className='oldPrice'>{tarif.oldPrice} &#8381;</span>
                </p>

                <p>{`или ${tarif.priceInstallment} ₽/мес. при рассрочке на 24 мес.`}</p>

                <ul className='ul'> 
                    <p className='ul_title'>В тариф входит:</p>
                    <li className='li'>{tarif.bonus1}</li>
                    <li className='li'>{tarif.bonus2}</li>
                    <li className='li'>{tarif.bonus3}</li>
                </ul>
            </div>

            <button className='button'>Подробнее</button>

            


        </div>
    )
}

export default TarrifsItem;