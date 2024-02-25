import Logo from "../Header/Logo";
import NavList from "../Header/NavList";

function Footer(){
    return(
        <footer className="footer scroll-target" id="footer">
            <div className="footer-logo">
                <Logo fontSize={'80px'} textSize={'30px'}/>
                <h2>Transform Your Body with <span>FitSchedular</span></h2>
                <p>Use our schedule management app and make the change.</p>
            </div>

            <div className="footer-pages">
                <p>MAIN PAGES</p>
                <NavList />
            </div>

            <div className="footer-social">
                <p>SOCIAL MEDIA</p>
                <ul>
                    <li><a href="#home-page">Instagram</a></li>
                    <li><a href="#home-page">Facebook</a></li>
                    <li><a href="#home-page">LinkedIn</a></li>
                    <li><a href="#home-page">Twitter</a></li>
                </ul>
            </div>

            <div className="footer-contact">
                <p>Contact</p>
                <p> Phone : <span>0712453345</span></p>
                <p> Email : <span>fit_shedular@gmail.com</span></p>
            </div>
        </footer>
    );
}

export default Footer;