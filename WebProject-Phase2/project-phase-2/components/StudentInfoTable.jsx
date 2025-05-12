'use client'
import React, { useEffect, useState } from 'react';
import { getAllStudentsInfo } from '@/app/Actions/server-actions';

export default function StudentInfoTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await getAllStudentsInfo();
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
                    <th>Major</th>
                    <th>GPA</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, i) => (
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



