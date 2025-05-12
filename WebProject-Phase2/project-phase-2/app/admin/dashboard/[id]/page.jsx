'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import AdminNavBar from '@/components/NavigationBars/AdminNavBar'
import AdminInfo from '@/components/AdminInfo';
import { getAminById } from '@/app/Actions/server-actions';
import StudentTotalPerMajorStatistics from '@/components/StudentTotalPerMajorStatistics';
import StudentAvgGPAperMajor from '@/components/StudentAvgGPAperMajor';
import TopStudentsByGPA from '@/components/TopStudentsByGPA';
import TopFiveRegisteredCourses from '@/components/TopFiveRegisteredCourses';
import CoursesTaughtPerFaculty from '@/components/CoursesTaughtPerFaculty';
import CommonPrequesties from '@/components/CommonPrequesties';
import StudentGradesById from '@/components/StudentGradesById';
import StudentNumbersPerFaculty from '@/components/StudentNumbersPerFaculty';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';

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
    const admin = await getAminById(id);
    return (
    <>
        <MainTitle />
        <AdminNavBar id={admin?.id} />
        <br /> <br />
        <h2 className='topic'>Statistics</h2>
        <br /> <br />
            <div className='admin-dashboard-container'>
                <div key={1}>
                    <StudentTotalPerMajorStatistics />
                </div>
                <div key={2}>
                    <StudentAvgGPAperMajor />
                </div>
                <div key={3}>
                    <TopStudentsByGPA />
                </div>

                <div key={4}>
                    <TopFiveRegisteredCourses />
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