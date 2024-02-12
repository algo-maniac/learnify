import { useParams } from 'react-router-dom';
import ExamHeader from './ExamHeader';
import ExamResources from './ExamResources';
import styled from '@emotion/styled';
import "./ExamCorner.css"
const ExamCorner=()=>{
    const param=useParams();
    return (
        <>
        <Container>
            <ExamHeader/>
        </Container>
        </>
    )
}
const Container = styled.div`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: 'Bungee Shade', cursive;
    font-family: 'Cutive', serif;
    font-family: 'Poppins', sans-serif;
  }
  
  .exam-container .linkSyllabus:hover{
    cursor: pointer;
    color: black;
  }
  .exam-container .header-icon{
    border:1px solid black;
  }
  .exam-container .icons{
    width:60%;
    margin:auto;
    font-size:1.5rem;
    font-weight:800;
  }
  .exam-container .header div{
    width: 13%;
    height: 90%;
    display: flex;
    transition: all 0.5s;
    border-radius: 50%/105%;
    justify-content: center;
    border: 2px solid black;
  }
  .exam-container .header div:hover{
    cursor:pointer;
    background-color: rgb(202, 192, 192);
  }
  .exam-container .header div span{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .exam-container body{
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */
    min-height: 200vh;
    font-family: 'Fira Sans', sans-serif;
    /* background: linear-gradient(147deg,#2129c1 0%, #9295e0 74%); */
  }
  .exam-container button{
    outline:none;
  }
  .exam-container .blog-card{
    width: 80%;
    min-height: 50vh;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    border-radius: 15px;
    background: white;
    box-shadow: 0px 10px 50px rgba(40, 114, 193, 0.3);
  }
  .exam-container .inner-part{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 25px;
    padding-top: 10px;
  }
  .material-header{
    display:flex;
    flex-direction:row;
  }
  .material-header .upload-btn{
    margin-left:auto;
    background-color:#10b39a;
    border-radius:25px;
    margin-top:0.5rem;
    margin-right:0.5rem;
    color:white;
    font-size:2.2rem
  }
  .material-header .upload-btn:hover{
    background-color:green;
    cursor:pointer;
  }
  .exam-container .inner-part .img{
    height: 80%;
    width: 35%;
    position: static;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid black;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .exam-container .img img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0;
    transition: .6s;
  }
  .exam-container #tap-1:checked ~ .inner-part .img-1,
  #tap-2:checked ~ .inner-part .img-2,
  #tap-3:checked ~ .inner-part .img-3{
    opacity: 1;
    transition-delay: .2s;
  }
  .exam-container .content{
    padding: 0 20px 0 35px;
    width: 530px;
    margin-left: 50px;
    opacity: 0;
    transition: .6s;
  }
  .exam-container .content h3{
    font-weight: 800;
    font-size:1.4rem
  }
  .exam-container .content .text{
    font-weight: 450;
  }
  .exam-container #tap-1:checked ~ .inner-part .content-1,
  #tap-2:checked ~ .inner-part .content-2,
  #tap-3:checked ~ .inner-part .content-3{
    opacity: 1;
    margin-left: 0px;
    z-index: 100;
    transition-delay: .3s;
  }
  .exam-container .content span{
    display: block;
    color: #7b7992;
    margin-bottom: 15px;
    font-size: 22px;
    font-weight: 500
  }
  .exam-container .content .title{
    font-size: 27px;
    font-weight: 800;
    color: #0d0925;
    margin-bottom: 20px;
    font-family: 'Bungee Shade', cursive;
    font-family: 'Cutive', serif;
    font-family: 'Poppins', sans-serif;
  }
  .exam-container .content .text{
    color: gray;
    font-size: 14px;
    margin-bottom: 6px;
    line-height: 1.5em;
    text-align: justify;
  }
  .exam-container .content button{
    display: inline-flex;
    padding: 15px 20px;
    border: none;
    font-size: 16px;
    text-transform: uppercase;
    color: #fff0e6;
    font-weight: 600;
    letter-spacing: 1px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    border: 1px solid #fd3535;
    background: linear-gradient(147deg, #fe8a39  0%, #fd3838 74%);
  }
  .exam-container .content button:hover{
    background: linear-gradient(147deg, #fe791b 0%, #fd1c1c 74%);
  }
  .exam-container .toggleSyllabus{
    text-decoration: underline;
    color: #000001;
  }
  .exam-container input[type="radio"],
  .exam-container input[type="checkbox"]{
    display: none;
  }
  .exam-container .resourceContainer{
    width: 80%;
    margin-top: 30px;
    margin: auto;
    transition: all 1s;
    border-radius: 15px;
    padding: 10px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0px 10px 50px rgba(17, 110, 187, 0.3);
    margin-bottom: 30px;
  }
  .exam-container .resourceContainer .info{
    font-weight: 500;
  }
  .exam-container .resourceContainer h2{
    margin: 20px;
    font-weight:800;
    margin-top:10px;
    margin-bottom:10px;
    background: linear-gradient(45deg, #0cc6fa, #0e2ac9,#5e23b0,#970fa6);
    -webkit-background-clip: text; /* For Safari/Chrome */
    background-clip: text;
    color: transparent;
    font-family: 'Bungee Shade', cursive;
    font-family: 'Cutive', serif;
    font-family: 'Roblex', sans-serif;
  }
  .exam-container .resourceContainer .resources{
    display: flex;
    flex-wrap: wrap;
  }
  .exam-container .resourceCard{
    margin: 10px;
    /* border: 3px solid black;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; */
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    padding: 20px 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgb(91, 90, 90);
  }
  .exam-container .channel1{
    display: flex;
    flex-wrap:wrap;
    align-items: flex-start;
    justify-content:space-between;
    padding-left:4%;
    padding-right:4%
  }
  .exam-container .card{
    min-width:245px;
    max-width:245px;
  }
  .exam-container .notes-content{
    margin:0.7rem;
  }  
  .cards a{
    text-decoration:none;
  }
  .exam-container .channel div{
    text-align: center;
    padding: 20px 10px;
    border-radius: 10px;
  }
  .channel1 img{
    border-radius:5px;
  }
  .exam-container .cards{
    width:240px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin:0.6rem;
    border-radius:5px;
    text-decoration:none;
  }
  .exam-container .cards img{
    min-height:160px;
    max-height:160px;

  }
  .exam-container .cards .text{
    margin-top:0.5rem;
    margin-left:0.5rem;
    margin-bottom:0.7rem;
    color:black;
    text-decoration:none;
  }
  .channel1 .time{
    color:#13c24e;
    font-weight:bold;
  }
  .exam-container .cards .text h6{
    font-weight:800;
    font-size:1.1rem
  }
  .exam-container .cards .text p{
    color:#878584;
    font-size:0.85em;
  }
  .exam-container img{
    width:100%;
    height:80%
  }
  .exam-container .channel img{
    width: 200px;
    position: static;
    border-radius: 10px;
    height: 150px;
    border: 3px solid black;
  }
  .exam-container .channel .header{
    font-weight: bolder;
    font-size: 1.2rem;
    margin-bottom: 0px;
  }
  .exam-container .channel span{
    width: 100%;
    height: 24px;
  }
  .exam-container .resources{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .exam-container .resources div{
    text-align: center;
  }
  .exam-container .resources img{
    width: 200px;
    border-radius: 10px;
    border: 1px solid black;
    height: 150px;
  }
  .exam-container .resources .header{
    font-weight: bolder;
    font-size: 1.2rem;
    width: 100%;
    height: 24px;
  }
  
  .exam-container .active{
    color: white;
    background-color: black;
  }
  .exam-container .notes-content{
    text-align: left;
  }
  .exam-container .notes-header{
    font-weight: 700;
    text-align: left;
  }
`
export default ExamCorner;