"use client";
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaPaperPlane } from 'react-icons/fa6';
import * as Yup from 'yup';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/config/firebase';
import { LuLoaderCircle } from "react-icons/lu";
import Snackbar from '@mui/material/Snackbar';

const Client = ({ session }) => {
    const [sending, setSending] = useState(false)
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

    const iv = {
        title: "",
        category: "",
        description: "",
        date: "",
        privacy: "",
    }
    const formValidation = Yup.object({
        title: Yup.string().required("This is a required field").max(30, "Max of 30 characters"),
        category: Yup.string().required("Select one"),
        description: Yup.string().required("This is a required field"),
        privacy: Yup.string().required("Select visibility")
    })
    return (
        <main className="min-h-dvh bg-[url('/case-bg.jpg')] bg-no-repeat bg-center bg-cover">
            <section className='bg-[#0F172A]/50 min-h-dvh'>
                <div className="pt-20 pb-20 md:px-6 max-md:py-8 px-3 max-md:text-sm">
                    <div className="max-w-3xl mx-auto bg-slate-200 md:p-10 rounded-xl shadow-lg p-4">
                        <h1 className="text-xl font-bold text-[#233D4C] md:text-3xl">
                            Submit a Case
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Share real-world situations and let others learn from them.
                        </p>

                        <Formik
                            initialValues={iv} validationSchema={formValidation}
                            onSubmit={async (values, { resetForm }) => {
                                if (!session) {
                                    alert("You must be logged in to post")
                                    return
                                }
                                const dbObject = {
                                    ...values,
                                    createdAt: serverTimestamp(),
                                    userId: session?.user?.id,
                                    image: session?.user?.image || "",
                                    author: session?.user?.name || "Anonymous",
                                    likesCount: 0,
                                }
                                try {
                                    setSending(true)
                                    const docRef = await addDoc(collection(db, "cases"), dbObject);
                                    console.log("Document written with ID: ", docRef.id);
                                    console.log(dbObject);
                                    handleClick({ vertical: 'top', horizontal: 'right' })

                                }catch (error) {
                                        console.error("FULL ERROR:", error);
                                        alert(error.message)
                                    }

                                 finally {
                                    setSending(false)
                                }
                                resetForm();
                            }}
                        >

                            <Form className="mt-8 md:mt-10 space-y-6">

                                <div>
                                    <label className="block font-medium">Case Title</label>
                                    <Field
                                        name="title"
                                        className="w-full border md:p-3 p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6]"
                                        placeholder="Enter case title"
                                    />
                                    <ErrorMessage name="title" component="p" className="text-red-500 text-xxs md:text-sm mt- italic1" />
                                </div>

                                <div>
                                    <label className="block font-medium">Category</label>
                                    <Field as="select" name="category" className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 max-md:text-sm focus:outline-none focus:ring-2 focus:ring-[#55fff6]">
                                        <option value="" >Select category</option>
                                        <option value="business">Business</option>
                                        <option value="technology">Technology</option>
                                        <option value="law">Law</option>
                                        <option value="social">Social</option>
                                        <option value="personal">Personal</option>
                                    </Field>
                                    <ErrorMessage name="category" component="p" className="text-red-500 text-xs md:text-sm mt-1 italic" />
                                </div>

                                <div>
                                    <label className="block font-medium">Case Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows="6"
                                        className="w-full border p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6]"
                                        placeholder="Describe the case in detail..."
                                    />
                                    <ErrorMessage name="description" component="p" className="text-red-500 italic text-xs md:text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block font-medium">Incident Date</label>
                                    <Field type="date" name="date" className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6]" />
                                    <ErrorMessage name="date" component="p" className="text-red-500 text-xs md:text-sm mt-1 italic" />
                                </div>

                                <div>
                                    <label className="block font-medium">Visibility</label>
                                    <Field as="select" name="privacy" className="w-full border p-2 md:p-3 rounded mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55fff6]">
                                        <option value="" className='text-sm'>Choose one</option>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </Field>
                                    <ErrorMessage name="privacy" component="p" className="text-red-500 text-xs md:text-sm mt-1 italic" />
                                </div>

                                <button
                                    disabled={sending}
                                    type="submit"
                                    className="py-2 w-full flex gap-2 justify-center items-center bg-[#F97316] text-[#0F172A] md:py-3 rounded-lg font-semibold hover:opacity-90"
                                >
                                    {
                                        sending ?
                                            <span className='flex items-center justify-center gap-1'>
                                                <LuLoaderCircle className='animate-spin text-md md:text-lg' />
                                                Sending...
                                            </span> :
                                            <span className='flex items-center justify-center gap-1'>
                                                Submit Case
                                                <FaPaperPlane />
                                            </span>
                                    }
                                </button>
                            </Form>
                        </Formik>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            message="Successfully Submitted!!!"
                            key={vertical + horizontal}
                            autoHideDuration={5000}
                        />
                    </div>
                </div></section></main >
    )
}

export default Client
