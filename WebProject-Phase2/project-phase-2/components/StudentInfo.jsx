'use client'
import React from 'react'

export default function StudentInfo({ student }) {
  return (
        <div  className='admin-dashboard-elements'>
        <h2 style={styles.title}>Student Information</h2>

        <div style={styles.item}>
            <label style={styles.label}>ID:</label>
            <span>{student.id}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>Name:</label>
            <span>{student.name}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>Email:</label>
            <span>{student.email}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>User Type:</label>
            <span>{student.userType}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>Major: </label>
            <span>{student.majot}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>GPA: </label>
            <span>{student.gpa}</span>
        </div>

        </div>
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
  },
}
