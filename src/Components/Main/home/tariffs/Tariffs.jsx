import React from 'react';
import "./Tariffs.scss";
import lamp from './images/lamp.svg';
import target from './images/target.svg';
import notebook from './images/notebook.svg';
import TariffItem from './TarifItem';


const tariffPlans = {
    beginner: {
        title: "Beginner",
        subTitle: 'Для небольшого исследования',
        img: lamp,
        price: 799,
        oldPrice: 1200,
        priceInstallment: 150,
        bonus1: 'Безлимитная история запросов',
        bonus2: 'Безопасная сделка',
        bonus3: 'Поддержка 24/7',
    },
    pro: {
        title: "Pro",
        subTitle: 'Для HR и фрилансеров',
        img: target,
        price: 1299,
        oldPrice: 2600,
        priceInstallment: 279,
        bonus1: 'Все пункты тарифа Beginner',
        bonus2: 'Экспорт истории',
        bonus3: 'Рекомендации по приоритетам',
    },
    business: {
        title: "Business",
        subTitle: 'Для корпоративных клиентов',
        img: notebook,
        price: 2379,
        oldPrice: 3700,
        priceInstallment: 0,
        bonus1: 'Все пункты тарифа Pro',
        bonus2: 'Безлимитное количество запросов',
        bonus3: 'Приоритетная поддержка',
    },
}


function Tarrifs () {
    return (
        <div className='hom_sec3_tariffs'>
            <TariffItem tarif={tariffPlans.beginner}/>
            <TariffItem tarif={tariffPlans.pro}/>
            <TariffItem tarif={tariffPlans.business}/>
        </div>
    )
}

export default Tarrifs;