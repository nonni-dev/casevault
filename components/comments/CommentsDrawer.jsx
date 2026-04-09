"use client"
import { useState } from "react"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import ClientComments from "./ClientComments"
import { FaRegCommentDots } from "react-icons/fa"

export default function CommentsDrawer({ postId, session }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* COMMENT BUTTON */}
      <button onClick={() => setOpen(true)}>
        <FaRegCommentDots />
      </button>

      {/* DRAWER */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
            style: {
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
            },
        }}
      >
        <div className="p-4 bg-[#f5f5f5]">

        <div className="h-[70vh] w-full overflow-y-auto bg-[#f5f5f5]">
            <div className="sticky top-0 bg-[#f5f5f5] z-50">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-1 "></div>
            <h2 className="text-gray-700 text-sm font-semibold text-center mb-2">Comments</h2>

            </div>
            <div className="max-w-2xl mx-auto">
              {open && (
                <ClientComments id={postId} session={session} key={open ? "open" : "closed"}/>
              )}
            </div>
        </div>
        </div>
      </SwipeableDrawer>
    </>
  )
}