import NavBar from "./NavBar";
import { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";

function Header(){
    const location = useLocation();
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const isOnUserPage = location.pathname === "/user-profile" || location.pathname === "/user-appointments";
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setIsNavBarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevScrollPos]);

    return(
        <header className="header" style={{ display : isOnUserPage ? 'none' : 'flex' , transform: isNavBarVisible ? 'translateY(0)' : 'translateY(-500%)', transition: 'transform 0.3s ease' }}>
            <NavBar />
        </header>
    );
}

export default Header;