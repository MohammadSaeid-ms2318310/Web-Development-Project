import Link from 'next/link';
import React from 'react';


export default function AdminNavBar({ id }) {
  return (
    <nav className="navBarContainer">
        <span>
            <Link href={`/admin/dashboard/${id}`} className="navBarItem">Dashboard</Link>
            <Link href={`/admin/courses/${id}`} className="navBarItem">Courses</Link>
            <Link href={`/admin/faculties/${id}`} className="navBarItem">Faculties</Link>
            <Link href={`/admin/students/${id}`} className="navBarItem">Students</Link>
            <Link href={`/admin/myinfo/${id}`} className="navBarItem">My Information</Link>
        </span>
    </nav>
  )
}






