import React from 'react';
import Link from 'next/link';

export default function FacultyNavBar({ id }) {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="InstructorHomePage.html" className="navBarItem">Home</a>
            <Link href={`/faculty/students/${id}`} className="navBarItem">My Students</Link>
            <Link href={`/faculty/courses/${id}`} className="navBarItem">My Courses</Link>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

