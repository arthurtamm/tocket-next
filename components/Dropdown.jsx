import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Dropdown = ({ toggleDropdown, setToggleDropdown }) => {
    // Inline styles for the dropdown
    const dropdownStyles = {
        transition: 'all 0.3s ease-out',
        opacity: toggleDropdown ? 1 : 0,
        transform: toggleDropdown ? 'translateY(0)' : 'translateY(-20px)',
        visibility: toggleDropdown ? 'visible' : 'hidden',
        backgroundColor: '#1b1a2ee3',
        zIndex: 50,
    };

    // Adjusted inline styles for a perfect "X" burger menu animation
    const lineStyles = {
        transition: 'transform 0.3s ease, opacity 0.2s ease',
    };
    const line1Style = toggleDropdown ? { transform: 'rotate(45deg) translate(6px, -4px)', ...lineStyles } : lineStyles;
    const line2Style = toggleDropdown ? { opacity: 0, ...lineStyles } : lineStyles;
    const line3Style = toggleDropdown ? { transform: 'rotate(-45deg) translate(-14px, 0px)', ...lineStyles } : lineStyles;
    
    return (
        <>
            <div 
                className={`flex items-center cursor-pointer ${toggleDropdown ? 'open' : ''}`}
                onClick={() => setToggleDropdown(prev => !prev)}
            >
                <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path style={line1Style} d="M4 6h16"></path>
                    <path style={line2Style} d="M4 12h16"></path>
                    <path style={line3Style} d="M4 18h16"></path>
                </svg>
            </div>

            <div style={dropdownStyles} className="dropdown profile-dropdown">
                <Link href='/profile' className="dropdown_link" onClick={() => setToggleDropdown(false)}>Meus Dados</Link>
                <Link href='/myTickets' className="dropdown_link" onClick={() => setToggleDropdown(false)}>Meus Ingressos</Link>
                <button
                    type="button"
                    className='dropdown_link'
                    onClick={() => {
                        signOut();
                        setToggleDropdown(false);
                    }}
                >
                    Sair
                </button>
            </div>
        </>
    );
}

export default Dropdown;