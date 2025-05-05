'use client'
import React from 'react'
import { loginByForm } from '@/app/Actions/server-actions'

export default function NavBar() {

    async function handleSubmit(e) {
        e.preventDefault();
        const userInfo = await loginByEmail('Mittie_Vandervort@yahoo.com','student123','student');
        alert(userInfo);
        console.log(userInfo);
    }

  return (
    <>
        <form id="loginForm" onSubmit={ loginByForm }>
            <div className="row">
                <i className="fas fa-user">
                <img src="/Media/userIcon.png" alt="" />
                </i>
                <label htmlFor="email" style={{ display: 'none' }}></label>
                <input
                id="email"
                name="email"
                type="text"
                placeholder="Email: example@qu.edu.qa"
                required
                />
            </div>

            <div className="row">
                <i className="fas fa-lock">
                <img src="/Media/keyIcon.png" alt="" />
                </i>
                <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                />
            </div>

            <br />

            <div className="radioB">
                <label>User Type:</label> <br />
                <label>Student</label>
                <input
                type="radio"
                name="userType"
                className="checkmark"
                value="student"
                defaultChecked
                />{" "}
                <br />
                <label>Instructor</label>
                <input
                type="radio"
                name="userType"
                className="checkmark"
                value="instructor"
                />{" "}
                <br />
                <label>Department Administrator</label>
                <input
                type="radio"
                name="userType"
                className="checkmark"
                value="admin"
                />{" "}
                <br />
            </div>

            <div style={{ marginTop: '5%' }}>
                <div id="loginErrorMessage"></div>
            </div>

            <div className="row button">
                <input type="submit" value="Login" />
            </div>

            <br />
        </form>

    </>
  )
}

