"use client"
import { useState, useEffect } from "react"
import {
    collection,
    addDoc,
    serverTimestamp,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    increment
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { IoTrashOutline } from "react-icons/io5"
import { FaPaperPlane } from "react-icons/fa"

export default function ClientComments({ id, session }) {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)
    const uid = session?.user?.id
    // console.log("ID:", id);
    // console.log("OPEN:", open);



    // ✅ REAL-TIME COMMENTS
    useEffect(() => {
        if (!id) return

        if (open) {
            setLoading(true)
        }

        const q = query(
            collection(db, "cases", id, "comments"),
            orderBy("createdAt", "desc")
        )

        const unsub = onSnapshot(
            q,
            (snap) => {
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setComments(data)

                setTimeout(() => {
                    setLoading(false)
                }, 600)
            },
            (error) => {
                console.error("Snapshot error:", error)
                setLoading(false)
            }
        )

        return () => unsub()
    }, [id, open])

    // ✅ ADD COMMENT
    const handleComment = async () => {
        if (!comment.trim()) return
        if (!session) return alert("Login first")

        try {
            setSending(true)

            await addDoc(collection(db, "cases", id, "comments"), {
                text: comment,
                userId: session.user.id,
                userName: session.user.name,
                userImage: session.user.image,
                createdAt: serverTimestamp()
            })
            console.log("Comment added");

            await updateDoc(doc(db, "cases", id), {
                commentsCount: increment(1)
            })
            console.log("Count Increment");

            setComment("")
        } catch (err) {
            console.error(err)
        } finally {
            setSending(false)
        }
    }
    // DELETE COMMENT
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteDoc(doc(db, "cases", id, "comments", commentId))
            await updateDoc(doc(db, "cases", id), {
                commentsCount: increment(-1)
            })
        } catch (error) {
            console.error("Error deleting comment:", error)
        }
    }

    // ✅ TIME AGO
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

    return (
        <div className="flex flex-col h-full">
            {/* COMMENTS LIST */}
            <div className="flex-1 overflow-y-auto pr-1">
                {loading ? (
                    <div className="space-y-3 animate-pulse p-2 min-h-[60vh]">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : comments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center mt-10 min-h-[50vh] md:text-md">
                        No comments yet
                    </p>

                ) : (
                    <div className="space-y-2 p-1 min-h-[60vh]">
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-3 bg-white p-2 rounded-md shadow-sm">
                                <div className="flex justify-between w-full">
                                    <div className="flex gap-2">
                                        {/* IMAGE */}
                                        <img
                                            src={c.userImage || "/default-avatar.png"}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="font-semibold text-sm">
                                                    {c.userName || "Anonymous"}
                                                </p>

                                                <p className="text-sm text-gray-800">
                                                    {c.text}
                                                </p>
                                                <span className="text-xs text-gray-500">{timeAgo(c.createdAt)}</span>
                                            </div>
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

            {/* INPUT BAR */}
            <div className="flex gap-2 border-t pt-3 bg-white sticky bottom-0">

                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleComment()
                    }}
                />

                <button
                    onClick={handleComment}
                    disabled={sending}
                    className="bg-[#233D4C] text-white px-3 rounded-full"
                >
                    {sending ? "..." : <FaPaperPlane />}
                </button>

            </div>

        </div>
    )
}