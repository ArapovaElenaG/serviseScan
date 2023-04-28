import React from 'react';
import './ScanDoc.scss';
import noImage from './images/noimage.png';
// import convert from 'xml-js';
import DOMPurify from 'dompurify';
import {connect} from 'react-redux';




class ScanDoc extends React.Component{
    constructor(props) {
        super(props);
        this.state = {visible: this.props.index < this.props.visibleInd}
    }


    // функция для обрезки url до основного
    cutURL = (url) => {
        const urlPars = new URL(url);
        let PathIndex = url.indexOf(urlPars.pathname);
        return url.slice(0, PathIndex);
    }

    // функция для поиска url картинки
    getUrlImg = (str) => {
        let dataImg = str.slice(str.indexOf('image-src'));
        let begin = dataImg.slice(dataImg.indexOf('http'));
        return begin.slice(0, begin.indexOf('"'));
    }



    // конвертируем xml контент в текст
    getTextContent = (xmlString) => {
        // распарсим xml строку 
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlString, 'text/xml');

        // достанем все теги sentence в node.list 
        let sentences = xmlDOM.querySelectorAll('sentence');

        // превратим node.list в массив
        let arrFromSentenses = (Array.from(sentences));

        // соберем содержание всех sentences в одну строку
        let textDoc = arrFromSentenses.reduce((text, item) => {
            return text + item.textContent
        }, '');

        // удалим вредоносный html код для использования dangerouslySetInnerHTML
        let sanitizeTextDoc = DOMPurify.sanitize(textDoc);

        // обрежем строку, если она > 300 символов
        if (sanitizeTextDoc.length > 500) {
            sanitizeTextDoc = sanitizeTextDoc.slice(0, 500) + '&hellip;';
        }

        return sanitizeTextDoc;

        // конвертация xml в объект js 
        // let result = convert.xml2js(xmlString, {compact: false, spaces: 4});
        // console.log(result);
    }

    // функция для изменения окончания подсчета слов
    getWord = (count) => {
        if (count >= 11 && count <= 19) {
            return 'слов';
        } else {
            count %= 10;
            if (count === 1) {return 'слово'}
            else if (count >= 2 && count <= 4) {return 'слова'}
            else {return 'слов'}
        }
    }




    componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps) {this.setState({visible: this.props.index < this.props.visibleInd})}
    }


    render() {
        const {item} = this.props;
        const {visible} = this.state;


        if (visible) {
            return (
                <div className={`doc`}>
                    <div className='mainDoc'>
                        <span className='span'>{new Intl.DateTimeFormat('ru').format(new Date(item.ok.issueDate))}</span>
                        <a href={item.ok.url} className='link'><span className='span'>{item.ok.source.name}</span></a>
                        <h6 className='h h6 h6OS'>{item.ok.title.text}</h6>
                        <div className='wrapperBeidg'>
                            {item.ok.attributes.isTechNews && <div className='beidg'>Технические новости</div>}
                            {item.ok.attributes.isAnnouncement && <div className='beidg'>Анонсы и келендари</div>}
                            {item.ok.attributes.isDigest && <div className='beidg'>Сводки новостей</div>}
                        </div>
                        <div 
                            className='imgDoc' 
                            style={
                                {'backgroundImage': `url(${this.getUrlImg(item.ok.content.markup) ? this.getUrlImg(item.ok.content.markup) : noImage})`,
                                'backgroundSize': `${this.getUrlImg(item.ok.content.markup) ? 'cover' : 'contain'}`
                                }
                            }
                        >
                        </div>
    
    
                        <div dangerouslySetInnerHTML={{__html: this.getTextContent(item.ok.content.markup)}} className='textDoc'/>
                    </div>
                                        
    
                    <div className='wrapperBottomDoc'>
                        <div className='btnLinkDoc'><a href={item.ok.url} target="_blank" rel="noreferrer" className='linkDoc'>Читать в источнике</a></div>
                        <div className='countWorld'>{item.ok.attributes.wordCount} {this.getWord(item.ok.attributes.wordCount)}</div>
                    </div>   
                </div>
            )
        }

        else {return}
    }
}


function mapStateToProps(state) {
    return {
        inn: state.objectSearchReducer.inn,
    }
}



export default connect(mapStateToProps)(ScanDoc);






// function ScanDoc ({item, visibleDoc, index}) {

//     // // вычисляем главная ли роль в каждой статье
//     // let mainRole = false;
//     // scanDoc.map(item => {
//     //     item.ok.entities.companies.map(elem => {
//     //         if (elem.suggestedCompanies[0].inn === inn) {
//     //             mainRole = elem.isMainRole
//     //         }
//     //     });
//     //     item.ok.mainRole = mainRole
//     // })
//     // console.log(inn);


//     // функция для обрезки url до основного
//     const cutURL = (url) => {
//         const urlPars = new URL(url);
//         let PathIndex = url.indexOf(urlPars.pathname);
//         return url.slice(0, PathIndex);
//     }

//     // функция для поиска url картинки
//     const getUrlImg = (str) => {
//         let dataImg = str.slice(str.indexOf('image-src'));
//         // let beginInd = str.indexOf('http');
//         let begin = dataImg.slice(dataImg.indexOf('http'));
//         // let endInd = begin.indexOf('"');
//         // let end = begin.slice(0, endInd);
//         return begin.slice(0, begin.indexOf('"'));
//     }



//     // конвертируем xml контент в годный текст
//     const getTextContent = (xmlString) => {
//         // распарсим xml строку 
//         let parser = new DOMParser();
//         let xmlDOM = parser.parseFromString(xmlString, 'text/xml');

//         // достанем все теги sentence в node.list 
//         let sentences = xmlDOM.querySelectorAll('sentence');

//         // превратим node.list в массив
//         let arrFromSentenses = (Array.from(sentences));

//         // соберем содержание всех sentences в одну строку
//         let textDoc = arrFromSentenses.reduce((text, item) => {
//             return text + item.textContent
//         }, '');

//         // удалим вредоносный html код для использования dangerouslySetInnerHTML
//         let sanitizeTextDoc = DOMPurify.sanitize(textDoc);

//         // обрежем строку, если она > 300 символов
//         if (sanitizeTextDoc.length > 500) {
//             sanitizeTextDoc = sanitizeTextDoc.slice(0, 500) + '&hellip;';
//         }

//         return sanitizeTextDoc;

//         // конвертация xml в объект js 
//         // let result = convert.xml2js(xmlString, {compact: false, spaces: 4});
//         // console.log(result);
//     }

//     // функция для изменения окончания подсчета слов
//     const getWord = (count) => {
//         console.log(count %= 100);
//         if (count >= 11 && count <= 19) {
//             return 'слов';
//         } else {
//             count %= 10;
//             if (count === 1) {return 'слово'}
//             else if (count >= 2 && count <= 4) {return 'слова'}
//             else {return 'слов'}
//         }
//     }


//     // lazy-load
//     const {ref, inView} = useInView({
//         treshold: 0.1,

//     })


//     return (
//         <div ref={ref} className={`doc ${inView ? '' : 'passive'}`}>
//             {index <= visibleDoc 
//             ?
//             <>
//             <div className='mainDoc'>
//                 <span className='span'>{new Intl.DateTimeFormat('ru').format(new Date(item.ok.issueDate))}</span>
//                 <a href={item.ok.url}><span className='span'>{item.ok.source.name}</span></a>
//                 <h6 className='h h6 h6OS'>{item.ok.title.text}</h6>
//                 <div className='wrapperBeidg'>
//                     {item.ok.attributes.isTechNews && <div className='beidg'>Технические новости</div>}
//                     {item.ok.attributes.isAnnouncement && <div className='beidg'>Анонсы и келендари</div>}
//                     {item.ok.attributes.isDigest && <div className='beidg'>Сводки новостей</div>}
//                     {/* {item.ok.mainRole && <div>Главная роль</div>} */}
//                 </div>
//                 <div 
//                     className='imgDoc' 
//                     dataUrl={getUrlImg(item.ok.content.markup)} 
//                     style={
//                         {'backgroundImage': `url(${getUrlImg(item.ok.content.markup) ? getUrlImg(item.ok.content.markup) : noImage})`,
//                         'backgroundSize': `${getUrlImg(item.ok.content.markup) ? 'cover' : 'contain'}`
//                         }
//                     }
//                 >
//                 </div>


//                 <div dangerouslySetInnerHTML={{__html: getTextContent(item.ok.content.markup)}} className='textDoc'/>
//             </div>
                                

//             <div className='wrapperBottomDoc'>
//                 <div className='btnLinkDoc'><a href={item.ok.url} target="_blank" className='linkDoc'>Читать в источнике</a></div>
//                 <div className='countWorld'>{item.ok.attributes.wordCount} {getWord(item.ok.attributes.wordCount)}</div>
//             </div>
//             </>
//             :
//             <></>
//             }
            
//         </div>
//     )

// }
// export default ScanDoc;

