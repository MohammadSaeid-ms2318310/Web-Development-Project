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

export default async function adminDashboard({ params }){
    const param = await params;
    const id = Number(param.id);
    const admin = await getAminById(id);
    return (
    <>
        <MainTitle />
        <AdminNavBar />
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