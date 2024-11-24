"use client";
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (isSignedIn) {
    redirect('/home')
  } else {
    redirect('/sign-in')
  }

  return (
    <div>
    </div>
  )
}