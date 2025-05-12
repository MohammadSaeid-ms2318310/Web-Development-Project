'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import StudentGradesById from '@/components/StudentGradesById';
import StudentNavBar from '@/components/NavigationBars/StudentNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';

export default async function studentDashboard({ params }) {
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
        <StudentNavBar id={user?.id} />
            <div className='admin-dashboard-container'>
                <div key={8}>
                    <StudentGradesById studentId={ user.id } />
                </div>
                
            </div>
        <Footer />
    </>
    );
}