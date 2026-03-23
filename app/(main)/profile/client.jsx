"use client"
import Avatar from "@mui/material/Avatar";
import { signOut } from "next-auth/react";
import { MdModeEdit } from "react-icons/md";
import React, { useEffect, useState } from "react"
import { collection, query, where, getDocs, doc, deleteDoc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/config/firebase"
import CircularProgress from "@mui/material/CircularProgress"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import Link from "next/link"
import { IoTrashOutline } from "react-icons/io5"
import { LuLoaderCircle } from "react-icons/lu"
import { Montserrat, Patua_One } from "next/font/google"
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const font = Patua_One({
    subsets: ["latin"],
    weight: ["400"],
})
const num = Montserrat({
    subsets: ["latin"],
    weight: ["700"],
})

const page = ({ session }) => {
    const uid = session?.user?.id

    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)
    const [snackOpen, setSnackOpen] = useState(false)
    const handleClose = () => setSnackOpen(false)
    const [likedCases, setLikedCases] = useState({})

    useEffect(() => {
        const fetchVaultCases = async () => {
            try {

                const q = query(
                    collection(db, "cases"),
                    where("userId", "==", uid)
                )

                const querySnapshot = await getDocs(q)

                const userCases = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setCases(userCases)
                if (uid) {
                    const promises = userCases.map(c => {
                        const likeRef = doc(db, "cases", c.id, "likes", uid)
                        return getDoc(likeRef)
                    })

                    const snaps = await Promise.all(promises)

                    const likedMap = {}

                    snaps.forEach((snap, index) => {
                        if (snap.exists()) {
                            likedMap[userCases[index].id] = true
                        }
                    })

                    setLikedCases(likedMap)
                }

            } catch (error) {
                console.error("Error fetching vault cases:", error)
            } finally {
                setLoading(false)
            }
        }

        if (uid) fetchVaultCases()
        if (!uid) return

    }, [uid])
    const toggleLike = async (caseId) => {
        try {
            if (!uid) return alert("Login first")

            const caseRef = doc(db, "cases", caseId)
            const likeRef = doc(db, "cases", caseId, "likes", uid)

            const likeSnap = await getDoc(likeRef)
            const alreadyLiked = likeSnap.exists()

            if (alreadyLiked) {
                await deleteDoc(likeRef)
                await updateDoc(caseRef, {
                    likesCount: increment(-1)
                })
            } else {
                await setDoc(likeRef, {
                    likedAt: new Date()
                })
                await updateDoc(caseRef, {
                    likesCount: increment(1)
                })
            }

            // ✅ instant UI update
            setLikedCases(prev => ({
                ...prev,
                [caseId]: !alreadyLiked
            }))

            setCases(prev =>
                prev.map(item =>
                    item.id === caseId
                        ? {
                            ...item,
                            likesCount: alreadyLiked
                                ? (item.likesCount || 0) - 1
                                : (item.likesCount || 0) + 1
                        }
                        : item
                )
            )

        } catch (error) {
            console.error("Error toggling like:", error)
        }
    }
    const handleDelete = async (id) => {
        try {

            setDeletingId(id)

            await deleteDoc(doc(db, "cases", id))

            setCases((prev) => prev.filter((item) => item.id !== id))

            setSnackOpen(true)

        } catch (error) {
            console.error("Delete error:", error)
        } finally {
            setDeletingId(null)
        }
    }
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

        if (seconds < 60) return "Just now"
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
        return `${days} day${days > 1 ? "s" : ""} ago`
    }

    return (
        <section className="min-h-screen md:px-38 md:py-12 bg-[#f5f5f5] px-2 py-6">
            <div className="">
                <div className='flex items-center md:gap-8 max-md:flex-col'>
                    {/* Header */}
                    <div className="flex flex-col items-center text-center">
                        <Avatar alt={session?.user?.name} src={session?.user?.image} sx={{
                            width: { xs: 100, sm: 120, md: 200 },
                            height: { xs: 100, sm: 120, md: 200 },
                        }} className='' />
                    </div>
                    <div className='flex flex-col md:gap-2'>
                        <div className='flex items-center md:gap-3 max-md:flex-col'>
                            <div className="max-md:flex items-center gap-2">
                                <h1 className="md:text-2xl font-bold md:mt-4 text-[#233D4C] text-lg mt-1">
                                    {session.user.name}
                                </h1>
                                <p className="md:hidden px-3 py-1 bg-gray-200 rounded-full font-semibold text-sm">Edit</p>
                            </div>
                            <div>
                                <p className="text-[#233D4C] font-semibold md:mt-5 text-sm md:text-md">{session.user.email}</p>
                            </div>
                        </div>
                        <div>

                            <button className="bg-[#F97316] text-[#0F172A] px-3 md:px-6 py-1 md:py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300 overflow-hidden max-md:hidden">
                                Edit Profile
                            </button>
                        </div>
                        <div className='flex items-center gap-5 max-md:mt-2 max-md:text-center max-md:mx-auto'>
                            <p ><span className={`text-gray-900 text-md md:text-sm font-bold ${num.className}`}>2</span> <span className='text-gray-700 text-xs md:text-sm font-semibold'>Case Written</span></p>
                            <p ><span className={`text-gray-900 text-md md:text-sm font-bold ${num.className}`}>234</span> <span className='text-gray-700 text-xs md:text-sm font-semibold'>Likes</span></p>
                            {/*<div className='mt-1 font-semibold'>
                            {
                                session ?
                                    <p className="text-green-700">Active</p>

                                    :
                                    <p className="text-red-400">Offline</p>
                            }
                        </div> */}
                        </div>
                        <p className="text-gray-800 text-xs md:text-sm mt-1 md:mt-3 font-semibold max-md:text-center">Member since 2026</p>
                    </div>

                </div>
                {/* Buttons */}
                {/*<form> <button onClick={() => signOut()} className=" hover:-translate-y-2 bg-[#233D4C] text-[#f5f5f5] font-semibold md:px-6 md:py-2 rounded-lg hover:opacity-90 duration-300 transition cursor-pointer text-sm md:text-base px-4 py-1 mb-8" type='submit'>
                    Logout </button>
                </form> */}
            </div>
            {/* Divider */}
            <hr className="my-8 text-gray-400" />

            <div className="max-w-7xl mx-auto min-h-[50dvh]">

                {/* Header */}
                <div className="mb-10 text-center">

                    <h1 className="md:text-3xl font-bold text-[#233D4C] text-xl">
                        Your Vault
                    </h1>

                    <p className="text-gray-600 md:mt-2 max-md:text-md">
                        Manage the cases you've shared.
                    </p>

                </div>


                {/* Loading */}
                {loading ? (

                    <span className="flex items-center justify-center gap-2 mt-20">
                        <LuLoaderCircle className="animate-spin text-xl" />
                        <p>Loading your cases...</p>
                    </span>

                ) : cases.length === 0 ? (

                    /* Empty Vault */

                    <div className="text-center mt-20 space-y-3">

                        <p className="md:text-lg text-gray-600 text-md">
                            You haven't posted any cases yet.
                        </p>

                        <Link
                            href="/writecase"
                            className="bg-[#233D4C] text-white px-5 py-2 rounded-lg max-md:text-md"
                        >
                            Post Your First Case
                        </Link>

                    </div>

                ) : (

                    /* Case Cards */

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {cases.map((caseItem) => (

                            <div
                                key={caseItem.id}
                                className="bg-[#f5f5f5] rounded-xl p-5 shadow-md relative pb-10"
                            >

                                {/* Author */}

                                <div className="flex gap-3 md:gap-4 items-center mb-4">

                                    <Avatar
                                        alt={caseItem.author}
                                        src={caseItem.image}
                                        sx={{
                                            width: 55,
                                            height: 55,
                                        }}
                                    />

                                    <div>

                                        <p
                                            className={`mt-4 text-base md:text-lg text-[#233D4C]  ${font.className} antialiased font-base`}
                                        >
                                            {caseItem.author}
                                        </p>
                                        <p className='text-xs text-yellow-800'>Occurance Date:{`  `}<span className="">
                                            {caseItem.date}
                                        </span></p>
                                        <span className="md:text-sm text-gray-800 capitalize text-xs">
                                            {caseItem.category}
                                        </span>

                                    </div>

                                </div>


                                {/* Title */}

                                <h2 className="font-bold text-md md:text-lg text-yellow-700 mb-2 capitalize">
                                    {caseItem.title}
                                </h2>


                                {/* Description */}

                                <p className="text-gray-900 text-md md:text-base italic mx-auto 
                                                overflow-hidden 
                                                [display:-webkit-box] 
                                                [-webkit-line-clamp:10] 
                                                md:[-webkit-line-clamp:8] 
                                                [-webkit-box-orient:vertical]">
                                    {caseItem.description}
                                </p>


                                {/* Read More */}

                                <Link className='md:text-sm text-xs underline text-red-500' href={`/explore/${caseItem.id}`}>Read more
                                </Link>

                                {/* Timestamp */}

                                <p className="text-xs font-semibold text-gray-500 mt-3  bottom-3 right-4 absolute">
                                    {timeAgo(caseItem.createdAt)}
                                </p>


                                {/* Delete Button */}

                                <div className="absolute top-3 right-3 flex items-center md:gap-3 gap-1">
                                    <Link
                                        //onClick={}
                                        //disabled={}
                                        href={`/vault/${caseItem.id}`}
                                        className=" text-[#f5f5f5]"
                                    >
                                        <MdModeEdit className="text-lg text-[#000]" />

                                    </Link>
                                    <button
                                        onClick={() => handleDelete(caseItem.id)}
                                        disabled={deletingId === caseItem.id}
                                        className=" text-red-500"
                                    >

                                        {deletingId === caseItem.id ? (

                                            <CircularProgress
                                                size={20}
                                                sx={{ color: "red" }}
                                            />

                                        ) : (

                                            <IoTrashOutline className="text-lg" />

                                        )}

                                    </button>
                                </div>
                                <div className='flex items-center bottom-3 left-6 absolute'>
                                    <p className="flex items-center gap-1 mt-3">

                                        {likedCases[caseItem.id] ? (
                                            <FaHeart
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => toggleLike(caseItem.id)}
                                            />
                                        ) : (
                                            <FaRegHeart
                                                className="cursor-pointer"
                                                onClick={() => toggleLike(caseItem.id)}
                                            />
                                        )}

                                        <span className="text-sm text-gray-800">
                                            {caseItem.likesCount || 0}
                                        </span>

                                    </p>
                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Snackbar */}

                <Snackbar
                    open={snackOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >

                    <MuiAlert
                        severity="success"
                        variant="filled"
                        onClose={handleClose}
                    >

                        Deleted Successfully!!!

                    </MuiAlert>

                </Snackbar>

            </div>


        </section>
    );
}


export default page