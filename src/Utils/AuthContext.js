import React , {useState ,  createContext, useContext} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [isAuth , setIsAuth] = useState(false);
    const [user , setUser] = useState(null);

    const login = (userData) => {
        setIsAuth(true);
        setUser(userData);
    }

    const logout = () => {
        setIsAuth(false);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{isAuth , user , login , logout}} >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext , AuthProvider};