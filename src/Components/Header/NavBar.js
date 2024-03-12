import Button from "../ReuseComp/Button";
import Logo from "../ReuseComp/Logo";
import NavList from "./NavList";
import { useLocation , useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();

    const isOnLoginPage =   location.pathname === "/login-page" || location.pathname === "/register-page";

    const handlePageClick = () => {
        navigate("/login-page");
    }

    return(
        <div className="nav-bar">
            <Logo />
            <NavList />
            {isOnLoginPage ? null : <Button event={handlePageClick}>Login</Button> }
        </div>
    );
}

export default NavBar;