import { LuCalendarSearch } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate , useLocation } from "react-router-dom";
import { useState } from "react";

function UserOptions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive , setIsActive] = useState(location.pathname);

    const handleHomePage = () => {
        navigate("/");
    }

    return(
        <>
            <h1 id="close" onClick={handleHomePage}>x</h1>
           
            <section className="user-options">
                    <div className={`option ${isActive === "/user-profile" ? 'active' : ''}`}>
                        <IoMdSettings />
                        <Link to="/user-profile" onClick={() => setIsActive("/user-profile")}>Settings</Link>
                    </div>
                    <div className={`option ${isActive === "/user-appointments" ? 'active' : ''}`}>
                        <LuCalendarSearch />
                        <Link to="/user-appointments" onClick={() => setIsActive("/user-appointments")}>Appointments</Link>
                    </div>
                    <div className="option">
                        <FaRegStar />
                        <Link>My Reviews</Link>
                    </div>
                    <div className="option">
                        <FaCreditCard />
                        <Link>Billing</Link>
                    </div>
            </section>
        </>
    );
}

export default UserOptions;