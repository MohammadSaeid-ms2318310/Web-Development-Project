'use client'
import React, { useEffect, useState } from 'react';
import { getAvgGPAofStudentsPerMajor } from '@/app/Actions/server-actions';

export default function StudentStatistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await getAvgGPAofStudentsPerMajor();
          result.sort((a, b) => b._avg.gpa - a._avg.gpa);
          setData(result);
        }
        fetchData();
      }, []);

  return (
    <>
        <div className='admin-dashboard-elements'>
        <h2 style={styles.title}>Total Students per Major</h2>
        <div className='admin-dashboard-elements-grid'>
            <div style={styles.item}>
              <label style={styles.label}>Major</label>
            </div>
            <label style={styles.label}>Avg GPA</label>
            {data.length ? data?.map((item, i) => (
                <>
                    <div style={styles.item}>
                        <label style={styles.label}>#{i + 1}. <br />{item.major}:</label>
                    </div>
                    <span>{item._avg.gpa}</span>
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
  



