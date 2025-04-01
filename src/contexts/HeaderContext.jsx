import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

const HeaderProvider = ({children}) => {
    const [header, setHeader] = useState(false)
    const [navbar, setNavbar] = useState(false)
    const [scroll, setScroll] = useState(false)


    const onHeader = () => {
        setHeader(false);
        if (window.scrollY > 50) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    }

    const onNavbar = () => {
        setNavbar(!navbar)
    }

    const showScroll = () => {
        if (window.scrollY > 500) {
            setScroll(true);
        } else {
            setScroll(false)
        }
    }
    window.addEventListener('scroll', showScroll)

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return(
        <HeaderContext.Provider value={{header, onHeader, navbar, onNavbar, 
        scroll, scrollUp, setNavbar}}>
            {children}
        </HeaderContext.Provider>
    );
}

export default HeaderProvider;