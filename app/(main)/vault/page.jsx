import React from 'react'
import Client from './client';
import { auth } from '@/auth';

const page = async () => {
    const session = await auth();
    return (
        <div><Client session={session} /></div>
    )
}
export default page
