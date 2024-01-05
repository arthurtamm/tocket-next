import React from "react";
import Image from 'next/image';
import Link from 'next/link';
// import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();

    return (
        <div className="footer bg-gray-800 text-white p-4 sticky">
            <div className="container mx-auto flex justify-between">
                <div className="footer-copywright">
                    <h3>TOCKET</h3>
                </div>
                <div className="footer-copywright">
                    <h3>{year}</h3>
                </div>
                <div className="footer-copywright">
                    <h3>contato.tocket@gmail.com</h3>
                </div>
                {/* <div className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <Link href="https://www.instagram.com/ingressofacil.sp/">
                <a target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram />
                </a>
              </Link>
            </li>
          </ul>
        </div> */}
            </div>
        </div>
    );
}

export default Footer;
