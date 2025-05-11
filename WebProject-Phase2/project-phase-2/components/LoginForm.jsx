'use client'
import React from 'react'
import { loginByEmail } from '@/app/Actions/server-actions'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const user = await loginByEmail(data.email, data.password, data.userType);
        console.log("User info: ", user);
        if(user.userType === "Student") {
            router.push('/student/dashboard/' + user.id);
        }
        else if(user.userType === "Faculty") {
            router.push('/faculty/dashboard/' + user.id);
        } 
        else if(user.userType === "Admin") {
            router.push('/admin/dashboard/' + user.id);
        }
        else {
            alert("User Type Error");
        }
      }

  return (
    <>
        <form id="loginForm" onSubmit={ handleSubmit }>
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
                />
                <br />
                <label>Instructor</label>
                <input
                type="radio"
                name="userType"
                className="checkmark"
                value="instructor"
                />
                <br />
                <label>Department Administrator</label>
                <input
                type="radio"
                name="userType"
                className="checkmark"
                value="admin"
                />
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

