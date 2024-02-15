import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Dropdown = ({ toggleDropdown, setToggleDropdown }) => {
    return (
        <>
            <Image
                src={"/assets/images/icon-three-bars.jpg"}
                width={37}
                height={37}
                alt='profile'
                onClick={() => setToggleDropdown((prev) => !prev)}
            />

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