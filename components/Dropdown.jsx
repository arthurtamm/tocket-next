import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Dropdown = ({ toggleDropdown, setToggleDropdown }) => {
    return (
        <>
            <div 
                className="flex p-1/2 items-center"
                onClick={() => setToggleDropdown((prev) => !prev)}
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
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </div>

                                        {
            toggleDropdown && (
                <div className="dropdown bg-black z-50">
                    <Link
                        href='/perfil'
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        Perfil
                    </Link>

                    <Link
                        href='/eventos'
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        Eventos
                    </Link>


                    <Link
                        href='/sac'
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        SAC
                    </Link>
                    <Link
                        href='/sobre'
                        className="sm:hidden dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        Sobre nós
                    </Link>
                    <Link
                        href='/project'
                        className=" sm:hidden dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                    >
                        Marketplace
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
                )
            }
        </>
    );
}

export default Dropdown;