import StartPage from "./StartPage/StartPage";
import LoginPage from "./LoginPage/LoginPage";
import { Routes , Route , Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import UserPage from "./UserPage/UserPage";
import { useAuth } from "../../Utils/AuthContext";
import UserAppointments from "./UserPage/UserAppointments";

function Body(){
    const { isAuth } = useAuth();

    return(
        <div className="body">
            <Routes>
                <Route exact path="/" element={<StartPage />}/>
                <Route path="/user-profile" element={isAuth ? <UserPage /> : <Navigate to="/login-page"/>}/>
                <Route path="/user-appointments" element={isAuth ? <UserAppointments /> : <Navigate to={"/login-page"}/>} />
                <Route path="/login-page" element={!isAuth ? <LoginPage /> : <Navigate to="/" />}/>
                <Route path="/register-page" element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
}

export default Body;