'use server';
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import StudentNumbersPerFaculty from '@/components/StudentNumbersPerFaculty';
import FacultyNavBar from '@/components/NavigationBars/FacultyNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';

export default async function facultyDashboard({ params }){
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
    return (
    <>
        <MainTitle />
        <FacultyNavBar />
            <div className='admin-dashboard-container'>
                {/* <div key={0}>
                    <AdminInfo admin={user} />
                </div> */}
                <div key={1}>
                    {/* <StudentTotalPerMajorStatistics /> */}
                </div>
                <div key={2}>
                    {/* <StudentAvgGPAperMajor /> */}
                </div>
                <div key={3}>
                    {/* <TopStudentsByGPA /> */}
                </div>

                <div key={4}>
                    {/* <TopFiveRegisteredCourses /> */}
                </div>

                <div key={5}>
                    {/* <CoursesTaughtPerFaculty /> */}
                </div>

                <div key={6}>
                    {/* <CommonPrequesties /> */}
                </div>
                <div key={7}>
                    <StudentNumbersPerFaculty id={ id } />
                </div>
            </div>
        <Footer />
    </>
    );
}