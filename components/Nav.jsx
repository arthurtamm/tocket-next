"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
    const [ navSticky, setNavSticky ] = useState(false);
    
    useEffect(() => {

        const handleScroll = () => {
            const offset = window.scrollY;
            const isSticky = offset > 0;

            console.log('Scroll Offset:', offset);
            console.log('Is Sticky:', isSticky);

            setNavSticky(isSticky);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    return (
        <nav className={`transition-all duration-300  w-full top-0 z-10 ${navSticky ? 'bg-gray-800' : 'bg-transparent'}`}>
            <div className='flex items-center'>
                <Link href="/" className="flex flex-row-start">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Tocket Logo"
                        width={124}
                        height={30}
                        className='mt-4 ml-10'
                    />
                </Link>
            </div>
        </nav>
    )
}

export default Nav