'use client'
import React, { useEffect, useState } from 'react';
import { getStudentNumbersPeeFaculty } from '@/app/Actions/server-actions';

export default function FacultyStatistics({ params, id }) {
    const [data, setData] = useState([]);
    // const id = Number(params.id);
    useEffect(() => {
        async function fetchData() {
          const result = await getStudentNumbersPeeFaculty(id);
        //   result.sort((a, b) => b._count.students - a._count.students);
          setData(result);
        }
        fetchData();
      }, []);

  return (
    <>
        <div className='admin-dashboard-elements'>
        <h2 style={styles.title}>Students per course</h2>
        <div className='admin-dashboard-elements-grid'>
            <div style={styles.item}>
              <label style={styles.label}>Major</label>
            </div>
            <label style={styles.label}>#Students</label>
            {data.length ? data?.map((item, i) => (
                 <>
                    <div key={i} style={styles.item}>
                        <label style={styles.label}>#{i+1}. <br />{item.title}:</label>
                    </div>
                    <span>{item._count.students}</span>
                 </>
            )) 
            : 
            (
                <p style={styles.item}>
                    <span style={styles.label}>No Data Available</span>
                </p>
            )}
        </div>  
        </div>
    </>
  )
}

const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      background: '#fff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      marginBottom: '16px',
      color: '#333',
    },
    item: {
      marginBottom: '12px',
    },
    label: {
      fontWeight: 'bold',
      display: 'inline-block',
      width: '120px',
      marginRight: '5rem',
    },
  }
  



