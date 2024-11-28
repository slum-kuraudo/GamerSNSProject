"use client";
import React from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import UserProfile from '@/components/Profile/UserProfile';
export default function UserPage() {

    const params = useParams()
    const user = useUser()

    return (
        <>
            <UserProfile username={Array.isArray(params?.username) ? params.username[0] : params?.username || ''}
                firstname='' />
        </>
    )
}