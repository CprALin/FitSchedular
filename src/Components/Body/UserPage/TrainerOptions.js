import { Link } from "react-router-dom";
import { LuCalendarPlus } from "react-icons/lu";

function TrainerOptions(){
    return(
        <div className="trainer-options">
            <h4>Trainer Options</h4>
            <div className="option">
                 <LuCalendarPlus />
                 <Link>Add Appointment</Link>
            </div>
        </div>
    );
}

export default TrainerOptions;