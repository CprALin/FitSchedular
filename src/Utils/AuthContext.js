import React , {useState, useEffect ,  createContext, useContext} from "react";
import axios from 'axios';
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [isAuth , setIsAuth] = useState(false);
    const [user , setUser] = useState(null);

    useEffect(() => {
        // Verificare autentificare la încărcarea componentei și la fiecare rerender
        const token = localStorage.getItem('jwt');
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (token) {
            setUser(storedUser);
            setIsAuth(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
            axios.defaults.withCredentials = true;
            Cookies.set('jwt' , storedUser.token);
        }
    }, []);

    const login = (userData) => {
        const token = userData.token;
        localStorage.setItem('jwt' , token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsAuth(true);
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        axios.defaults.withCredentials = true;
        Cookies.set('jwt' , userData.token);
    }

    const logout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('jwt');
        setIsAuth(false);
        setUser(null);
        axios.defaults.headers.common['Authorization'] = `Bearer ${null}`;
        Cookies.remove('jwt');
    }

    return(
        <AuthContext.Provider value={{isAuth , user , login , logout}} >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext , AuthProvider};