import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const InstructorAbout=()=>{
    return <>
        <div className="about-page">
            <div className="about-desc">
                <h3>About</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veritatis commodi! Ab perspiciatis voluptate ut odio autem doloremque placeat id aut perferendis. Quos saepe odit accusamus. Quibusdam ipsum inventore accusamus atque quisquam magni sunt facere maxime nihil officiis. Exercitationem, nisi!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit vero, adipisci ipsam est maxime placeat nam a repudiandae ullam quibusdam odio minima.This is Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima facere pariatur vero soluta excepturi magnam!lorem30
                </p>
            </div>
            <br></br>
            <div className="about-desc">
                <h3>Links</h3>
                <div className="links">
                    <div className="link">
                        <div className="icon-image">
                            <img src="https://cdn-icons-png.flaticon.com/256/174/174857.png"></img>
                        </div>
                        <div className="icon-info">
                            <div className="icon-header">
                                <h5>LinkedIn</h5>
                            </div>
                            <div className="icon-header">
                                <a href="/linkedin.com" target='_blank'>Link<ArrowOutwardIcon/></a>
                            </div>
                        </div>
                    </div>
                    <div className="link">
                        <div className="icon-image">
                            <img src="data:image/png;base64,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"></img>
                        </div>
                        <div className="icon-info">
                            <div className="icon-header">
                                <h5>Twitter</h5>
                            </div>
                            <div className="icon-header">
                                <a href="x.com" target='_blank'>Link<ArrowOutwardIcon/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default InstructorAbout