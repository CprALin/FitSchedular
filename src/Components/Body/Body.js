import StartPage from "./StartPage/StartPage";
import LoginPage from "./LoginPage/LoginPage";
import { Routes , Route , Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import UserPage from "./UserPage/UserPage";
import { useAuth } from "../../Utils/AuthContext";
import UserAppointments from "./UserPage/User/UserAppointments";
import AddTrainer from "./UserPage/Admin/AddTrainer";
import ClassesPage from "./ClassesPage/ClassesPage";
import TrainerPage from "./TrainerPage/TrainerPage";

function Body(){
    const { isAuth } = useAuth();

    return(
        <div className="body">
            <Routes>
                <Route exact path="/" element={<StartPage />}/>
                <Route path="/classes-page" element={<ClassesPage />} />
                <Route path="/trainer-page/:id" element={<TrainerPage />} />
                <Route path="/user-profile" element={isAuth ? <UserPage /> : <Navigate to="/login-page"/>}/>
                <Route path="/user-appointments" element={isAuth ? <UserAppointments /> : <Navigate to={"/login-page"}/>} />
                <Route path="/add-trainer" element={isAuth ? <AddTrainer /> : <Navigate to={"/login-page"} />} />
                <Route path="/login-page" element={!isAuth ? <LoginPage /> : <Navigate to="/" />}/>
                <Route path="/register-page" element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
}

export default Body;