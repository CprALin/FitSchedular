import { Link } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

function AdminOption (){
     return(
        <div className="admin-options">
            <h4>Admin Options</h4>
            <div className="option">
                <IoIosPersonAdd />
                <Link>Add Trainer</Link>
            </div>
        </div>
     );
}

export default AdminOption;