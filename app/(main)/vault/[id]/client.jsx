"use client"
import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { db } from "@/config/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { LuLoaderCircle } from "react-icons/lu"
import { Snackbar } from "@mui/material"

const Client = ({ session }) => {
  const { id } = useParams()
  const router = useRouter()
  const [sending, setSending] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {

    const fetchCase = async () => {

      try {

        const docRef = doc(db, "cases", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {

          const data = docSnap.data()

          setTitle(data.title)
          setDescription(data.description)
          setCategory(data.category)
          setDate(data.date)

        }

      } catch (error) {
        console.error("Error fetching case:", error)
      } finally {
        setLoading(false)
      }

    }

    fetchCase()

  }, [id])


  const handleUpdate = async (e) => {

    e.preventDefault()

    try {
      setSending(true)
      const docRef = doc(db, "cases", id)
      await updateDoc(docRef, {
        title,
        description,
        category,
        date
      })
      
      router.push("/vault")
      handleClick({ vertical: 'top', horizontal: 'right' })

    } catch (error) {
      console.error("Error updating case:", error)
    }
    finally {
      setSending(false)
    }

  }


  if (loading) return <p className="text-center mt-20">Loading case...</p>


  return (
    <main className="min-h-dvh bg-[#f5f5f5] flex justify-center items-center p-6">

      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >

        <h1 className="text-2xl font-bold text-[#233D4C]">
          Edit Case
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded-lg h-32"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          disabled={sending}
          type="submit"
          className="w-full bg-[#F97316] text-[#0F172A] hover:opacity-90 text-white py-3 rounded-lg cursor-pionter"
        >
          {
            sending ?
              <span className='flex items-center justify-center gap-1'>
                <LuLoaderCircle className='animate-spin text-md md:text-lg' />
                Updating...
              </span> :
              <span className='flex items-center justify-center gap-1'>
                Update Case
              </span>
          }
        </button>

      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Successfully Updated!!!"
        key={vertical + horizontal}
        autoHideDuration={5000}
      />

    </main>
  )
}

export default Client