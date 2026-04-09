"use client"
import React from "react"

const Page = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 md:px-16 py-16">

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-[#233D4C]">
          About CaseVault
        </h1>
        <p className="mt-4 text-gray-700 text-md md:text-lg">
          A platform built to capture, share, and learn from real-life cases.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          Not just stories — real experiences, real lessons.
        </p>
      </section>

      {/* WHAT IS CASEVAULT */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#233D4C] mb-3">
          What is CaseVault?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          CaseVault is a platform designed for people to document and share
          real-world cases — situations they’ve experienced, witnessed, or
          learned from. These cases span across multiple areas like business,
          technology, law, social life, and personal experiences.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Instead of relying only on theories, CaseVault focuses on real-life
          situations that provide deeper understanding and practical insights.
        </p>
      </section>

      {/* THE PROBLEM */}
      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#233D4C] mb-3">
          The Problem
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Most platforms today are filled with opinions, trends, and surface-level
          discussions. While useful, they often lack depth and real-life context.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          People learn faster and better through real situations — what actually
          happened, what went wrong, and what could have been done differently.
        </p>
      </section>

      {/* THE SOLUTION */}
      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#233D4C] mb-3">
          Our Solution
        </h2>
        <p className="text-gray-700 leading-relaxed">
          CaseVault provides a space where users can:
        </p>

        <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
          <li>Document real-life cases and experiences</li>
          <li>Explore cases shared by others</li>
          <li>Learn from real-world outcomes</li>
          <li>Engage with content through likes and interactions</li>
        </ul>
      </section>

      {/* FEATURES */}
      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#233D4C] mb-6 text-center">
          Core Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-[#233D4C] text-lg">📌 Case Creation</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Users can share detailed cases with titles, descriptions, categories,
              and timelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-[#233D4C] text-lg">🔍 Explore System</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Browse and search through a growing collection of real-world cases.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-[#233D4C] text-lg">❤️ Likes</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Interact with cases and highlight valuable experiences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-[#233D4C] text-lg">🛠 Case Management</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Edit, update, and manage your own cases easily.
            </p>
          </div>

        </div>
      </section>

      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

  {/* HOW IT WORKS */}
  <section>
    <h2 className="text-2xl font-semibold text-[#233D4C] mb-4">
      How It Works
    </h2>

    <div className="space-y-4 text-gray-700">
      <p><strong>1.</strong> Create an account and log in</p>
      <p><strong>2.</strong> Write and publish a case</p>
      <p><strong>3.</strong> Explore cases shared by others</p>
      <p><strong>4.</strong> Engage through likes and (soon) comments</p>
    </div>
  </section>

  {/* FUTURE */}
  <section>
    <h2 className="text-2xl font-semibold text-[#233D4C] mb-4">
      Future Plans
    </h2>

    <p className="text-gray-700 mb-4">
      CaseVault is continuously evolving. Upcoming features include:
    </p>

    <div className="space-y-2 text-gray-700">
      <p>💬 Comments system</p>
      <p>🔖 Bookmarks / Save cases</p>
      <p>🌙 Dark mode</p>
      <p>👤 User profiles & followers</p>
    </div>
  </section>

</div>

      {/* BUILDER SECTION */}
      <section className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#233D4C] mb-3">
          Built By
        </h2>
        <p className="text-gray-700">
          Built with passion by a developer documenting his journey and
          improving every day 🚀
        </p>
      </section>

      {/* FOOTER */}
      <section className="mt-10 text-center text-gray-500 text-sm">
        Built with ❤️ using Next.js & Firebase
      </section>
    </main>
  )
}

export default Page