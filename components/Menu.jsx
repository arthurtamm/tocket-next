import React, { useState } from 'react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = ({ toggleMenu, setToggleMenu, navSticky }) => {
    // Controlar o estado de abertura do menu
    const [isOpen, setIsOpen] = useState(false);

    const handleStateChange = (state) => {
        setIsOpen(state.isOpen);
        setToggleMenu(state.isOpen); // Sincroniza com o estado externo, se necessário
    };

    const menuStyles = {
        bmMenuWrap: {
            position: 'fixed',
            height: '100%',
            // Aplicando estilos condicionais com base em navSticky
            background: navSticky ? '#0c0513': 'bg-transparent'
        }
    };

    return (
        <div className="relative p-2">
            <Menu
                right
                styles={menuStyles} // Aplicando os estilos customizados
                isOpen={isOpen}
                onStateChange={handleStateChange}
                customBurgerIcon={<HamburgerIcon isOpen={isOpen} />}
                width={'150px'}
                className="right-0"
                customCrossIcon={false}
            >
                <Links />
            </Menu>
        </div>
    );
};


const HamburgerIcon = ({ isOpen }) => (
    <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
        <svg
            className="w-8 h-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path className="line line1" d="M4 6h16"></path>
            <path className="line line2" d="M4 12h16"></path>
            <path className="line line3" d="M4 18h16"></path>
        </svg>
    </div>
);


export const Links = () => (
    <>
        <Link
            href="/profile"
        >
            Minha conta
        </Link>

        <Link
            href='/myTickets'
        >
            Meus ingressos
        </Link>

        <Link
            href='/'
            onClick={() => {
                signOut();
            }}
        >
            Sair
        </Link>
    </>
);

export default HamburgerMenu;