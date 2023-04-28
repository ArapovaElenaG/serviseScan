import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// HOC принимает чилдрен (страница /search), проверяет есть ли авторизация, ели да - возвращает чилдрен, если нет - редиректит на страницу /login с передачей информации откуда произошел редирект.
function RequireAuthoriz ({children}) {
    const location = useLocation();
    const token = useSelector(state => state.loginReduсer.token);

    if (token) {return children}
    else {return <Navigate to='/login' state={{from: location}}/>}
}

export default RequireAuthoriz;