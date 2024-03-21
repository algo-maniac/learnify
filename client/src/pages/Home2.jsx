import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from "@mui/material/Fab"
import TeacherCard from "../components/TeacherCard";
import NavbarLandingPage from '../components/NavbarLandingPage';

  
const LandingPage = ({ handleSearchClick }) => {
    const navigate = useNavigate();

    const filterDesc = (text) => {
        return text.slice(0, 70) + "...";
    }

    return (
        <Container>
            <NavbarLandingPage handleSearchClick={handleSearchClick} />
            <div className="page1">
                <div className="left">
                    {/* <div className="ju-logo"> */}
                    {/* <img src="https://hindubabynames.info/wp-content/themes/hbn_download/download/education-companies/jadavpur-university-kolkata-logo.png" alt="" /> */}
                    {/* <img className='small' src="https://ieee-jaduniv.in/assets/img/RAW%20Logo.png" alt="" /> */}
                    {/* </div> */}
                    <h1>
                        Quality Education Anytime, Anywhere
                    </h1>
                    <h4>
                        Immersive programs crafted by industry experts for real-world success.
                    </h4>
                    <div className="students-already-enrolled">
                        <div className="student">
                            <img src="https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg" alt="" />
                        </div>
                        <div className="student">
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocJa8z9paqwbmbmgoyzio2GbMogxzEbhJkWxozfe9XaUQd4=s576-c-no" alt="" />
                        </div>
                        <div className="student">
                            <img src="https://res.cloudinary.com/desdkbhvz/image/upload/v1706378491/d0cjnei5atanj075g4oc.jpg" alt="" />
                        </div>
                        {/* <div className="student">
                            <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg" alt="" />
                        </div> */}
                        <div className="info">
                            <b>50+ Instructors</b> in community
                        </div>
                    </div>
                    <div className="btns">
                        <div className="btn" onClick={() => navigate('/course')} >
                            View Courses
                        </div>
                        <div className="btn" onClick={() => navigate('/instructor')} >
                            View Instructors
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src='/learnify_bg.png' alt="" />
                    {/* <img src="https://www.studytonight.com/css/resource.v3/svg/new/idea-brainwork.svg" alt="" /> */}
                </div>
            </div>
            <div className="page2">
                <h3>Our mission is to revolutionize education, making it accessible and enjoyable for everyone.</h3>
                <p className='header-support'>Engage in interactive lessons that make learning fun.</p>
                <div className='features'>
                    <div className="feature" onClick={() => navigate('/instructor')}>
                        <img src="/assets/instructor.png" alt="" />
                        <h4>Instructors</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                    <div className="feature" onClick={() => navigate('/course')}>
                        <img src="/assets/course.png" alt="" />
                        <h4>Courses</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                    <div className="feature" onClick={() => navigate('/video')}>
                        <img src="/assets/video.png" alt="" />
                        <h4>Video Lectures</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                    <div className="feature" onClick={() => navigate('/doubt-corner')}>
                        <img src="/assets/doubt.png" alt="" />
                        <h4>Doubt Corner</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                    <div className="feature" onClick={() => navigate('/exam-corner')}>
                        <img src="/assets/exam.png" alt="" />
                        <h4>Exam Corner</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                </div>
            </div>
            {/* <div className="page3">
                <h3>Common subjects we provide guidance on</h3>
                <p className='header-support'>Take the next step in your career. Get hands-on with the industry's most in-demand technologies.</p>
                <div className="topics">
                    <div className="topic">
                        <img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png" alt="" />
                    </div>
                    <div className="topic">
                        <img src="https://yt3.googleusercontent.com/HRJKaJg70sqBrCNh7Tf2RSjXTb_5hCUn7Hht7mxUJMg77EWkihh55JklD-KhwAMhwY31ox5O=s900-c-k-c0x00ffffff-no-rj" alt="" />
                    </div>
                    <div className="topic">
                        <img src="https://images.squarespace-cdn.com/content/v1/607b48fd3c951322b984affb/1620764286142-V7NT2F1Y2T6Z5XDFL0I2/new-azure-logo-square.png" alt="" />
                    </div>
                    <div className="topic">
                        <img src="https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png" alt="" />
                    </div>
                    <div className="topic">
                        <img src="https://pbs.twimg.com/profile_images/1682054594078072832/aQvD3PdP_400x400.jpg" alt="" />
                    </div>
                    <div className="topic">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEUgvv////+p4P8Au//0/P9IyP/5/v9dzP/E6f8TvP/j9v/n9/8yw/9y0v+u5P/s+f/T8f8qwf/I7f+86f9/1v/M7v9Axv+P2/+35v9Xyv9w0f+k4f+X3f+a3v9jz//b8/93yxYXAAADmElEQVR4nO2d7W4aMRBFoWaXOoEA+YCQNPD+b1nRqA2Bu9hepYtvdM5PUCQfzXgcr8fLaAQAAAAAAAAAAAAAAAAAAAAAAAAAANcihk9cezj/gc3PY56n8doD+mLiZvyZyeraQ/piwo9Tw+baQ/piMPQHQ38w9AdDfzD0B0N/MPQHQ38w9AdDfzD0B0N/MPQHQ38w9AdDfzD0B0N/MPQHQ396GIbVdnrKbIix9qPcMGxu2zP29SoWG4b5WDGvtuGv1DA8SsHbbxPDDsGb9VDjLafMMDy2WrDaHC00DC8dKVqxYJFhmOoUrbvntsCwo4ou6xYsMAxzOQeX9VbRd7INw4sWrDyC+YZxq1N04OH2INMwTGUE74cebg/yDMNOCj4MPtweZBmG3cRWMMswbqXgfc3r/AcZhnGtU9TkilTaMOgI3pkIpg3jdqEEX68z3B6kDGMjBe885uCBhGGceafoKGUY1zpFjQQvG3ak6C8nwYuGsblVghufOXjgkuFMRvDNKoKXDOPqG6To6IJh1BF8dBPsNIzrGynoNQcPdBnOtKBdBLsNZRV1FOwwXMkIzh0FtaFM0XZnKagM42yvIuj6OgkVQyU4MY2gMlwrwXbqKnhu2KqFftLYCp4bKhaN6Rw8kGX47BvBTMOKT+nT5Bm2xmmaZ1hzJ0KKTMPxk20Qcw29nj4dk204fjFVzDccbz0TtcDwxrPaFBhanPieU2LoWW06DeWTNsddfpfhcnSnPjasNh2Ghy6SJ/G5YbXRhk+Hr+TBml+1kYbvGnGn5O2qjTL8e8AbfilFt4emwvDjBDs+KEWzndS54fERvXyuaLaTEs/ajr6NW9VK41VtEp0Kuu/ZqVEh2W0S5MK/MVJM90QthWFr9L9N2lA2nCyqbw3+R0Zfm1z4fapNRm+ividjU22y+kvlwu9SbfK6oNWZd2tyoJhlGBu18C+GH20fMjvZ5VRcWgQx9zbCq1K06DLNvjOjdvwWO6lsw5Xa8TtUm2zDKK/mGVSbgrtrp7/18Yd99UEsuH8Yn5Vi9dWm5A7pSnYS1d6uWGKoL8/UvpMquukc5Y6/8p1U4W11ufDvq14VS9+pIBf+qqtNqeFMt9ZWrFhqqBf+mqtN+btN5DZjUu9T4h7vp5E7/v0go+1Dn7coyYX/rdY8jW+nhskXscRGHizWajhanxTHh/RIYyOimPF3AAAAAAAAAAAAAAAAAAAAAAAAAAAAoPkND6sn8QyuY6YAAAAASUVORK5CYII=" alt="" />
                    </div>
                </div>
            </div> */}
            <div className="page3">
                <h3>Video Lectures</h3>
                <p className='header-support'>High quality content to enhance your knowledge.</p>

                <div className='videos'>
                    <div className="video">
                        <VideoCard
                            id="65c2944ef3fb3a7e4aeeb17e"
                            title="Intro to C++"
                            description={"vid.description"}
                            duration={"18 m"}
                            thumbnail={"https://res.cloudinary.com/desdkbhvz/image/upload/v1707250765/c5olspf3sqcxh90zfu4c.png"}
                            profileImage="https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg"
                        />
                    </div>
                    <div className="video">
                        <VideoCard
                            id="65c29355f3fb3a7e4aeeb082"
                            title="Map in C++"
                            description={"vid.description"}
                            duration={"18 m"}
                            thumbnail={"https://res.cloudinary.com/desdkbhvz/image/upload/v1707250516/cggvkolxmbjrpkkebr3y.jpg"}
                            profileImage="https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg"
                        />
                    </div>
                </div>
            </div>
            <div className="page4">
                <h3>Our Courses</h3>
                <p className='header-support'>Our courses come with added benefits as well.</p>
                <div className='courses-list'>

                    <div className='courses'>
                        <Link to='/course/65c295d8f3fb3a7e4aeeb22c' >
                            <Card
                                key={'65c295d8f3fb3a7e4aeeb22c'}
                                sx={{ width: "100%", overflow: "hidden" }}
                            >
                                <CardMedia
                                    sx={{ width: "100%", aspectRatio: "2/1" }}
                                    image='https://res.cloudinary.com/desdkbhvz/image/upload/v1707251160/phaccriatsbahp1kigvw.png'
                                    title='Java Complete Course'
                                />
                                <CardContent className='box'>
                                    <Typography variant="h6" component="div">
                                        Java Complete Course
                                    </Typography>
                                    <span className='level'>intermediate</span>
                                    <Typography variant="body2" color="text.secondary" className='desc'>
                                        {filterDesc("This is a complete course on java. We will be studying everything about java")}
                                    </Typography>
                                    <div className='tags'>
                                        <Fab variant="extended" size="small" className='tag'>
                                            coding
                                        </Fab>
                                    </div>
                                    <span className='price'>Rs. {0}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    <div className='courses'>
                        <Link to='/course/65c27c4273900bc04a7dd44a' >
                            <Card
                                key={'65c27c4273900bc04a7dd44a'}
                                sx={{ width: "100%", overflow: "hidden" }}
                            >
                                <CardMedia
                                    sx={{ width: "100%", aspectRatio: "2/1" }}
                                    image='https://res.cloudinary.com/desdkbhvz/image/upload/v1707244610/jxwf0k8ni9ecikcue9xr.png'
                                    title='Java Complete Course'
                                />
                                <CardContent className='box'>
                                    <Typography variant="h6" component="div">
                                        Complete C++ Course
                                    </Typography>
                                    <span className='level'>intermediate</span>
                                    <Typography variant="body2" color="text.secondary" className='desc'>
                                        {filterDesc("This is the most detailed C++ course that is available on internet. This course will take you from Z")}
                                    </Typography>
                                    <div className='tags'>
                                        <Fab variant="extended" size="small" className='tag'>
                                            coding
                                        </Fab>
                                    </div>
                                    <span className='price'>Rs. {0}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="page5">
                <h3>Course Instructors</h3>
                <p className='header-support'>Take the next step in your career. Get hands-on with the industry's most in-demand technologies.</p>
                <div className="teachers">
                    <div className='teachercards'>
                        <TeacherCard
                            id="65a16be384dda50de26b9584"
                            username="Chandrachur"
                            profileImage="https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg"
                            socialMediaLinks={null}
                        />
                        <TeacherCard
                            id="65b544fcba3120d84f3365e9"
                            username="Tuhin Saha"
                            profileImage="https://res.cloudinary.com/desdkbhvz/image/upload/v1706378491/d0cjnei5atanj075g4oc.jpg"
                            socialMediaLinks={null}
                        />
                        <TeacherCard
                            id="65a2bf4f78312d451db95325"
                            username="nayakpenguin"
                            profileImage="https://res.cloudinary.com/desdkbhvz/image/upload/v1705164623/bwcc1ecwiifi5t6vcv8m.png"
                            socialMediaLinks={null}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
                Copyright ©2023 Learnify, Inc. All rights reserved.
                <p> - Powered by <b>Learnify Business</b></p>
            </div>
        </Container>
    )
}

export default LandingPage

const Container = styled.div`
    .page1{
        min-height: 600px;
        /* margin-top: calc(70px + 0px); */
        height: calc(100vh - 70px);
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 100px 20px 100px 100px;

        .left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50%;
            
            .ju-logo{
                display: flex;
                align-items: center;

                img{
                    height: 40px;
                }

                .small{
                    height: 25px;
                    margin-left: 10px;
                }

            }

            h1{
                font-size: 3rem;
                font-weight: 600;
            }

            h4{
                font-size: 1.25rem;
                font-weight: 500;
            }

            .students-already-enrolled{
                margin-top: 30px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .student{
                    height: 60px;
                    padding: 2.5px;
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #ffffff;
                    margin: 0 -15px 5px 0;

                    img{
                        border-radius: 50%;
                        height: 100%;
                        aspect-ratio: 1/1;
                    }
                }

                .info{
                    margin-left: 20px;
                    font-size: 0.7rem;
                    b{
                        font-size: 0.85rem;
                        display: block;
                        font-weight: 600;
                    }
                }
            }
            
            .btns{
                display: flex;
                align-items: center;

                .btn{
                    margin-top: 30px;
                    padding: 10px;
                    /* border: 1px solid #d8b8b8; */
                    border: none;
                    font-size: 0.8rem;
                    margin-right: 10px;
                    background-color: #5d37a8;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                }
            }
        }
        
        .right{
            width: 50%;
            img{
                width: 100%;
            }
        }
    }
    
    .page2{
        background-color: #f4f4ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 120px;

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        .header-support{
            font-weight: 200;
            margin: 20px 0;
        }

        .features{
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .feature{
                height: 225px;
                aspect-ratio: 1.5/1;
                background-color: white;
                margin: 0 25px 25px 0;
                border: 1px solid #e4e4f0;
                border-radius: 5px;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                padding: 25px;
                cursor: pointer;

                img{
                    height: 50px;
                    border-radius: 10px;
                }

                h4{
                    font-weight: 500;
                    font-size: 1rem;
                    margin: 10px 0 10px 0;
                }

                p{
                    font-size: 0.8rem;
                    text-align: center;
                    font-size: 200;
                }
            }
        }
    }

    .page3{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 120px;

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        .header-support{
            font-weight: 200;
            margin: 20px 0;
        }

        /* .topics{
            display: flex; 
            align-items: center;

            .topic{
                margin-right: 10px;
                background-color: black;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                overflow: hidden;


                img{
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                }
            }
        } */
        .videos{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
            align-items: center;
        }

        .videos > * {
            width: calc(100%);
        }

        .videos.sidebarExpanded > * {
            width: calc(100%);
        }

        @media only screen and (min-width: 601px) and (max-width: 800px) {
            .videos > * {
                width: calc(50% - 15px);
            }

            .videos.sidebarExpanded > * {
                width: calc(50% - 15px);
            }
        }

        @media only screen and (min-width: 801px) and (max-width: 1200px) {
            .videos > * {
                width: calc(33.333% - 20px);
            }

            .videos.sidebarExpanded > * {
                width: calc(50% - 15px);
            }
        }

        @media only screen and (min-width: 1201px) and (max-width: 1400px) {
            .videos > * {
                width: calc(33.333% - 20px);
            }

            .videos.sidebarExpanded > * {
                width: calc(33.333% - 20px);
            }
        }

        @media only screen and (min-width: 1401px) {
            
            .videos > * {
                width: calc(25% - 24.5px);
            }

            .videos.sidebarExpanded > * {
                width: calc(25% - 24.5px);
            }
        }
    }

    .page4{
        background-color: #f4f4ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 120px;
        /* min-height: calc(100vh - 115px); */

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        .header-support{
            font-weight: 200;
            margin: 20px 0;
        }

        .courses-list{
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 100%;
            flex-wrap: wrap;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
            align-items: center;
        }

        .courses-list > * {
            width: 100%;
        }

        .courses-list.sidebarExpanded > * {
            width: 100%;
        }


        @media only screen and (min-width: 601px) and (max-width: 800px) {
            .courses-list > * {
                width: calc(50% - 15px);
            }

            .courses-list.sidebarExpanded > * {
                width: calc(50% - 15px);
            }
        }


        @media only screen and (min-width: 801px) and (max-width: 1200px) {
            .courses-list > * {
                width: calc(33.333% - 20px);
            }

            .courses-list.sidebarExpanded > * {
                width: calc(50% - 15px);
            }
        }

        @media only screen and (min-width: 1201px) and (max-width: 1400px) {
            .courses-list > * {
                width: calc(33.333% - 20px);
            }

            .courses-list.sidebarExpanded > * {
                width: calc(33.333% - 20px);
            }
        }

        @media only screen and (min-width: 1401px) {
            .courses-list > * {
                width: calc(25% - 24.5px);
            }

            .courses-list.sidebarExpanded > * {
                width: calc(25% - 24.5px);
            }
        }

        .courses-list .courses{
            /* margin-right: 1rem;
            margin-bottom: 1rem; */
            /* width:  */
            a {
                text-decoration: none;
            }
        }
        .courses-list .courses .level{
            font-weight: 700;
            background: -webkit-linear-gradient(90deg,#6980b5, #3f469d,blue);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .courses-list .courses .price{
            font-weight: 700;
            color: black;
        }
        .courses-list .courses .desc{
            padding: 0px;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
        }
        .courses-list .courses .tag{
            background-color: black;
            color: white;
            text-transform: none;
            font-size: 0.72rem;
            margin: 0.1rem;
            z-index: 1;
        }
        .courses-list .courses .box1{
            height: fit-content;
        }
    }

    .page5{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 120px;

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        .header-support{
            font-weight: 200;
            margin: 20px 0;
        }

        /* .instructors{
            display: flex; 
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 20px;
            width: 780px;

            .instructor{
                margin-right: 10px;
                margin-bottom: 10px;
                background-color: black;
                height: 100px;
                width: 100px;
                border-radius: 50%;
                position: relative;

                img{
                    height: 100px;
                    width: 100px;
                    border-radius: 50%;
                }

                .company{
                    position: absolute;
                    background-color: #fff;
                    border: 1px solid #c1c1c1;
                    height: 35px;
                    width: 35px;
                    padding: 5px;
                    border-radius: 100px;
                    top: -5px;
                    right: -5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img{
                        height: 22.5px;
                        width: 22.5px;
                    }
                }
            }
        } */

        .teachers {
            display: flex;
            width: 100%;
            height: 100%;
            /* min-height: calc(100vh - 70px); */
            justify-content: center;
            align-items: center;
            /* background-color: #e7e7e7;
            background-color: white; */
        }
        .teachercards {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            gap: 30px;
        }

        .teachercard-outer {
            width: 100%;
            height: 100%;
        }

        .teachercards > * {
            width: calc(100% - 30px);
            height: 100%;
            overflow: hidden;
        }

        @media only screen and (min-width: 601px) and (max-width: 800px) {
            .teachercards > * {
                width: calc(50% - 30px);
            }
        }

        @media only screen and (min-width: 801px) and (max-width: 1200px) {
            .teachercards > * {
                width: calc(33.33% - 24.5px);
            }
        }

        @media only screen and (min-width: 1201px){
            .teachercards > * {
                width: calc(25% - 50px);
            }
        }

    }
    
    .footer{
        height: 70px;
        width: 100vw;
        background-color: #0e0d29;

        display: flex;
        align-items: center;
        justify-content: center;

        color: white;
        font-weight: 200;
        font-size: 0.75rem;

        p{
            display: block;
            color: white;
            font-weight: 200;
            font-size: 0.75rem;
            margin: 0;
            b{
                color: white;
                font-weight: 500;
            }
        }

    }
`