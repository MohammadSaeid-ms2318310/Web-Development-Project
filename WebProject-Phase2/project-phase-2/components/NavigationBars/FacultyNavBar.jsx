import React from 'react';
import Link from 'next/link';

export default function FacultyNavBar({ id }) {
  return (
    <nav className="navBarContainer">
        <span>
            <Link href={`/faculty/dashboard/${id}`} className="navBarItem">Dashboard</Link>
            <Link href={`/faculty/students/${id}`} className="navBarItem">My Students</Link>
            <Link href={`/faculty/courses/${id}`} className="navBarItem">My Courses</Link>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

