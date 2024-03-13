import StartPage from "./StartPage/StartPage";
import LoginPage from "./LoginPage/LoginPage";
import { Routes , Route , Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import UserPage from "./UserPage/UserPage";

function Body(){
    return(
        <div className="body">
            <Routes>
                <Route exact path="/" element={<StartPage />}/>
                <Route path="/user-profile" element={<UserPage />}/>
                <Route path="/login-page" element={<LoginPage />}/>
                <Route path="/register-page" element={<RegisterPage />}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
}

export default Body;