import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { TiVendorApple } from "react-icons/ti";
import { FaGithub } from "react-icons/fa6";
import Link from 'next/link';
import { signIn, auth } from "@/auth"
import { redirect } from 'next/navigation';
import { Denk_One } from 'next/font/google';

const font = Denk_One({
    subsets: ["latin"],
    weight: ["400",],
});

const page = async () => {
    
  const session = await auth();
  console.log(session);

  if (session) {
          redirect("/")
      }

    return (
        <div className="min-h-screen md:min-h-dvh md:min-w-dvw flex items-center justify-center bg-[#233D4C] md:px-30 overflow-hidden w-full">
            <div className="md:min-w-md p-4 md:p-8">

                {/* Logo */}
                <h1 className={`text-xl font-semibold text-[#f5f5f5] md:text-3xl ${font.className} antialiased text-center`} alt='logo'>Case<span className='font-bold'>Vault</span></h1>

                <p className="text-sm text-[#f5f5f5] text-center mt-1">
                    Sign in to your account
                </p>
                {/* Email Sign In */}
                <div>
                    <label className="block text-sm text-slate-700 mb-1 mt-5">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#55fff6] placeholder-[#f5f5f5]"
                    />

                    <button className="w-full mt-4 duration-300 rounded-md py-2 text-sm font-medium bg-[#F97316] text-[#f5f5f5] duration-200 transition hover:opacity-70 cursor-pointer">
                        Continue with Email
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-3 text-sm text-[#f5f5f5]">or</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                {/* OAuth Buttons */}
                <div className="mt-6 space-y-3">

                    <form action={async () => {
                        "use server"
                        await signIn("google")
                    }}>
                        <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold bg-[#f5f5f5] transition cursor-pointer hover:opacity-70 duration-300">
                            <FcGoogle className='text-xl' />
                            <p className='text-[#233D4C]'>Continue with Google</p>
                        </button>
                    </form>

                    <button className="w-full flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold bg-[#f5f5f5] transition cursor-pointer hover:opacity-70 duration-300">
                        <TiVendorApple className='text-xl' />
                        <p className='text-[#233D4C]'>Continue with Apple </p>
                    </button>

                    <button className="w-full flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold bg-[#f5f5f5] transition cursor-pointer hover:opacity-70 duration-300">
                        <FaGithub className='text-xl' />
                        <p className='text-[#233D4C]'>Continue with GitHub</p>
                    </button>

                </div>

                {/* Footer Link */}
                <p className="text-sm text-[#f5f5f5] text-center mt-6">
                    Don’t have an account?{" "}
                    <Link href={"/signup"} className="text-secondary hover:text-amber-500 cursor-pointer hover:underline duration-200">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>

    );
}


export default page
