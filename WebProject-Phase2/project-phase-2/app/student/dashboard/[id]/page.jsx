'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import { getAminById } from '@/app/Actions/server-actions';
import StudentGradesById from '@/components/StudentGradesById';
import StudentNavBar from '@/components/NavigationBars/StudentNavBar'

export default async function studentDashboard({ params }){
    const param = await params;
    const id = Number(param.id);
    const student = await getAminById(id);
    return (
    <>
        <MainTitle />
        <StudentNavBar />
            <div className='admin-dashboard-container'>
                {/* <div key={0}>
                    <AdminInfo admin={admin} />
                </div> */}
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
                    <CoursesTaughtPerFaculty />
                </div>

                <div key={6}>
                    <CommonPrequesties />
                </div>
                <div key={7}>
                    
                </div>
            </div>
        <Footer />
    </>
    );
}