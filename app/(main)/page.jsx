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
            <section id="features" className=" lg:py-20 py-10 bg-[#F5F5F5] dark:bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C] dark:text-[#55fff6]/80">Why CaseVault?</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed text-base dark:text-gray-300">
                        A smarter way to explore real-world cases and ideas.
                    </p>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Case Libraries</h3>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                Access organized case collections across different fields and topics.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Community Insights</h3>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                Read opinions, discussions, and expert thoughts on every case.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl bg-[#233D4C]/10">
                            <h3 className="text-xl font-semibold text-[#F97316]">Save & Learn</h3>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                Bookmark cases, build your knowledge, and learn faster.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* STATS */}
            <section className="lg:py-20 py-10 bg-[#233D4C] text-white dark:bg-[#1a1a1a] border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold dark:text-[#55fff6]/70 text-[#55fff6]">
                            1K+
                        </h2>
                        <p className="mt-2 text-gray-300">Cases Shared</p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold dark:text-[#55fff6]/70 text-[#55fff6]">
                            500+
                        </h2>
                        <p className="mt-2 text-gray-300">Active Users</p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold dark:text-[#55fff6]/70 text-[#55fff6]">
                            20+
                        </h2>
                        <p className="mt-2 text-gray-300">Categories</p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold dark:text-[#55fff6]/70 text-[#55fff6]">
                            24/7
                        </h2>
                        <p className="mt-2 text-gray-300">Community Access</p>
                    </div>

                </div>
            </section>
            {/* HOW IT WORKS */}
            <section className="bg-[#EDEDED] lg:py-20 py-10 text-[#0F172A] dark:bg-neutral-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C] dark:text-[#55fff6]/70">How CaseVault Works</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-200">
                        Get started in minutes. Learn, explore and grow.
                    </p>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-[#F97316]">1</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C] dark:text-[#55fff6]/60">Create an account</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Sign up and get access to thousands of real-world cases.
                            </p>
                        </div>

                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-[#F97316]">2</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C] dark:text-[#55fff6]/60">Explore Cases</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Browse different categories and read real situations.
                            </p>
                        </div>

                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-[#F97316]">3</div>
                            <h3 className="mt-4 text-xl font-semibold text-[#233D4C] dark:text-[#55fff6]/60">Share Insights</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Comment, save, and discuss ideas with the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* USE CASES */}
            <section className="lg:py-20 py-10 bg-[#F5F5F5] dark:bg-neutral-900">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C] dark:text-[#55fff6]/70">
                            Who Uses CaseVault?
                        </h2>

                        <p className="md:mt-4 mt-2 text-gray-600 dark:text-gray-200">
                            Built for curious minds, researchers, and storytellers.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12 lg:mt-16 grid md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-800">
                            <h3 className="text-xl font-semibold text-[#F97316]">
                                Students
                            </h3>

                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                Learn from real-world situations and build practical knowledge.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-800">
                            <h3 className="text-xl font-semibold text-[#F97316]">
                                Researchers
                            </h3>

                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                Discover organized case studies and community discussions.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-800">
                            <h3 className="text-xl font-semibold text-[#F97316]">
                                Everyday People
                            </h3>

                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                Share experiences, opinions and lessons from real situations.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            {/* CTA */}
            <section className="bg-[url('/tech.bg.jpg')] bg-no-repeat bg-center bg-cover">
                <main className='bg-[#233D4C]/50'>
                    <div className='text-white py-24 text-center '>
                        <h2 className="text-2xl md:text-4xl font-bold max-md:max-w-md mx-auto">
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
            {/* TESTIMONIALS */}
            <section className="lg:py-20 py-10 bg-[#EDEDED] dark:bg-neutral-800">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C] dark:text-[#55fff6]/70">
                        What People Are Saying
                    </h2>

                    <div className="lg:mt-16 mt-8 md:mt-12 grid md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-900">
                            <p className="italic text-gray-600 dark:text-gray-300">
                                "CaseVault helped me discover perspectives I never considered before."
                            </p>

                            <h4 className="mt-4 font-semibold text-[#233D4C] dark:text-[#233DAC]/90">
                                — Daniel, Student
                            </h4>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-900">
                            <p className="italic text-gray-600 dark:text-gray-300">
                                "A clean and powerful way to learn from real-world experiences."
                            </p>

                            <h4 className="mt-4 font-semibold text-[#233D4C] dark:text-[#233DAC]/90">
                                — Sarah, Researcher
                            </h4>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md dark:bg-neutral-900">
                            <p className="italic text-gray-600 dark:text-gray-300">
                                "I love the simplicity and community aspect of the platform."
                            </p>

                            <h4 className="mt-4 font-semibold text-[#233D4C] dark:text-[#233DAC]/90">
                                — Michael, Writer
                            </h4>
                        </div>

                    </div>
                </div>
            </section>
            {/* FAQ */}
            <section className="lg:py-20 py-10 bg-white dark:bg-neutral-900">
                <div className="max-w-4xl mx-auto px-6">

                    <div className="text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#233D4C] dark:text-[#55fff6]/70">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="md:mt-12 md:space-y-8 mt-8 space-y-4">

                        <div>
                            <h3 className="font-semibold md:text-lg text-md text-[#233D4C] dark:text-[#55fff6]/70">
                                Is CaseVault free to use?
                            </h3>

                            <p className="mt-1 md:mt-2 text-gray-600 dark:text-gray-300 max-md:text-sm">
                                Yes. Anyone can explore and share cases for free.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold md:text-lg text-md text-[#233D4C] dark:text-[#55fff6]/70">
                                Can I save cases for later?
                            </h3>

                            <p className="mt-1 md:mt-2 text-gray-600 dark:text-gray-300 text-sm">
                                Yes. Bookmarking and personal vault features are supported.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold md:text-lg text-md text-[#233D4C] dark:text-[#55fff6]/70">
                                Who can post cases?
                            </h3>

                            <p className="mt-1 md:mt-2 text-gray-600 dark:text-gray-300 text-sm">
                                Any registered member of the community.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
export default page