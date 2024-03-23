import { LuCalendarSearch } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate , useLocation } from "react-router-dom";
import { useState } from "react";
import AdminOption from "../Admin/AdminOptions";
import TrainerOptions from "../Trainer/TrainerOptions";
import { useAuth } from "../../../../Utils/AuthContext";

function UserOptions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ showOptions , setShowOptions] = useState(false);
    const [isActive , setIsActive] = useState(location.pathname);
    const { user } = useAuth();

    const handleHomePage = () => {
        navigate("/");
    }

    return(
        <>
            <h1 id="close" onClick={handleHomePage}>x</h1>
            <h1 id="open-arrow" className={showOptions ? '' : 'active'} onClick={() => setShowOptions(true)}>{`>`}</h1>
           
            <section className={`user-options ${showOptions ? 'active' : ''}`}>
                    <h1 id="close-arrow" className={showOptions ? 'active' : ''} onClick={() => setShowOptions(false)}>{`<`}</h1>    
                    <div className={`option ${isActive === "/user-profile" ? 'active' : ''}`}>
                        <IoMdSettings />
                        <Link to="/user-profile" onClick={() => setIsActive("/user-profile")}>Settings</Link>
                    </div>
                    <div className={`option ${isActive === "/user-appointments" ? 'active' : ''}`}>
                        <LuCalendarSearch />
                        <Link to="/user-appointments" onClick={() => setIsActive("/user-appointments")}>My Appointments</Link>
                    </div>
                    <div className="option">
                        <FaRegStar />
                        <Link>My Reviews</Link>
                    </div>
                    <div className="option">
                        <FaCreditCard />
                        <Link>Billing</Link>
                    </div>

                    {user.data.user.role === "admin" ? <AdminOption isActive={isActive} setIsActive={setIsActive}/> : 
                     user.data.user.role === "trainer" ? <TrainerOptions /> : 
                     null    
                    }
                

            </section>

        </>
    );
}

export default UserOptions;