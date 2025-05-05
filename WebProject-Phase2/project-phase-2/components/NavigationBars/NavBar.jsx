import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <Link href="/" className="navBarItem">Home</Link>
            <Link href="/login" className="navBarItem">Login</Link>
            {/* <Link href="/" className="navBarItem">Courses</Link> */}
        </span>
    </nav>
  )
}

