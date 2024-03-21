import { Link } from "react-router-dom";

function NavList({active}){

    const handleLinkClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      };

    return(
        <div className={`nav-list ${active? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => handleLinkClick("home-page")}>Home</Link></li>
                    <li><Link to="/" onClick={() => handleLinkClick("about-us")}>About</Link></li>
                    <li><Link to="/" onClick={() => handleLinkClick("subs")}>Price</Link></li>
                    <li><Link to="/" onClick={() => handleLinkClick("footer")}>Contact</Link></li>
                </ul>
        </div>
    );
}

export default NavList;