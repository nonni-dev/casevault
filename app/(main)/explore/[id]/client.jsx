"use client"
import { useState, useEffect } from "react"
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/config/firebase"
import { Patua_One } from "next/font/google"

const font = Patua_One({
  subsets: ["latin"],
  weight: ["400"],
})

const Client = ({ post, id }) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [sending, setSending] = useState(false)
  const [loadingComments, setLoadingComments] = useState(false)

  // ✅ SAFE DATE FIX
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Recently"

  // ✅ FETCH COMMENTS (NO orderBy → avoids indexOf crash)
  const fetchComments = async () => {
    try {
      const snap = await getDocs(collection(db, "cases", id, "comments"))

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }
  console.log(post);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "cases", id, "comments"),
          orderBy("createdAt", "desc")
        )

        const snapshot = await getDocs(q)

        const commentsArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setComments(commentsArray)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoadingComments(false)
      }
    }

    if (id) fetchComments()
  }, [id])

  // ✅ ADD COMMENT
  const handleComment = async () => {
    if (!comment.trim()) return

    try {
      setSending(true)

      await addDoc(collection(db, "cases", id, "comments"), {
        text: comment,
        createdAt: serverTimestamp()
      })

      setComment("")
      fetchComments()

    } catch (err) {
      console.error("Error adding comment:", err)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-dvh bg-[#f5f5f5] py-14 px-4">
      <section className="max-w-3xl bg-gray-50 shadow-lg rounded-2xl md:p-8 p-4 mx-auto">

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-[#233D4C]">
          {post.title}
        </h1>

        {/* Category */}
        <div className="flex justify-center">
          <span className="text-[#F97316] text-sm font-semibold capitalize">
            {post.category}
          </span>
        </div>

        {/* Author */}
        <p className="text-center mt-2 font-semibold">By</p>
        <div className="text-center">
          <span className={`${font.className} text-lg text-[#233D4C]`}>
            {post.author}
          </span>
        </div>

        {/* Date */}
        <p className="text-center text-gray-500 text-sm mt-2">
          Posted {formattedDate}
        </p>

        {/* Description */}
        <p className="mt-4 text-center text-gray-900">
          {post.description}
        </p>

        {/* COMMENTS */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Comments</h3>

          {/* Input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
            />

            <button
              onClick={handleComment}
              className="bg-[#233D4C] text-white px-4 rounded-lg"
            >
              Post
            </button>
          </div>

          {/* Comments List */}
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm">

                  <div className="flex items-center gap-3 mb-1">
                    <img
                      src={c.userImage}
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />

                    <p className="font-semibold text-sm">
                      {c.userName}
                    </p>
                  </div>

                  <p className="text-gray-800 text-sm">
                    {c.text}
                  </p>
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