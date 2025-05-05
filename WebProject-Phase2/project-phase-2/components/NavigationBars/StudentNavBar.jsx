import React from 'react'

export default function StudentNavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="StudentHomePage.html" className="navBarItem">Home</a>
            <a href="StudentCoursesPage.html" className="navBarItem">MyCourses</a>
            <a href="StudentRegisterationPage.html" className="navBarItem">Registeration</a>
            <a href="StudentLearningPathPage.html" className="navBarItem">Learning path</a>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

