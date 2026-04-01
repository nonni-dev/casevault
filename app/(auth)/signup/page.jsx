import React from 'react'
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { TiVendorApple } from "react-icons/ti";
import { FaGithub } from "react-icons/fa6";
import { signIn, auth } from "@/auth"
import { Denk_One } from 'next/font/google';
import { redirect } from 'next/navigation';

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
        <main className='min-h-screen md:min-h-dvh min-w-dvw flex items-center justify-center bg-[#233D4C] md:px-30 overflow-hidden'>
            <div className="md:min-w-md md:p-8 p-4">
                <h1 className={`text-xl font-semibold text-[#f5f5f5] md:text-3xl ${font.className} antialiased text-center`} alt='logo'>Case<span className='font-bold'>Vault</span></h1>

                <p className="text-sm text-[#f5f5f5] text-center mt-2 max-md:text-xs">
                    Join CaseVault to explore and contribute case studies
                </p>
                <div className="space-y-4 mt-5">
                    <div>
                        <label className="block text-sm text-[#f5f5f5] mb-1 font-semibold">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            className="w-full border rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-1 focus:ring-[#55fff6] border-gray-500 placeholder-gray-400 text-[#f5f5f5]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#f5f5f5] md:mb-2 mt-2 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full border rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-1 focus:ring-[#55fff6] placeholder-gray-400 border-gray-500 text-[#f5f5f5]"
                        />
                    </div>

                    <button
                        className="w-full mt-2 duration-300 rounded-md py-2 text-sm font-medium bg-[#F97316] text-[#f5f5f5] duration-200 transition hover:opacity-70 cursor-pointer"
                    >
                        Create an account
                    </button>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-500"></div>
                    <span className="mx-3 text-xs text-[#f5f5f5]">or</span>
                    <div className="flex-grow border-t border-gray-500"></div>
                </div>
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
                <p className="text-sm text-[#f5f5f5] text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="text-secondary hover:text-amber-500 cursor-pointer hover:underline duration-200"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}


export default page
