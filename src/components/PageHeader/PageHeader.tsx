'use client'
import Link from 'next/link';
import { UserAuth } from "@/context/AuthContext"
import { handleError } from '@/utils/errorHandling';

export default function PageHeader() {
    const { user, logOut } = UserAuth()

    const handleLogOut = () => {
        try {
            logOut()
        } catch (e) {
            handleError(e)
        }
    }
    return (
        <header className="absolute top-2 right-2">
            {user ? (
                <p>
                    {user.email} 
                    <button className="ml-4 underline" onClick={handleLogOut}>Sign Out</button>
                </p>
            ) : (
                <Link href="/login">Sign In</Link>
            )}
        </header>
    )
}