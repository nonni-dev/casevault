"use client"
import { useState, useEffect } from "react"
import { collection, addDoc, serverTimestamp, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "@/config/firebase"
import { Patua_One } from "next/font/google"
import { FaPaperPlane } from "react-icons/fa"
import { IoTrashOutline } from "react-icons/io5"

const font = Patua_One({
  subsets: ["latin"],
  weight: ["400"],
})

const Client = ({ post, id, session }) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [sending, setSending] = useState(false)
  const [loadingComments, setLoadingComments] = useState(true)

  const uid = session?.user?.id

  // FORMAT DATE
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently"

  // REAL-TIME COMMENTS (FIXED)
  useEffect(() => {
    if (!id) return

    const q = query(
      collection(db, "cases", id, "comments"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))

      setComments(data)
      setLoadingComments(false)
    })

    return () => unsubscribe()
  }, [id])

  // ADD COMMENT (WITH OPTIMISTIC UI)
  const handleComment = async () => {
    if (!comment.trim()) return
    if (!session) return alert("Login first")

    const tempComment = {
      id: Date.now(),
      text: comment,
      userId: session.user.id,
      userName: session.user.name,
      userImage: session.user.image,
      createdAt: new Date()
    }

    try {
      setSending(true)

      // Optimistic update
      setComments(prev => [tempComment, ...prev])

      setComment("")

      await addDoc(collection(db, "cases", id, "comments"), {
        text: tempComment.text,
        userId: tempComment.userId,
        userName: tempComment.userName,
        userImage: tempComment.userImage,
        createdAt: serverTimestamp()
      })

    } catch (err) {
      console.error("Error adding comment:", err)
    } finally {
      setSending(false)
    }
  }

  // TIME AGO
  const timeAgo = (timestamp) => {
    if (!timestamp) return ""

    const now = new Date()
    const past =
      typeof timestamp?.toDate === "function"
        ? timestamp.toDate()
        : new Date(timestamp)

    const seconds = Math.floor((now - past) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return "Just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hr ago`
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  // DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "cases", id, "comments", commentId))
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <main className="min-h-dvh bg-[#f5f5f5] py-8 px-4 md:py-10 lg:py-14">
      <section className="max-w-3xl bg-gray-50 shadow-lg rounded-2xl md:p-8 p-4 mx-auto">

        <h1 className="text-xl md:text-4xl font-bold text-center text-[#233D4C]">
          {post.title}
        </h1>

        <div className="flex justify-center">
          <span className="text-[#F97316] text-xs md:text-sm font-semibold capitalize">
            {post.category}
          </span>
        </div>

        <p className="text-center mt-2 font-semibold">By</p>
        <div className="text-center">
          <span className={`${font.className} text-md md:text-lg text-[#233D4C]`}>
            {post.author}
          </span>
        </div>

        <p className="text-center text-gray-500 text-xs md:text-sm mt-2">
          Posted {formattedDate}
        </p>

        <p className="mt-4 text-center text-gray-900 text-sm md:text-base">
          {post.description}
        </p>

        {/* COMMENTS */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">
            Comments ({comments.length})
          </h3>

          {/* INPUT */}
          <div className="flex gap-2 md:mb-6 mb-3">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-1 md:p-2 rounded-lg placeholder:text-xs md:placeholder:text-sm text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#233D4C] border-[#233D4C]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleComment()
              }}
            />

            <button
              onClick={handleComment}
              disabled={sending}
              className="bg-[#233D4C] text-white md:px-4 rounded-lg px-2 disabled:opacity-50"
            >
              {sending ? (
                <span className="animate-pulse">...</span>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>

          {/* LIST */}
          {loadingComments ? (
            <p className="text-sm md:text-md">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="p-1 md:p-3 bg-white rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <img
                        src={c.userImage || "/default-avatar.png"}
                        alt="user"
                        className="w-8 h-8 rounded-full md:h-10 md:w-10"
                      />
                      <div>
                        <p className="font-semibold text-sm md:text-md">
                          {c.userName || "Anonymous"}
                        </p>
                        <p className="text-gray-900 text-sm">
                          {c.text}
                        </p>
                        <p className="text-[10px] font-semibold text-gray-500 md:text-xs">
                          {timeAgo(c.createdAt)}
                        </p>
                      </div>
                    </div>

                    {c.userId === uid && (
                      <button onClick={() => handleDeleteComment(c.id)}>
                        <IoTrashOutline className="text-lg text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </main>
  )
}

export default Client