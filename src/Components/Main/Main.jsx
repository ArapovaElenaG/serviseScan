import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import Error from './error/Error';
import Login from './login/Login';




function Main() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route 
                        exact path="/" 
                        element={<Home/>}
                    >
                    </Route>

                    <Route 
                        exact path="/login" 
                        element={<Login/>}
                    >
                    </Route>

                    {/* <Route path="/task/:id" element={<Home/>}>
                    </Route> */}

                    <Route path="*" element={<Error/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default Main;