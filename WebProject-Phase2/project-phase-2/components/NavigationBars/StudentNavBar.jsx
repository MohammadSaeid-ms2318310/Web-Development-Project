import React from 'react';
import Link from 'next/link';

export default function StudentNavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="StudentHomePage.html" className="navBarItem">Home</a>
            <Link href="/admin/courses" className="navBarItem">Courses</Link>
            <a href="StudentRegisterationPage.html" className="navBarItem">Registeration</a>
            <a href="StudentLearningPathPage.html" className="navBarItem">Learning path</a>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

