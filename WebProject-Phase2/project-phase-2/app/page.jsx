import React from 'react'
import NavBar from '../components/NavigationBars/NavBar'
import MainTitle from '../components/MainTitle'
import Footer from '@/components/Footer'

export default async function MainPage(){
  return (
    <>
        <MainTitle />
        <NavBar />
        <div class="mainContainer">

        <section class="main-content">
            <div class="articleContainer">
                <article>
                    <h2 class="topic">About Department of CSE</h2>
                    <section>
                        <h3 class="subTopic">List of content:</h3>
                        <a href="#Accreditation"><li>Accreditation</li></a>
                        <a href="#MessageFromDean"><li>Message from the Dean</li></a>
                    </section>
                    <section>
                        <p>
                            <h3 class="subTopic" id="Accreditation">Accreditation</h3>
                            The College of Engineering (CENG) at Qatar University (QU) was established in 1980 with four programs and less than 50 students. Over the years, the college has grown to become a flagship for QU with 9 undergraduate programs, 8 master programs, and one PhD program with more than 3600 students.
                            
                            In accordance with this rapid growth, the college has started a systematic process for quality assurance applied to all the programs. The college has also moved through the required stages that lead to accreditation for its programs, according to the standards of the Accreditation Board for Engineering and Technology (ABET).  ABET is a highly recognized and internationally respected accreditor of college and university programs in applied science, computing, engineering, and technology. ABET has set the higher-educational standards in its fields for nearly 75 years.
                            
                            The following bachelor engineering degree programs in the CENG are accredited by the Engineering Accreditation Commissions; EAC ofABET.
                            
                            Chemical Engineering
                            Civil Engineering
                            Computer Engineering
                            Electrical Engineering
                            Industrial & Systems Engineering
                            Mechanical Engineering
                            In the CENG, the Computer Science program is also accredited by the Computing Accreditation Commission ofABET
                            
                            Qatar University, Department of Architecture and Urban Planning has received the International Certification designation from the National Architectural Accrediting Board for the Bachelor of Architecture (B.Arch.) program. ICert was granted in 2018 for a term of six years. The term “International Certification” identifies a program as comparable in educational outcomes in all significant aspects to a program accredited by the NAAB in the United States and indicates that it provides an educational experience meeting acceptable standards, even though such program may differ in format or method of delivery.
                            
                            
                            
                            Accreditation is a process that requires programs to undergo comprehensive, periodic evaluations, and assures that the graduates are well-prepared and ready for advanced study and real-world employment. It helps students and their parents to choose quality accredited university programs. It also motivates institutions to apply systematic and effective continuous improvement methods through program’s assessment and evaluation.
                            
                            A starting point towards the achievement of accreditation was in October 2005, when four programs of CENG were granted the “Substantially Equivalency” accreditation by the Engineering Accreditation Commission of ABET. Those programs are; Chemical Engineering, Civil Engineering, Electrical Engineering, and Mechanical Engineering. These engineering programs at Qatar University were among the first in the region to be evaluated using ABET accreditation criteria and procedures.
                            
                            At the college level, accreditation  is a form of endorsement that the college uses to let potential students know that their programs offer a valid education that is officially recognized internationally. At the college level, the accreditation is considered as an important milestone for the programs offered by CENG. The hard work of our faculty members and collaborations with local industrial partners and stakeholders were the key drivers to this achievement.
                            
                            At the university level, the accreditation of our programs comes in-line with the institutional strategic plan for accrediting all the university programs by recognized international accreditation agencies. This achievement demonstrates the commitment of the university to quality assurance for all academic programs with the aim of providing students with an internationally acclaimed quality education. It also provides a reliable basis for inter- and intra-university cooperative practices, including student admissions and transfer of credit.
                        </p>
                    </section>  

                    <section>
                        <p>
                            <h3 class="subTopic" id="MessageFromDean">Message from the Dean</h3>
                            
                            
                            On behalf of the College of Engineering at Qatar University, I am honored to welcome you students, faculty members, administrators, and our esteemed industrial stakeholders. The focus of CENG is on preparing students with the needed skills of innovation and entrepreneurship to help to diversify the economy and to support a Qatari knowledge based economy. The foreseeable goal is to adapt CENG to be a hub that prepares our graduates, the future skilled workforce, for the 4th industrial revolution. Where jobs of the future will mainly depend on big data and hyper connectivity.
                            
                            Since its establishment in 1980, the College of Engineering has been blessed with heartfelt and dedicated faculty, and staff members within it’s all internationally accredited programs. Moreover, with a student body of about 4100 students enrolled in the pipeline who will reshapethe future of Qatar, the College of Engineering is also considered to be one of the most active entities in research through internal and external funding. For example, more than $ 150 Million infunds that have been attracted during the past ten years were directed towards solving realchallenges in Qatar through research and direct consultation efforts with our industrial stakeholders. The college is proud of its specialized research centers GPC, QTTSC, and KINDI that are addressing the industrial challenges in the gas industry sector and computer and information sciences.
                            
                            Once again I welcome you all and wishing you all a valuable, joyful and exciting experience with the College of Engineering at Qatar University.
                            
                            
                            Khalid Kamal Naji, PhD
                            
                            Dean of the College of Engineering
                        </p>
                    </section>
                </article>
            </div>
        </section>
    </div>

    <Footer />
    </>
    
  )
}