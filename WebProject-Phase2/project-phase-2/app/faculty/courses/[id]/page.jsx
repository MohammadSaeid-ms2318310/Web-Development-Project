'use server';
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import FacultyNavBar from '@/components/NavigationBars/FacultyNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import { filterCoursesByInstructorId } from '@/app/Actions/server-actions';
import CourseCard from '@/components/CourseCard';


export default async function facultyStudents({ params }){
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

    const courses = await filterCoursesByInstructorId(user?.id);

    return (
    <>
        <MainTitle />
        <FacultyNavBar id={user?.id} />
            <br /> <br />
            <h2 className='topic'>My Courses</h2>
            <br /> <br />
            <div className='courseFlexBox'>
                {courses?.map((item,i) => 
                <CourseCard 
                key={i}
                course={item} />
                )}
            </div>
        <Footer />
    </>
    );
}