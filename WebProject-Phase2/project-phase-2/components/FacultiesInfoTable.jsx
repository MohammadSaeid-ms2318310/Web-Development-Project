'use client'
import React, { useEffect, useState } from 'react';
import { getAllFacultiesInfo } from '@/app/Actions/server-actions';

export default function FacultyInfoTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await getAllFacultiesInfo();
          setData(result);
        }
        fetchData();
      }, []);

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
                    <th>Specialization</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, i) => (
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.specialization}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>  
        </div>
    </>
  )
}



