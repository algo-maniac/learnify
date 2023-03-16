import React from 'react'
import './Home.css'

import PersonIcon from '@mui/icons-material/Person';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home_background'>
            <div className="home">
                <div className="cards">
                    <Link to="/teachers">
                    <div className="card">
                        <PersonIcon sx={{ fontSize: 40 }} />
                        <h3>Teachers</h3>
                        <p>Teachers Teachers Teachers Teachers Teachers Teachers </p>
                    </div>
                    </Link>
                    <Link to="/teachers">
                    <div className="card">
                        <PsychologyAltIcon sx={{ fontSize: 40 }} />
                        <h3>Having a Doubt</h3>
                        <p>Teachers Teachers Teachers Teachers Teachers Teachers </p>
                    </div>
                    </Link>
                    <Link to="/teachers">
                    <div className="card">
                        <InfoIcon sx={{ fontSize: 40 }} />
                        <h3>Exam Information</h3>
                        <p>Teachers Teachers Teachers Teachers Teachers Teachers </p>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home