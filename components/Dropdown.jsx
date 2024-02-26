import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Dropdown = ({ toggleDropdown, setToggleDropdown }) => {
    return (
        <>
            <div 
                className={`flex items-center burger-animate ${toggleDropdown ? 'open' : ''}`}
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
                    <path className="line1" d="M4 6h16"></path>
                    <path className="line2" d="M4 12h16"></path>
                    <path className="line3" d="M4 18h16"></path>
                </svg>
            </div>

            {toggleDropdown && (
                <div className={`dropdown profile-dropdown ${toggleDropdown ? 'active' : ''}`}>
                    <Link
                        href='/profile'
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        Perfil
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className='dropdown_link'
                    >
                        Sair
                    </button>
                </div>
            )}
        </>
    );
}

export default Dropdown;
