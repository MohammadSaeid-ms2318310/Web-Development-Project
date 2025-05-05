import React from 'react'
import NavBar from '@/components/NavigationBars/NavBar'
import MainTitle from '@/components/MainTitle'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/Footer'

export default async function LoginPage(){
    return (
    <>
        <MainTitle />
        <NavBar />
        <article>
            <section>
                <div className="formCover">
                    <div className="wrapper">
                        <div className="title"><span>Login Form</span></div>
                        <LoginForm />
                    </div>
                </div>
            </section>
        </article>
        <Footer />
    </>
    );
}