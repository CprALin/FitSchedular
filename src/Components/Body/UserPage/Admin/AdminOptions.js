import { Link } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

function AdminOption ({isActive , setIsActive}){
     return(
        <div className="admin-options">
            <h4>Admin Options</h4>
            <div className={`option ${isActive === "/add-trainer" ? 'active' : ''}`}>
                <IoIosPersonAdd />
                <Link to="/add-trainer" onClick={() => setIsActive("/add-trainer")}>Add Trainer</Link>
            </div>
        </div>
     );
}

export default AdminOption;