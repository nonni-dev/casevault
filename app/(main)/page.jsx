import { auth } from '@/auth'
import React from 'react'

const page = async () => {
    const session = await auth()
    return (
        <main className='max-md:text-sm md:text-base'>
            {/* HERO */}
            <section className="bg-[url('/tech.bg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
                <div className="bg-[#233D4C]/50 text-white min-h-screen">
                    <div className="max-w-7xl mx-auto md:px-6 py-10 md:py-16 lg:py-24 text-center justify-center px-4">
                        <h1 className="text-2xl lg:text-6xl font-bold leading-tight mt-20 md:mt-10 md:text-4xl sm:text-xl">
                            Organize, Share & Discover <br />
                            <span className="text-[#55fff6]">Real-World Cases</span>
                        </h1>

                        <p className="mt-6 test-sm lg:text-lg md:text-md text-gray-300 max-w-2xl mx-auto">
                            CaseVault is a smart platform where people explore real cases,
                            share insights, and learn from real-life situations — all in one place.
                        </p>

                        <div className="mt-10 flex justify-center gap-4 max-md:flex-col ">
                            {
                                session ? 
                            <a
                                href="/signup"
                                className="bg-[#F97316] text-[#0F172A] px-4 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition hover:-translate-y-2 duration-300"
                            >
                                Write a case
                            </a>
                                
                                :
                                <a
                                href="/signup"
                                className="bg-[#F97316] text-[#0F172A] px-4 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition hover:-translate-y-2 duration-300"
                            >
                                Get Started
                            </a>
                            }

                            <a
                                href="#features"
                                className="border border-white/30 px-8 md:py-3 py-2 rounded-lg hover:bg-white/10 transition hover:-translate-y-2 duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div></div>
            </section>

            {/* FEATURES */}
            <section id="features" className=" lg:py-24 py-10 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C]">Why CaseVault?</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed text-base">
                        A smarter way to explore real-world cases and ideas.
                    </p>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Case Libraries</h3>
                            <p className="mt-3 text-gray-700">
                                Access organized case collections across different fields and topics.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Community Insights</h3>
                            <p className="mt-3 text-gray-700">
                                Read opinions, discussions, and expert thoughts on every case.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Save & Learn</h3>
                            <p className="mt-3 text-gray-700">
                                Bookmark cases, build your knowledge, and learn faster.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA */}
            <section className="bg-[url('/tech.bg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
                <main className='bg-[#233D4C]/50'>
                    <div className='text-white py-24 text-center '>
                        <h2 className="text-2xl md:text-4xl font-bold max-md:max-w-md">
                            Start Exploring Real Cases Today
                        </h2>

                        <p className="mt-4 text-gray-300">
                            Join CaseVault and learn from real-world experiences.
                        </p>

                        <div className="mt-8">
                            {
                                session ?
                                <a
                                href="/explore"
                                className="bg-[#F97316] text-[#0F172A] px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Explore Cases
                            </a>
                                :
                            <a
                                href="/signup"
                                className="bg-[#F97316] text-[#0F172A] px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Create Free Account
                            </a>
                            }
                        </div>
                    </div>
                </main>
            </section>
            {/* HOW IT WORKS */}
            <section className="bg-[#EDEDED]/70 py-24 text-[#0F172A] border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#233D4C]">How CaseVault Works</h2>
                    <p className="mt-4 text-gray-600">
                        Get started in minutes. Learn, explore and grow.
                    </p>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div>
                            <div className="text-3xl font-bold text-[#F97316]">1</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C]">Create an account</h3>
                            <p className="mt-2 text-gray-600">
                                Sign up and get access to thousands of real-world cases.
                            </p>
                        </div>

                        <div>
                            <div className="text-3xl font-bold text-[#F97316]">2</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C]">Explore Cases</h3>
                            <p className="mt-2 text-gray-600">
                                Browse different categories and read real situations.
                            </p>
                        </div>

                        <div>
                            <div className="text-3xl font-bold text-[#F97316]">3</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C]">Share Insights</h3>
                            <p className="mt-2 text-gray-600">
                                Comment, save, and discuss ideas with the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default page