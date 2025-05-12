'use client'
import React, { useEffect, useState } from 'react';
import { getCourseStatusCount } from '@/app/Actions/server-actions';

export default function CourseStatusCount() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const result = await getCourseStatusCount();
          setData(result);
        }
        fetchData();
      }, []);

  return (
    <>
        <div className='admin-dashboard-elements'>
        <h2 style={styles.title}>Course Status Count</h2>
        <div className='admin-dashboard-elements-grid'>
            <div style={styles.item}>
              <label style={styles.label}>Status</label>
            </div>
            <label style={styles.label}>Number</label>
            {data.length ? data?.map((item, i) => (
                <>
                    <div style={styles.item}>
                        {console.log(item)}
                        <label style={styles.label}>{item.courseStatus}:</label>
                    </div>
                    <span>{item._count.id}</span>
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