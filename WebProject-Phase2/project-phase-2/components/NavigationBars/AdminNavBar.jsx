import React from 'react'

export default function AdminNavBar() {
  return (
    <nav className="navBarContainer">
        <span>
            <a href="./AdminHomePage.html" className="navBarItem">Home</a>
            <a href="./AdminCourseManagement.html" className="navBarItem">Course Management</a>
            <a href="./AdminFaculties.html" className="navBarItem">Faculties</a>
            <a href="./AdminStudents.html" className="navBarItem">Students</a>
            <a href="./MyInfoPage.html" className="navBarItem">My Information</a>
        </span>
    </nav>
  )
}






