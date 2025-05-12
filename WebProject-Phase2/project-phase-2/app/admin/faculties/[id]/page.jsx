'use server'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import Footer from '@/components/Footer'
import AdminNavBar from '@/components/NavigationBars/AdminNavBar'
import { cookies } from 'next/headers';
import { verifyJwt } from '@/app/Actions/server-actions';
import FacultyInfoTable from '@/components/FacultiesInfoTable';
import { getAminById } from '@/app/Actions/server-actions';

export default async function adminFaculties({ params }){
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

    return (
    <>
        <MainTitle />
        <AdminNavBar id={user?.id} />
        <br /> <br />
        <h2 className='topic'>Faculty members list</h2>
        <br /> <br />
        <div className='center-of-page'>
            <FacultyInfoTable />
        </div>
        <Footer />
    </>
    );
}