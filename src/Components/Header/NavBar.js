import Button from "../ReuseComp/Button";
import Logo from "../ReuseComp/Logo";
import NavList from "./NavList";

function NavBar(){
    return(
        <div className="nav-bar">
            <Logo />
            <NavList />
            <Button>Login</Button>
        </div>
    );
}

export default NavBar;