import Button from "../ReuseComp/Button";
import Logo from "../ReuseComp/Logo";
import NavList from "./NavList";
import { useLocation , useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";
import UserInfo from "./UserInfo";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from "react";

function NavBar(){
    const [ isActive , setIsActive] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { user , logout } = useAuth();

    const isOnLoginPage =   location.pathname === "/login-page" || location.pathname === "/register-page";

    const handlePageClick = () => {
        navigate("/login-page");
    }


    return(
        <div className="nav-bar">
            <Logo />
            <NavList active={isActive} />
            {isOnLoginPage ? null : (user ? 
               <div className={`nav-user-div ${isActive ? 'active' : ''}`}>
                    <UserInfo active={isActive}/>
                    <div id="logout-btn" className={isActive ? 'active' : ''}>
                       <Button event={logout} padding={'2.5px 24px'}>Logout</Button> 
                    </div>
               </div>
             : <div id="login-btn" className={isActive ? 'active' : ''}><Button event={handlePageClick} padding={'10px 29px'}>Login</Button></div>) }
            
            {isActive ? (
                <h1 id="active-bars" className={isActive ? 'active' : ''} onClick={() => setIsActive(false)}>x</h1>
            ) : (
                <AiOutlineBars id="bars" className={isActive ? 'active' : ''} onClick={() => setIsActive(true)}/>
            )}
        </div>
    );
}

export default NavBar;