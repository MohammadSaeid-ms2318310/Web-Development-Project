'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import AdminNavBar from '@/components/NavigationBars/AdminNavBar'
import AdminInfo from '@/components/AdminInfo';
import { getAminById } from '@/app/Actions/server-actions';
import StudentNumbersPerFaculty from '@/components/StudentNumbersPerFaculty';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import { getAllCoursesWithInstructorNames } from '@/app/Actions/server-actions'
import CourseCard from '@/components/CourseCard';

export default async function adminCourses({ params }){
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
    // const admin = await getAminById(user?.id);
    const courses = await getAllCoursesWithInstructorNames();
    return (
    <>
        <MainTitle />
        <AdminNavBar id={user?.id} />
        <br /> <br />
        <h2 className='topic'>List of the courses</h2>
        <br /> <br />
            <div className='courseFlexBox'>
                {courses?.map((item,i) => 
                <CourseCard key={i} 
                course={ item } />
                )}
            </div>
        <Footer />
    </>
    );
}