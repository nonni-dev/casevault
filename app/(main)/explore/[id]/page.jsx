import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/config/firebase';
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { Patua_One } from "next/font/google"

const font = Patua_One({
    subsets: ["latin"],
    weight: ["400"],
})

const fetchSinglePost = async (id) => {
  try {
    const docRef = doc(db, "cases", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("AN ERROR OCCURRED", error);
    throw error;
  }
};

const Page = async ({ params }) => {
  const { id } = await params; // ✅ FIXED: params is not async, removed "await"

  const post = await fetchSinglePost(id);

  if (!post) {
    return <p>Post not found.</p>;
  }

  // ✅ FIXED: Convert Firestore Timestamp → JS Date → readable string
  const formattedDate =
    post.createdAt?.toDate().toLocaleString() || "No date";

  return (
    <main className="min-h-dvh bg-[#f5f5f5] py-14 px-4">
      <section className="max-w-3xl bg-gray-50 shadow-lg rounded-2xl md:p-8 p-4 mx-auto">

        {/* Back Button */}
        {/*<Link
        //  href="/explore"
         // className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
         <FaArrowLeftLong />
          Back to cases
        </Link> */}

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-[#233D4C] leading-snug">
          {post.title}
        </h1>

        {/* Category */}
        <div className="flex justify-center">
          <span className="text-[#F97316] text-sm font-semibold capitalize">
            {post.category}
          </span>
        </div>
          <p className='flex items-center justify-center md:mt-4 mt-2 text-sm font-semibold'>By</p>
        {/* Author Section */}
        <div className="flex items-center justify-center text-sm text-gray-500 md:flex-col text-center">
          <span className={` text-base md:text-lg text-[#233D4C]  ${font.className} antialiased font-base`}>{post.author}</span>
        </div>

        <div className="h-px bg-gray-200 mt-3" />

        {/* Description */}
        <p className="leading-relaxed mx-3 text-center text-gray-900 text-md md:text-base">
          {post.description}
        </p>
        <p className='flex items-center text-sm font-semibold text-gray-500 gap-1 mt-3 max-md:text-xs'>
          <p>Posted</p><span>{formattedDate}</span>
        </p>
      </section>
    </main>
  );
};

export default Page;
