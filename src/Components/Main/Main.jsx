import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import Error from './error/Error';
import Login from './login/Login';
import Search from './search/Search';
import ObjectSearch from './objectSearch/ObjectSearch';
import TariffsPage from './tariffsPage/TariffsPage';
import RequireAuthoriz from '../HOC/RequiredAuthor';


// роут Search обернут в HOC, который прежде чем загрузить Search, проверяет есть ли токен
// роут ObjectSearch самостоятельно внутри себя проверяет токен
function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='*' element={<Home />}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/search" element={<RequireAuthoriz><Search/></RequireAuthoriz>}/>
                <Route exact path="/objectsearch" element={<ObjectSearch/>}/>
                <Route exact path="/tariffs" element={<TariffsPage/>}/>
                {/* <Route path="/task/:id" element={<Home/>}></Route> */}
                <Route path="*" element={<Error/>}/>
            </Routes>
        </main>
    )
}

export default Main;