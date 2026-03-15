"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore"
import { db } from "@/config/firebase"
import { Avatar } from '@mui/material'
import { Patua_One } from 'next/font/google'
import { LuLoaderCircle } from "react-icons/lu";
import Link from 'next/link'
import { FaHeart } from "react-icons/fa";


const font = Patua_One({
    subsets: ["latin"],
    weight: ["400",],
});

const Client = ({ session }) => {

    const uid = session?.user?.id;

    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const filteredCases =
        searchTerm.trim() === ""
            ? cases
            : cases.filter((caseItem) => {
                const title = caseItem.title?.toLowerCase() || "";
                const description = caseItem.description?.toLowerCase() || "";
                const category = caseItem.category?.toLowerCase() || "";

                const search = searchTerm.toLowerCase();

                return (
                    title.includes(search) ||
                    description.includes(search) ||
                    category.includes(search)
                );
            });

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const q = query(
                    collection(db, "cases"),
                    orderBy("createdAt", "desc") // newest first
                )

                const querySnapshot = await getDocs(q)

                const casesArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setCases(casesArray)
            } catch (error) {
                console.error("Error fetching cases:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCases()
    }, [])

    console.log(cases);
    const timeAgo = (timestamp) => {
        if (!timestamp) return ""

        const now = new Date()
        const past =
            typeof timestamp.toDate === "function"
                ? timestamp.toDate()
                : new Date(timestamp)

        const seconds = Math.floor((now - past) / 1000)

        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)

        if (seconds < 60) return "Just now"
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`
        if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`
        if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`
        return `${years} year${years > 1 ? "s" : ""} ago`
    }
    const toggleLike = async (caseId, likes = []) => {

        try {

            const caseRef = doc(db, "cases", caseId)

            let updatedLikes

            if (likes.includes(uid)) {

                updatedLikes = likes.filter((id) => id !== uid)

            } else {

                updatedLikes = [...likes, uid]

            }

            await updateDoc(caseRef, {
                likes: updatedLikes
            })

            setCases(prev =>
                prev.map(item =>
                    item.id === caseId
                        ? { ...item, likes: updatedLikes }
                        : item
                )
            )

        } catch (error) {

            console.error("Error updating like:", error)

        }

    }


    return (
        <main className="min-h-dvh bg-[#f5f5f5] bg-no-repeat bg-center bg-cover min-h-dvh">
            <div className="pt-12 pb-10 lg:pt-32 lg:pb-20 md:pt-20 md:pb-16 min-h-dvh px-2 md:px-6 max-md:text-sm">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-10 max-md:px-2">
                        <h1 className="text-4xl font-bold text-[#233D4C] max-md:text-3xl">
                            Explore Cases
                        </h1>
                        <p className="text-[#000] mt-2">
                            Browse real-world cases shared by the community.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Search cases..."
                            className="w-full md:w-1/2 border p-3 rounded-lg border-[#233D4C] text-[#233D4C] focus:outline-none focus:ring-1 focus:ring-[#55fff6]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex md:flex-wrap gap-4 mb-10 overflow-x-auto ">
                        {["All", "Business", "Technology", "Law", "Social", "Personal"].map(
                            (cat) => (
                                <button
                                    key={cat}
                                    className="px-3 py-2 rounded-full hover:bg-[#F97316] hover:text-[#0F172A] transition
                                    text-[#f5f5f5] md:px-4 bg-[#233D4C] duration-200 transition-all cursor-pointer"
                                    onClick={() => setSearchTerm(cat === "All" ? "" : cat)}
                                >
                                    {cat}
                                </button>
                            )
                        )}
                    </div>


                    {/* Case Cards */}
                    {
                        loading ?
                            <span className='flex items-center justify-center gap-1 md:mt-20 mt-10'><LuLoaderCircle className='text-xl animate-spin text-center' /> <p>loading...</p> </span>
                            :
                            <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
                                {filteredCases.length === 0 ? (
                                    <p className='text-gray-700 text-center col-span-full'>No result found for "{searchTerm}"</p>
                                ) : (
                                    filteredCases.map(caseItem => (
                                        <div key={caseItem.id} className="bg-[#233D4C] rounded-xl p-5 shadow-md relative pb-10">
                                            <div className='flex gap-5 items-center mb-5'>
                                                <Avatar alt={caseItem.name} src={caseItem.image} sx={{
                                                    width: { xs: 48, sm: 54, md: 60 },
                                                    height: { xs: 48, sm: 54, md: 60 },
                                                }} className=' cursor-pointer ' />
                                                <div>
                                                    <div className={`mt-4 text-lg text-[#f5f5f5] ${font.className} antialiased font-base`}>
                                                        {caseItem.author}
                                                    </div>
                                                    <span className="text-sm text-gray-300 rounded capitalize">
                                                        {caseItem.category}
                                                    </span>
                                                    <p className='text-xs text-yellow-400'>Occurance Date:{`  `}<span className="">
                                                        {caseItem.date}
                                                    </span></p>
                                                </div>
                                            </div>

                                            <h2 className="font-bold text-md md:text-lg text-yellow-600 mb-2 capitalize">
                                                {caseItem.title}
                                            </h2>

                                            <p className="text-gray-200 text-base italic 
                                                overflow-hidden 
                                                [display:-webkit-box] 
                                                [-webkit-line-clamp:8] 
                                                [-webkit-box-orient:vertical]">
                                                {caseItem.description}
                                            </p>
                                            <Link className='md:text-sm text-xs underline text-red-500' href={`/explore/${caseItem.id}`}>Read more
                                            </Link>
                                            <div className='flex items-center bottom-3 left-6 absolute'>
                                                <p className="flex items-center gap-1 mt-3">

                                                    {caseItem.likes?.includes(uid) ? (

                                                        <FaHeart
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={() => toggleLike(caseItem.id, caseItem.likes)}
                                                        />

                                                    ) : (

                                                        <FaHeart
                                                            className="cursor-pointer text-[#f5f5f5]"
                                                            onClick={() => toggleLike(caseItem.id, caseItem.likes)}
                                                        />

                                                    )}

                                                    <span className="text-sm text-gray-300">
                                                        {caseItem.likes?.length || 0}
                                                    </span>

                                                </p>
                                            </div>
                                            <p className="text-xs font-semibold text-gray-400 mt-3  bottom-3 right-4 absolute">
                                                {timeAgo(caseItem.createdAt)}
                                            </p>
                                        </div>
                                    )))
                                }

                            </div>
                    }
                </div>
            </div>
        </main>
    )
}


export default Client

