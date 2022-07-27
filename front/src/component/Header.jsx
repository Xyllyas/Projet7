import React from 'react';
import logo from '../assets/icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback} from 'react';

const Header = () => {
function logout() {
        localStorage.clear()
        window.location.reload(false)
}

    const [scrollup, setScrollup] = useState(false)
    const [y, setY] = useState(0);
  
    const handleNavigation = useCallback((e) => {
      const window = e.currentTarget;
      if (y >= (window.scrollY + 150)) {
            setScrollup(true)
      } else if (y < window.scrollY) {
        setScrollup(false)
      }else if (window.scrollY === 0) {
        setScrollup(false)
      }
      setY(window.scrollY);
    }, [y]);
  
    useEffect(() => {
      setY(window.scrollY);
      window.addEventListener("scroll", (e) => handleNavigation(e));
    },[handleNavigation]);

    return (
        <header className={scrollup === true ? 'sticky' : null}>
            <div className='logo'>
            <img onClick={()=>window.location.reload(false)} src={logo} alt="Groupomania" />
            </div>
            <div className='button'>
            <button onClick={logout} >
              <FontAwesomeIcon icon={faRightFromBracket} /> 
              <span>Se deconnecter</span>
              </button>
            </div>
            
        </header>
    );
};

export default Header;