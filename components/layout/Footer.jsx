import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaWhatsapp, } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Denk_One } from 'next/font/google';
import { Mail, MapPin, Phone } from 'lucide-react';

const protest = Denk_One({
    subsets: ["latin"],
    weight: ["400",],
});

const Footer = () => {
    return (

        <main className="bg-[#233D4C] border-t border-gray-300 ">
            <div className="md:px-10 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12 gap-8">
                <div className='max-md:grid max-md:place-items-center'>
                    <h2 className={`md:text-xl text-lg font-semibold text-[#F5F5F5] ${protest.className} font-semibold`}>
                        Case<span className='font-bold'>Vault</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 leading-tight max-md:text-center max-md:max-w-xs md:min-w-xs">
                        A platform for documenting, analyzing, and learning from real-world cases.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h3 className="font-semibold text-white text-md mb-3">
                        Navigation
                    </h3>
                    <div className="flex flex-col space-y-2 text-sm text-slate-600">
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            Home
                        </Link>
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            Explore
                        </Link>
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            Write Case
                        </Link>
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            My Vault
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h3 className="text-md font-semibold text-[#F5F5F5] mb-3">
                        Legal
                    </h3>
                    <div className="flex flex-col space-y-2 text-sm text-slate-600">
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            About
                        </Link>
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            Privacy Policy
                        </Link>
                        <Link href={"#"} className="hover:text-amber-500 transition cursor-pointer text-gray-300">
                            Terms of Use
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <div>
                        <h1 className='text-md font-semibold text-[#F5F5F5] mb-3'>
                            Send A Report
                        </h1>
                        <div className="space-y-3">
            <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#55fff6]" />
              <div>
                <p className="text-gray-300">+234 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4 ">
                <Mail className="w-5 h-5 text-[#55fff6]" />
              <div>
                <p className="text-gray-300">casevaultinfo@gmail.com</p>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#55fff6]" />
              <div>
                <p className="text-gray-300">Abuja, Nigeria</p>
              </div>
            </div> */}
                        <a href="https://x.com/Nonni_d3v" className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg">
                            <FaXTwitter />
                        </a>
          </div>
                    </div>
                    <div className='flex gap-3 text-xl md:text-2xl max-md:mx-auto text-gray-800'>
                        {/* <a href="#" className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg">
                            <FaWhatsapp />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg">
                            <FaFacebookF />
                        </a> */}
                    </div>
                </div>

            </div>

            <div className="text-center md:text-sm text-gray-400 py-4 border-t border-gray-500 text-xs">
                © {new Date().getFullYear()} CaseVault. All rights reserved.
            </div>
        </main>
    )
}

export default Footer
