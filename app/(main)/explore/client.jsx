"use client"
import React, { useEffect, useState } from "react"
import {
  collection, getDocs, orderBy, query,
  doc, updateDoc, setDoc, deleteDoc, getDoc, increment
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { Avatar } from "@mui/material"
import { Patua_One } from "next/font/google"
import { LuLoaderCircle } from "react-icons/lu"
import Link from "next/link"
import { FaRegHeart } from "react-icons/fa6"
import { FaHeart, FaRegCommentDots } from "react-icons/fa"

const font = Patua_One({
  subsets: ["latin"],
  weight: ["400"],
})

const Client = ({ session }) => {

  const uid = session?.user?.id

  const [cases, setCases] = useState([])
  const [likedCases, setLikedCases] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCases =
    searchTerm.trim() === ""
      ? cases
      : cases.filter((caseItem) => {
        const title = caseItem.title?.toLowerCase() || ""
        const description = caseItem.description?.toLowerCase() || ""
        const category = caseItem.category?.toLowerCase() || ""
        const search = searchTerm.toLowerCase()

        return (
          title.includes(search) ||
          description.includes(search) ||
          category.includes(search)
        )
      })

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const q = query(
          collection(db, "cases"),
          orderBy("createdAt", "desc")
        )

        const querySnapshot = await getDocs(q)

        const casesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setCases(casesArray)

        // ✅ FIXED like-check (fast)
        if (uid) {
          const promises = casesArray.map(c => {
            const likeRef = doc(db, "cases", c.id, "likes", uid)
            return getDoc(likeRef)
          })

          const snaps = await Promise.all(promises)

          const likedMap = {}

          snaps.forEach((snap, index) => {
            if (snap.exists()) {
              likedMap[casesArray[index].id] = true
            }
          })

          setLikedCases(likedMap)
        }

      } catch (error) {
        console.error("Error fetching cases:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
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

  return (
    <main className="min-h-dvh bg-[#f5f5f5]">
      <div className="pt-10 pb-10 lg:pt-24 lg:pb-20 md:pt-20 md:pb-16 min-h-dvh px-2 md:px-6 max-md:text-sm">
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
              <span className='flex items-center justify-center gap-1 md:mt-20 mt-10'>
                <LuLoaderCircle className='text-xl animate-spin text-center' />
                <p>loading...</p>
              </span>
              :
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
                {filteredCases.length === 0 ? (
                  <p className='text-gray-700 text-center col-span-full'>
                    No result found for "{searchTerm}"
                  </p>
                ) : (
                  filteredCases.map(caseItem => (
                    <div key={caseItem.id} className="rounded-xl p-5 shadow-md lg:shadow-lg relative pb-10 bg-[#f5f5f5] bg-white">
                      <div className='flex gap-3 md:gap-5 items-center mb-5'>
                        <Avatar alt={caseItem.name} src={caseItem.image} sx={{
                          width: { xs: 48, sm: 54, md: 60 },
                          height: { xs: 48, sm: 54, md: 60 },
                        }} className=' cursor-pointer ' />
                        <div>
                          <div className={`mt-4 text-base md:text-lg text-[#233D4C] ${font.className}`}>
                            {caseItem.author}
                          </div>
                          <span className="md:text-sm text-gray-800 text-xs">
                            {caseItem.category}
                          </span>
                          <p className='text-xs text-yellow-800'>
                            Occurance Date: <span>{caseItem.date}</span>
                          </p>
                        </div>
                      </div>

                      <h2 className="font-bold text-md md:text-lg text-yellow-700 mb-2 capitalize">
                        {caseItem.title}
                      </h2>

                      <p className="text-gray-900 text-md md:text-base italic mx-auto 
                        overflow-hidden 
                        [display:-webkit-box] 
                        [-webkit-line-clamp:10] 
                        md:[-webkit-line-clamp:8] 
                        [-webkit-box-orient:vertical]">
                        {caseItem.description}
                      </p>

                      <Link className='md:text-sm text-xs underline text-red-500' href={`/explore/${caseItem.id}`}>
                        Read more
                      </Link>

                      <div className=" bottom-3 left-6 absolute">
                        <div className='flex items-center gap-8'>
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

                      <p className="text-xs font-semibold text-gray-500 mt-3 bottom-3 right-4 absolute">
                        {timeAgo(caseItem.createdAt)}
                      </p>

                    </div>
                  ))
                )}
              </div>
          }

        </div>
      </div>
    </main>
  )
}

export default Client