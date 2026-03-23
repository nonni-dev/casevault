import Client from "./client"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/config/firebase"

const fetchSinglePost = async (id) => {
  try {
    const docRef = doc(db, "cases", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()

      return {
        id,
        ...data,
        // ✅ FIX: convert Firestore timestamp
        createdAt: data.createdAt
          ? data.createdAt.toDate().toISOString()
          : null,
      }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

const Page = async ({ params }) => {
  const { id } = await params;   // ✅ FIX (NO await)

  const post = await fetchSinglePost(id)

  if (!post) {
    return <p className="text-center mt-20 min-h-dvh">Post not found.</p>
  }

  return <Client post={post} id={id} />
}

export default Page