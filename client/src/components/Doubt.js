import AuthContext from "../store/auth-context";
import { useContext } from "react";
import "./Doubt.css"
import * as React from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
};
function Doubt() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ctx = useContext(AuthContext);
  return (
    <>
      <div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className="modal-container">
					<div className="modal-header-text">
						<p>Hello fellow octoinvaders! I want to brainstorm new ideas for power-ups. What's the Mona equivalent to coin boxes and mushrooms?</p>
					</div>
          <div className="bot-container">
            <div className="modal-answer-by-user modal-answer-by-bot">
              <div className="modal-answer-by-div">
                <div className="icon">
                  <SmartToyIcon/>
                </div>
                <div className="text">
                  <span>Answered by <strong>Bot </strong></span>
                </div>
              </div>
              <div className="answer">
                <p>Echoing what @pifafu said, I’d love to see Hubot show up as the sidekick delivering the power-ups. He'd give Mona superpowers similar to how GitHub products give developers superpowers. Here is a potential list based on the current features:</p>
              </div>
            </div>
          </div>
          <div className="answer-input"> 
            <div className="input">
              <input placeholder="Write Your Answer"></input>
            </div>
            <div className="icon">
              <SendIcon/>
            </div>
          </div>
          <div className="answer-container">
            <div className="modal-answer-by-user">
              <div className="modal-answer-by-div">
                <div className="icon">
                  <VerifiedIcon/>
                </div>
                <div className="text">
                  <span>Answered by <strong>Chandrachur </strong><span className="time"> on 22 March, 2024 </span></span>
                </div>
              </div>
              <div className="answer">
                <p>Echoing what @pifafu said, I’d love to see Hubot show up as the sidekick delivering the power-ups. He'd give Mona superpowers similar to how GitHub products give developers superpowers. Here is a potential list based on the current features:</p>
              </div>
            </div>
            <div className="modal-answer-by-user">
              <div className="modal-answer-by-div">
                <div className="icon">
                  <VerifiedIcon/>
                </div>
                <div className="text">
                  <span>Answered by <strong>Chandrachur </strong><span className="time"> on 22 March, 2024 </span></span>
                </div>
              </div>
              <div className="answer">
                <p>Echoing what @pifafu said, I’d love to see Hubot show up as the sidekick delivering the power-ups. He'd give Mona superpowers similar to how GitHub products give developers superpowers. Here is a potential list based on the current features:</p>
              </div>
            </div>
            <div className="modal-answer-by-user">
              <div className="modal-answer-by-div">
                <div className="icon">
                  <VerifiedIcon/>
                </div>
                <div className="text">
                  <span>Answered by <strong>Chandrachur </strong><span className="time"> on 22 March, 2024 </span></span>
                </div>
              </div>
              <div className="answer">
                <p>Echoing what @pifafu said, I’d love to see Hubot show up as the sidekick delivering the power-ups. He'd give Mona superpowers similar to how GitHub products give developers superpowers. Here is a potential list based on the current features:</p>
              </div>
            </div>
          </div>
				</Box>
			</Modal>
			</div>
      <div className="doubt-header-icon">
        <div className="icon">
          <span>Recent</span>
        </div>
        <div className="icon icon2">
          <span>Most Votes</span>
        </div>
      </div>
      <div className="doubt-header">
        <div>
          <h5>Discussions</h5>
        </div>
        <div className="search-div">
          <input placeholder="Search Tag"></input>
        </div>
      </div>
      <div className="doubt-chat-container">
        <div className="single" onClick={handleOpen}>
          <div className="left-side">
            <div>
              <span className="serial">#1</span>
            </div>
            <div className="upvote">
              <span>👍 12</span>
            </div>
          </div>
          <div className="right-side">
            <div className="profile-info">
              <div className="image">
                <img src="https://images.squarespace-cdn.com/content/v1/5f3953e39a33a303626b4920/3631dac0-d667-47d2-ab50-d19e5e0e87c2/Untitled+design+%2823%29.png"></img>
              </div>
              <div className="text">
                <span><strong>Chandrachur</strong><span> on February, 2024</span></span>
              </div>
            </div>
            <div className="question">
              <p>Hello fellow octoinvaders! I want to brainstorm new ideas for power-ups. What's the Mona equivalent to coin boxes and mushrooms?</p>
            </div>
            <div className="tags">
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>RAM</span>
              </div>
              <div className="tag">
                <span>ROM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="single" onClick={handleOpen}>
          <div className="left-side">
            <div>
              <span className="serial">#2</span>
            </div>
            <div className="upvote">
              <span>👍 12</span>
            </div>
          </div>
          <div className="right-side">
            <div className="profile-info">
              <div className="image">
                <img src="https://images.squarespace-cdn.com/content/v1/5f3953e39a33a303626b4920/3631dac0-d667-47d2-ab50-d19e5e0e87c2/Untitled+design+%2823%29.png"></img>
              </div>
              <div className="text">
                <span><strong>Chandrachur</strong><span> on February, 2024</span></span>
              </div>
            </div>
            <div className="question">
              <p>Hello fellow octoinvaders! I want to brainstorm new ideas for power-ups. What's the Mona equivalent to coin boxes and mushrooms?</p>
            </div>
            <div className="tags">
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>RAM</span>
              </div>
              <div className="tag">
                <span>ROM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="single" onClick={handleOpen}>
          <div className="left-side">
            <div>
              <span className="serial">#2</span>
            </div>
            <div className="upvote">
              <span>👍 12</span>
            </div>
          </div>
          <div className="right-side">
            <div className="profile-info">
              <div className="image">
                <img src="https://images.squarespace-cdn.com/content/v1/5f3953e39a33a303626b4920/3631dac0-d667-47d2-ab50-d19e5e0e87c2/Untitled+design+%2823%29.png"></img>
              </div>
              <div className="text">
                <span><strong>Chandrachur</strong><span> on February, 2024</span></span>
              </div>
            </div>
            <div className="question">
              <p>Hello fellow octoinvaders! I want to brainstorm new ideas for power-ups. What's the Mona equivalent to coin boxes and mushrooms?</p>
            </div>
            <div className="tags">
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>RAM</span>
              </div>
              <div className="tag">
                <span>ROM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="single" onClick={handleOpen}>
          <div className="left-side">
            <div>
              <span className="serial">#2</span>
            </div>
            <div className="upvote">
              <span>👍 12</span>
            </div>
          </div>
          <div className="right-side">
            <div className="profile-info">
              <div className="image">
                <img src="https://images.squarespace-cdn.com/content/v1/5f3953e39a33a303626b4920/3631dac0-d667-47d2-ab50-d19e5e0e87c2/Untitled+design+%2823%29.png"></img>
              </div>
              <div className="text">
                <span><strong>Chandrachur</strong><span> on February, 2024</span></span>
              </div>
            </div>
            <div className="question">
              <p>Hello fellow octoinvaders! I want to brainstorm new ideas for power-ups. What's the Mona equivalent to coin boxes and mushrooms?</p>
            </div>
            <div className="tags">
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>Computer-Network</span>
              </div>
              <div className="tag">
                <span>RAM</span>
              </div>
              <div className="tag">
                <span>ROM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doubt;
