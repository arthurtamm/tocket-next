"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSwap, AiOutlineUser } from "react-icons/ai";

const Nav = () => {
    const [navSticky, setNavSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isSticky = window.scrollY > 0;
            setNavSticky(isSticky);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`transition-all duration-300 w-full top-0 z-10 ${navSticky ? 'bg-gray-800' : 'bg-transparent'}`}>
            <div className='flex justify-around'>
                <Link href="/" className="flex items-center ml-10">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Logo"
                        width={124}
                        height={30}
                    />
                </Link>

                <Link href="/home" className="text-white mx-2  flex items-center">
                    <AiOutlineHome className="mr-2" /> Início
                </Link>
                <Link href="/about" className="text-white mx-2  flex items-center">
                    <AiOutlineUser className="mr-2" /> Sobre Nós
                </Link>
                <Link href="/project" className="text-white mx-2 flex items-center">
                    <AiOutlineSwap className="mr-2" /> Marketplace
                </Link>
            </div>
        </nav>
    )
}

export default Nav;
