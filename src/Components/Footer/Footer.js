import Logo from "../ReuseComp/Logo";
import NavList from "../Header/NavList";
import {useLocation} from "react-router-dom";

function Footer(){
    const location = useLocation();

    const isOnUserPage = location.pathname === "/user-profile" || location.pathname === "/login-page" || location.pathname === "/register-page" || location.pathname === "/user-appointments";

    return(
        <footer className="footer" id="footer" style={{ display : isOnUserPage ? 'none' : 'flex'}}>
            
            <div className="footer-logo">
                <Logo fontSize={'80px'} textSize={'30px'} margin={'0'} marginTextTop={'23px'}/>
                <h2>Transform Your Body with <span>FitSchedular</span></h2>
                <p id="footer-p">Use our schedule management app and make the change.</p>
            </div>

            <div className="footer-list">
                <p className="footer-title">MAIN PAGES</p>
                <NavList />
            </div>

            <div className="footer-list">
                <p className="footer-title">SOCIAL MEDIA</p>
                <ul>
                    <li><a href="#home-page">Instagram</a></li>
                    <li><a href="#home-page">Facebook</a></li>
                    <li><a href="#home-page">LinkedIn</a></li>
                    <li><a href="#home-page">Twitter</a></li>
                </ul>
            </div>

            <div className="footer-contact">
                <p className="footer-title">Contact</p>
                <p> Phone : <span>0712453345</span></p>
                <p> Email : <span>fit_shedular@gmail.com</span></p>
            </div>
        </footer>
    );
}

export default Footer;