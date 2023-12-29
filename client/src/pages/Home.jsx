import './Home.css'

import PersonIcon from '@mui/icons-material/Person';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home_background'>
            <div className="home">
                <div className="banner">
                    <h2>Learning made easy</h2>
                </div>
                <div className="cards">
                    <Link to="/teachers">
                    <div className="card">
                        <PersonIcon sx={{ fontSize: 40 }} />
                        <h3>Teachers</h3>
                        <p>Follow the most experienced teacher on Learnify</p>
                    </div>
                    </Link>
                    <Link to="/doubt">
                    <div className="card">
                        <PsychologyAltIcon sx={{ fontSize: 40 }} />
                        <h3>Having a Doubt</h3>
                        <p>Have any doubt? clear it out instantly with Learnify doubt support</p>
                    </div>
                    </Link>
                    <Link to="/exam-corner">
                    <div className="card">
                        <InfoIcon sx={{ fontSize: 40 }} />
                        <h3>Exam Information</h3>
                        <p>Get all exam related information in one place. Explore now</p>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home