'use client'
import React, { useEffect, useState } from 'react';

export default function CourseCard({ course }) {

  return (
       <div className="courseContainer">
                        <p>Title: {course?.title}</p> <br />
                        <p>Instructor: {course?.instructor?.name}</p>
                        <p>Category: {course?.category}</p>
                        <p>Location: {course?.location}</p> <br />
                        {course?.registrationStatus ? (<h6 className="icon-check">Offering</h6>) 
                        : (<h6 className="icon-uncheck">Expired</h6>)}
        </div>
  )
}

