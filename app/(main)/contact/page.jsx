import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { Dancing_Script } from 'next/font/google';
import { FaFacebookF } from 'react-icons/fa';

const protest = Dancing_Script({
  subsets: ["latin"],
  weight: ["700",],
});

const page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

        <div>
          <h1 className={`${protest.className} antialiased text-4xl font-old text-[#233D4C] mb-4`}>
            Send A Report
          </h1>

          <p className="text-gray-600 mb-6">
            Have a question, suggestion, or need support? Reach out to the
            CaseVault team and we’ll get back to you as soon as possible.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            If you don’t hear from us within 48 hours, kindly check your spam
            folder.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gray-200">
                <Phone className="w-5 h-5 text-[#233D4C]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600">+234 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4 ">
              <div className="p-3 rounded-full bg-gray-200">
                <Mail className="w-5 h-5 text-[#233D4C]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">casevaultinfo@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gray-200">
                <MapPin className="w-5 h-5 text-[#233D4C]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600">Abuja, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-semibold text-gray-800 mb-3">Follow Us</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl">
                <FaXTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pink-700 text-white flex items-center justify-center  text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#233D4C] rounded-2xl shadow-lg md:p-8 p-3 max-md:w-full">
          <h2 className="md:text-2xl font-bold text-[#f5f5f5] mb-6 text-xl max-md:pl-4">
            Send us a Message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border border-[#f5f5f5] py-2 md:py-3 pl-3 md:pl-4 focus:outline-none focus:ring-1 focus:ring-gray-700 placeholder-[#f5f5f5] max-md:placeholder-xs text-[#f5f5f5]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border border-[#f5f5f5] py-2 md:py-3 pl-3 md:pl-4 focus:outline-none focus:ring-1 focus:ring-gray-700 placeholder-[#f5f5f5] max-md:placeholder-xs text-[#f5f5f5]"
            />

            <textarea
              rows="5"
              placeholder="Tell us how we can help..."
              className="w-full rounded-lg border border-[#f5f5f5] py-2 md:py-3 pl-3 md:pl-4 focus:outline-none focus:ring-1 focus:ring-gray-700 placeholder-[#f5f5f5] max-md:placeholder-xs text-[#f5f5f5]"
            />

            <button
              type="submit"
              className="w-full rounded-lg text-[#154B48] py-2 md:py-4 font-semibold bg-[#f5f5f5] transition-all duration-300 hover:bg-[#55fff6]/60 hover:text-[#f5f5f5] max-md:mb-5"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default page