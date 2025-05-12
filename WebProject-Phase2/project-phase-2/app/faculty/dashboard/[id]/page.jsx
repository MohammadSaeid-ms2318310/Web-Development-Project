'use server';
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import StudentNumbersPerFaculty from '@/components/StudentNumbersPerFaculty';
import FacultyNavBar from '@/components/NavigationBars/FacultyNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import AverageGradeByCourse from '@/components/AverageGradeByCourse';
import CourseStatusCount from '@/components/CourseStatusReport';

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
        if(user.userType !== "instructor") {
            return <p>🚫 Unauthorized - token does not match the role{user.userType}</p>
        }
    return (
    <>
        <MainTitle />
        <FacultyNavBar id={user?.id} />
            <br /> <br />
            <h2 className='topic'>Statistics</h2>\
            <br /> <br />
            <div className='admin-dashboard-container'>
                <div key={7}>
                    <StudentNumbersPerFaculty id={ id } />
                </div>
                <div>
                    <CourseStatusCount />
                </div>
                <div>
                    <AverageGradeByCourse />
                </div>
                
            </div>
        <Footer />
    </>
    );
}