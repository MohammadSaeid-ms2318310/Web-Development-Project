import React from 'react';
import Link from 'next/link';

export default function FacultyNavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="InstructorHomePage.html" className="navBarItem">Home</a>
            <Link href="/admin/courses" className="navBarItem">Courses</Link>
            <a href="./InstructorRegisterationPage.html" className="navBarItem">Registeration</a>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

