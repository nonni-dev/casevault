import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Client from './client'

const page = async () => {
  const session = await auth()
  if (!session) {
   redirect("/signin")
  }
  return (
    <div>
      <Client session={session}/>
    </div>
  )
}

export default page