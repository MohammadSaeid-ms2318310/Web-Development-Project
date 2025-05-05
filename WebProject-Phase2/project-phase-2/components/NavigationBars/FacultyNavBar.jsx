import React from 'react'

export default function FacultyNavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="InstructorHomePage.html" className="navBarItem">Home</a>
            <a href="./InstructorCoursesPage.html" className="navBarItem">MyCourses</a>
            <a href="./InstructorRegisterationPage.html" className="navBarItem">Registeration</a>
            <a href="MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}

