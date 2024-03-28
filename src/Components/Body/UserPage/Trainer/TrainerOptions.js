import { Link } from "react-router-dom";
import { LuCalendarPlus } from "react-icons/lu";

function TrainerOptions({isActive , setIsActive}){
    return(
        <div className="trainer-options">
            <h4>Trainer Options</h4>
            <div className={`option ${isActive === "/add-appointment" ? 'active' : ''}`}>
                 <LuCalendarPlus />
                 <Link to={"/add-appointment"} onClick={() => setIsActive("/add-appointment")}>New Appointment</Link>
            </div>
        </div>
    );
}

export default TrainerOptions;