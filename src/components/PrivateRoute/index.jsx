import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../helper/constants';
const { LOGIN } = ROUTE_PATH;

const PrivateRoute = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        let tempLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false;
        if(!tempLogin){
            navigate(LOGIN)
        }
    }, [navigate])

    return (
        <>
        {children}
        </>
    )
}

export default PrivateRoute