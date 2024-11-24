"use client";
import React from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function UserPage() {

    const params = useParams()
    const user = useUser()
    console.log(params)
    console.log(user)

    return (
        <>
            <h1>{params.username}</h1>
        </>
    )
}