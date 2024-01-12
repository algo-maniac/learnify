import './Admin.css'
import GroupIcon from '@mui/icons-material/Group';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VideocamIcon from '@mui/icons-material/Videocam';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import RequestBox from '../components/RequestBox';
function Admin() {
    return (
        <>
        <div className='outer'>
            <div className='left-dashboard'>
            <nav className='dashboard-box'>
                <ul>
                    <li><a href="">
                    <i class="fas fa-home"></i>
                    <span class="nav-item">Home</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-user"></i>
                    <span class="nav-item">Profile</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-wallet"></i>
                    <span class="nav-item">Wallet</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-chart-bar"></i>
                    <span class="nav-item">Analytics</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-tasks"></i>
                    <span class="nav-item">Tasks</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-cog"></i>
                    <span class="nav-item">Settings</span>
                    </a></li>
                    <li><a href="">
                    <i class="fas fa-question-circle"></i>
                    <span class="nav-item">Help</span>
                    </a></li>
                    <li><a href="" class="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="nav-item">Log out</span>
                    </a></li>
                </ul>
                </nav>
            </div>
            <div className='right-dashboard'>
                <div className='header'>
                    <div className='header-left'>
                        <h2>Dashboard</h2>
                    </div>
                    <div className='header-right'>
                        <h3><span>Home </span>/ Admin</h3>
                    </div>
                </div>
                <div className='statistics-container'>
                    <div className='box'>
                        <div className='left-part'>
                            <h4>User Count</h4>
                            <h3>100</h3>
                            <span><ArrowUpwardIcon/> 5%<span className='text'> (since last week)  </span></span>
                        </div>
                        <div className='right-part' id='user-icon'>
                            <GroupIcon/>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left-part'>
                            <h4>Playlists</h4>
                            <h3>8</h3>
                            <span><ArrowUpwardIcon/> 15%<span className='text'> (since last week)  </span></span>
                        </div>
                        <div className='right-part' id='playlist-icon'>
                            <PlaylistAddIcon/>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left-part'>
                            <h4>Watch Time</h4>
                            <h3>80 hours</h3>
                            <span><ArrowUpwardIcon/> 5%<span className='text'> (since last week)  </span></span>
                        </div>
                        <div className='right-part' id='video-icon'>
                            <VideocamIcon/>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='left-part'>
                            <h4>Pending Request</h4>
                            <h3>30</h3>
                            <span><ArrowUpwardIcon/> 20%<span className='text'> (since last week)  </span></span>
                        </div>
                        <div className='right-part' id='request-icon'>
                            <MapsUgcIcon/>
                        </div>
                    </div>
                </div>
                <RequestBox/>
            </div>
        </div>
        </>
    )
}

export default Admin