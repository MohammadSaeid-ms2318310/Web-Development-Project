'use client'
import React from 'react'

export default function AdminInfo({ admin }) {
  return (
        <div  className='admin-dashboard-elements'>
        <h2 style={styles.title}>Admin Information</h2>

        <div style={styles.item}>
            <label style={styles.label}>ID:</label>
            <span>{admin.id}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>Name:</label>
            <span>{admin.name}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>Email:</label>
            <span>{admin.email}</span>
        </div>

        <div style={styles.item}>
            <label style={styles.label}>User Type:</label>
            <span>{admin.userType}</span>
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
