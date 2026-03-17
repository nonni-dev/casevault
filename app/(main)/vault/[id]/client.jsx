"use client"
import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { db } from "@/config/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { LuLoaderCircle } from "react-icons/lu"
import { Snackbar } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Client = () => {

  const { id } = useParams()
  const router = useRouter()

  const [sending, setSending] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [privacy, setPrivacy] = useState("")

  const [loading, setLoading] = useState(true)

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  })

  const { vertical, horizontal, open } = state

  const handleClick = (newState) => {
    setState({ ...newState, open: true })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  // Fetch Case
  useEffect(() => {

    if (!id) return

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
          setPrivacy(data.privacy || "")

        }

      } catch (error) {

        console.error("Error fetching case:", error)

      } finally {

        setLoading(false)

      }

    }

    fetchCase()

  }, [id])



  // Form Initial Values
  const iv = {
    title: title || "",
    category: category || "",
    description: description || "",
    date: date || "",
    privacy: privacy || "",
  }



  // Validation
  const formValidation = Yup.object({
    title: Yup.string()
      .required("This is a required field")
      .max(30, "Max of 30 characters"),

    category: Yup.string()
      .required("Select one"),

    description: Yup.string()
      .required("This is a required field"),

    date: Yup.date()
      .required("Select a date"),

    privacy: Yup.string()
      .required("Select visibility")
  })



  if (loading) {
    return (
      <p className="text-center mt-20 min-h-dvh">
        Loading case...
      </p>
    )
  }



  return (
    <main className="min-h-dvh bg-[#f5f5f5] flex justify-center items-center p-6">

      <Formik
        initialValues={iv}
        enableReinitialize
        validationSchema={formValidation}

        onSubmit={async (values) => {

          try {

            setSending(true)

            const docRef = doc(db, "cases", id)

            await updateDoc(docRef, {
              title: values.title,
              description: values.description,
              category: values.category,
              date: values.date,
              privacy: values.privacy
            })

            handleClick({ vertical: "top", horizontal: "right" })

            setTimeout(() => {
              router.push("/profile")
            }, 1200)

          } catch (error) {

            console.error("Error updating case:", error)

          } finally {

            setSending(false)

          }

        }}
      >

        <Form className="bg-white md:p-8 rounded-xl shadow-md w-full max-w-lg space-y-4 p-4">

          <h1 className="text-xl font-bold text-[#233D4C] md:text-3xl">
            Edit Case
          </h1>


          {/* Title */}

          <div>
            <label className="block font-medium max-md:text-sm">
              Case Title
            </label>

            <Field
              name="title"
              className="w-full border md:p-3 p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6]  max-md:text-sm"
              placeholder="Enter case title"
            />

            <ErrorMessage
              name="title"
              component="p"
              className="text-red-500 text-xs md:text-sm mt-1 italic"
            />
          </div>


          {/* Category */}

          <div>

            <label className="block font-medium max-md:text-sm">
              Category
            </label>

            <Field
              as="select"
              name="category"
              className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6] max-md:text-sm"
            >

              <option value="">
                Select category
              </option>

              <option value="business">
                Business
              </option>

              <option value="technology">
                Technology
              </option>

              <option value="law">
                Law
              </option>

              <option value="social">
                Social
              </option>

              <option value="personal">
                Personal
              </option>

            </Field>

            <ErrorMessage
              name="category"
              component="p"
              className="text-red-500 text-xs md:text-sm mt-1 italic"
            />

          </div>


          {/* Description */}

          <div>

            <label className="block font-medium max-md:text-sm">
              Case Description
            </label>

            <Field
              as="textarea"
              name="description"
              rows="6"
              className="w-full border p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6] max-md:text-sm"
              placeholder="Describe the case in detail..."
            />

            <ErrorMessage
              name="description"
              component="p"
              className="text-red-500 italic text-xs md:text-sm mt-1"
            />

          </div>


          {/* Date */}

          <div>

            <label className="block font-medium max-md:text-sm">
              Incident Date
            </label>

            <Field
              type="date"
              name="date"
              className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6] max-md:text-sm"
            />

            <ErrorMessage
              name="date"
              component="p"
              className="text-red-500 text-xs md:text-sm mt-1 italic"
            />

          </div>


          {/* Privacy */}

          <div>

            <label className="block font-medium max-md:text-sm">
              Visibility
            </label>

            <Field
              as="select"
              name="privacy"
              className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6] max-md:text-sm"
            >

              <option value="">
                Choose one
              </option>

              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>

            </Field>

            <ErrorMessage
              name="privacy"
              component="p"
              className="text-red-500 text-xs md:text-sm mt-1 italic"
            />

          </div>



          {/* Submit Button */}

          <button
            disabled={sending}
            type="submit"
            className="py-2 w-full flex gap-2 justify-center items-center bg-[#F97316] text-white md:py-3 rounded-lg font-semibold hover:opacity-90"
          >

            {
              sending ?

                <span className="flex items-center justify-center gap-1 max-md:text-sm">

                  <LuLoaderCircle className="animate-spin text-md md:text-lg" />

                  Updating...

                </span>

                :

                <span className="flex items-center justify-center gap-1 max-md:text-sm">

                  Update
                </span>
            }

          </button>

        </Form>

      </Formik>



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