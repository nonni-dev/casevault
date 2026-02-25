"use server";
import React from 'react'
import Client from './client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/signin")
  }
  return (
    <main>
      <Client session={session} />
    </main>
  )
}

export default page
