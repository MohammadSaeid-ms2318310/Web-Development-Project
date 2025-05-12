'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import AdminInfo from '@/components/AdminInfo';
import { getFacultyById } from '@/app/Actions/server-actions';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import FacultyNavBar from '@/components/NavigationBars/FacultyNavBar'

export default async function adminDashboard({ params }){
    const cookieStore = await cookies();
    const idToken = cookieStore.get("id_token")?.value;
        console.log("Admin dashboard - id_token:", idToken);
        if (!idToken) {
            return <p>🚫 Unauthorized - id token is missing</p>
        }
        const user = await verifyJwt(idToken);
        if (!user) {
            return <p>🚫 Unauthorized - id token is invalid</p>
        }
    const param = await params;
    const id = Number(param.id);
    if(user.id !== id) {
        return <p>🚫 Unauthorized - token does not match the id</p>
    }
    if(user.userType !== "instructor") {
        return <p>🚫 Unauthorized - token does not match the role</p>
    }
    const faculty = await getFacultyById(user?.id);
    return (
    <>
        <MainTitle />
        <FacultyNavBar id={user?.id} />
        <br /> <br />
        <h2 className='topic'>My Information</h2>
        <br /> 
            {/* <div className='admin-dashboard-container'> */}
                {/* <div key={0}> */}
                    <AdminInfo admin={faculty} />
                {/* </div> */}
            {/* </div> */}
        <Footer />
    </>
    );
}