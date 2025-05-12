import React from 'react';
import Link from 'next/link';

export default function StudentNavBar({ id }) {
  return (
    <nav className="navBarContainer">
        <span>
            <Link href={`/student/dashboard/${id}`} className="navBarItem">Dashboard</Link>
            <Link href={`/student/courses/${id}`} className="navBarItem">Courses</Link>
            <a href="StudentRegisterationPage.html" className="navBarItem">Registeration</a>
            <a href="StudentLearningPathPage.html" className="navBarItem">Learning path</a>
            <Link href={`/student/myinfo/${id}`} className="navBarItem">My Information</Link>
        </span>
    </nav>
  )
}

