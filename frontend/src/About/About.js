import React from 'react'
import './About.css'
import MemberCard from './MemberCard'
import NavBar from '../components/NavBar'

import STEVE from './steve.jpg'

const descriptions = {
    steve: 'Computer science major attending CSUSB',
    Daniel: 'Something about design'
}

const txt = `
Dysh is a full stack web application designed and developed during the spring 2023 semester. 
My goal was to make a robust backend implementation with some sort of authentication system while also having a fluid front end that can be navigated with ease.
During development, Dysh is equiped with and automated deployment system with a 4 stage pipeline which gets deployed to an AWS EC2 instance.
The front end UI was designed in colaboration with Daniel Oh who is currently studying UI/UX design.
Daniel worked closely on development to ensure all features were of high quality and proper implementation. 
`

const About = () => {
    return (
        <>
            <NavBar></NavBar>
            <div className='about-us'>
                <h2 style={{ textAlign: 'center' }}>DYSH Devs</h2>
                <div style={{ maxWidth: '100ch', marginInline: 'auto' }}>

                    <h2>About Dysh</h2>
                    <p>{txt}</p>
                </div>
                <div className='about-members row'>
                    <MemberCard
                        description={descriptions.steve}
                        email={'stevewflores43@gmail.com'}
                        github={'https://github.com/SteveF42'}
                        imgSrc={STEVE}
                        jobTitle={'Full Stack Developer'}
                        memberName={'Steve Flores'}
                    />
                    <MemberCard
                        description={descriptions.steve}
                        email={'stevewflores43@gmail.com'}
                        github={'https://github.com/SteveF42'}
                        imgSrc={STEVE}
                        jobTitle={'Full Stack Developer'}
                        memberName={'Steve Flores'}
                    />
                </div>
            </div>
            <footer style={{textAlign:'center'}}>
                DISCLAIMER: all ingredients displayed on DYSH are property of <a href='http://www.skinnytaste.com'>skinnytaste.com</a> and is in no way associated with DYSH
            </footer>
        </>
    )
}

export default About