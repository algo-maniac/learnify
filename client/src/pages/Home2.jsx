import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import NavbarLandingPage from '../components/NavbarLandingPage';


const LandingPage = ({ handleSearchClick }) => {
    const navigate = useNavigate();
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
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocJa8z9paqwbmbmgoyzio2GbMogxzEbhJkWxozfe9XaUQd4=s576-c-no" alt="" />
                        </div>
                        <div className="student">
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                        </div>
                        <div className="student">
                            <img src="https://www.famousbirthdays.com/headshots/ana-armas-5.jpg" alt="" />
                        </div>
                        <div className="student">
                            <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg" alt="" />
                        </div>
                        <div className="info">
                            <b>50+ Students</b> in community
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
                        <h4>Exam Corner</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                    <div className="feature" onClick={() => navigate('/exam-corner')}>
                        <img src="/assets/exam.png" alt="" />
                        <h4>Doubt Corner</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, mollitia unde facere vero rem aliquam.</p>
                    </div>
                </div>
            </div>
            <div className="page3">
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
            </div>
            <div className="page4">
                <h3>All Courses</h3>
                <p className='header-support'>Our courses come with added benefits as well.</p>
                <div className="all-courses">
                    <div className="course">
                        <img src="https://i.ytimg.com/vi/X48VuDVv0do/maxresdefault.jpg" alt="" />
                        <div className="course-name">Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]</div>
                        <div className="course-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deserunt at suscipit ratione nihil rem id repudiandae, minus, facilis ex ad modi cum! Necessitatibus, a.</div>
                        <div className="instructors">
                            <b>Course Instructors : </b>
                            <a href="/">Atanu Nayak</a>,
                            <a href="/">Elon Musk</a> and
                            <a href="/">Mark Zuckerburg</a>
                        </div>
                    </div>
                    <div className="course">
                        <img src="https://i.ytimg.com/vi/x_x5LkW6IXs/maxresdefault.jpg" alt="" />
                        <div className="course-name">Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]</div>
                        <div className="course-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deserunt at suscipit ratione nihil rem id repudiandae, minus, facilis ex ad modi cum! Necessitatibus, a.</div>
                        <div className="instructors">
                            <b>Course Instructors : </b>
                            <a href="/">Atanu Nayak</a>,
                            <a href="/">Elon Musk</a> and
                            <a href="/">Mark Zuckerburg</a>
                        </div>
                    </div>
                    <div className="course">
                        <img src="https://i.ytimg.com/vi/7kBfeNf8pQo/maxresdefault.jpg" alt="" />
                        <div className="course-name">Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]</div>
                        <div className="course-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deserunt at suscipit ratione nihil rem id repudiandae, minus, facilis ex ad modi cum! Necessitatibus, a.</div>
                        <div className="instructors">
                            <b>Course Instructors : </b>
                            <a href="/">Atanu Nayak</a>,
                            <a href="/">Elon Musk</a> and
                            <a href="/">Mark Zuckerburg</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page5">
                <h3>Course Instructors</h3>
                <p className='header-support'>Take the next step in your career. Get hands-on with the industry's most in-demand technologies.</p>
                <div className="instructors">
                    <div className="instructor">
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocJa8z9paqwbmbmgoyzio2GbMogxzEbhJkWxozfe9XaUQd4=s576-c-no" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/5bb22ae84bbe6f67d2e82e05/0x0.jpg?format=jpg&crop=1012,1013,x627,y129,safe" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5e8b62cfc095010007bffea0/416x416.jpg?background=000000&cropX1=0&cropX2=4529&cropY1=652&cropY2=5184" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5babb7f1a7ea4342a948b79a/416x416.jpg?background=000000&cropX1=748&cropX2=3075&cropY1=1753&cropY2=4082" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5c76bcaaa7ea43100043c836/416x416.jpg?background=000000&cropX1=227&cropX2=2022&cropY1=22&cropY2=1817" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5c7d7c254bbe6f78090d831f/416x416.jpg?background=000000&cropX1=475&cropX2=2887&cropY1=168&cropY2=2582" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/59d50c47a7ea436b47b36d66/416x416.jpg?background=000000&cropX1=553&cropX2=2940&cropY1=322&cropY2=2708" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://specials-images.forbesimg.com/imageserve/5c76b4104bbe6f24ad99c35d/416x416.jpg?background=000000&cropX1=165&cropX2=5613&cropY1=321&cropY2=5769" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/615c93f9da61f2ff5b9ecf9b/0x0.jpg?format=jpg&crop=1678,1679,x0,y118,safe" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                    <div className="instructor">
                        <img src="https://techcrunch.com/wp-content/uploads/2021/03/Alexandr-Wang-.jpg?w=730&crop=1" alt="" />
                        <div className="company">
                            <img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                Copyright ©2023 EliteCode, Inc. All rights reserved.
                <p> - Powered by <b>Algolisted Business</b></p>
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

        .topics{
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
        }
    }

    .page4{
        background-color: #f4f4ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 120px;
        min-height: calc(100vh - 115px);

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        .header-support{
            font-weight: 200;
            margin: 20px 0;
        }

        .all-courses{
            display: flex;
            align-items: center;
            margin-top: 40px;

            .course{
                width: 360px;
                padding: 10px;
                background-color: white;
                border-radius: 10px;
                margin: 0 10px;
                border: 1px solid #cecece;
                
                img{
                    width: 100%;
                    border-radius: 10px;
                }
                
                .course-name{
                    font-size: 1rem;
                    font-weight: 500;
                    margin: 10px 0 5px 0;
                }
                
                .course-desc{
                    font-size: 0.8rem;
                    font-weight: 200;
                }

                .instructors{
                    margin-top: 10px;
                    font-size: 0.8rem;
                    font-weight: 200;

                    b{
                        font-weight: 500;
                    }

                    a{
                        margin: 0 2px 0 5px;
                    }
                }
            }
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

        .instructors{
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

            b{
                color: white;
                font-weight: 500;
            }
        }

    }
`