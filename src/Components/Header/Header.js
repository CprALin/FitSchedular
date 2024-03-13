import NavBar from "./NavBar";
import { useState , useEffect } from "react";

function Header(){
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
  
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
        <header className="header" style={{ transform: isNavBarVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}>
            <NavBar />
        </header>
    );
}

export default Header;