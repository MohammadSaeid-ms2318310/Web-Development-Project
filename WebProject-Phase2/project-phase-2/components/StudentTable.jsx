'use client'
import React from "react";

export default function StudentTable({ students }) {

  return (
    <>
        <div >
        <div >
            <table className="BigTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>GPA</th>
                </tr>
            </thead>
            <tbody>
                {students?.map((item, i) => (
                    <tr key={i}>
                        <td>{item?.id}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.major}</td>
                        <td>{item?.gpa}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>  
        </div>
    </>
  )
}



