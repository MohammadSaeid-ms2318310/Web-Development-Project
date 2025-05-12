'use server';
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import FacultyNavBar from '@/components/NavigationBars/FacultyNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import { getStudentsByInstructorId } from '@/app/Actions/server-actions';
import StudentTable from '@/components/StudentTable';


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

    const students = await getStudentsByInstructorId(user?.id);

    return (
    <>
        <MainTitle />
        <FacultyNavBar id={user?.id} />
            <br /> <br />
            <h2 className='topic'>My Students</h2>
            <br /> <br />
            <div className='center-of-page'>
                <StudentTable students={students} />
            </div>
        <Footer />
    </>
    );
}