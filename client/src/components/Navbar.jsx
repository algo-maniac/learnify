import React, { useState, useContext, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AuthContext from "../store/auth-context";

function Navbar({ toggleIsSearchExpanded, logout }) {
  const { userdata, setUserdata, fetchUserdata } = useContext(AuthContext);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const onBlurSearch = () => {
    setIsSearchFocused(false);
  };
  const dropdownRef = useRef(null);
  const history = useNavigate();

  const openSearchBar = () => {
    setIsSearchFocused(true);
    setIsSearchExpanded(true);
  };
  const cancelSearch = () => {
    setSearchText('');
    setIsSearchExpanded(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const redirectToSearch = (text) => {
    if (searchText && isSearchFocused) {
      history(`/search?query=${ text }`);
    }
  };


  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      redirectToSearch(searchText);
    }, 1000);

    setDebounceTimeout(newTimeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [searchText]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <Container className="navbar">
      <div className="left">
        <MenuOutlinedIcon onClick={toggleIsSearchExpanded} />
        <Link to="/">
          <div className="navbar_branding">
            <img src="/learnify_logo.png" alt="" className="navbar_logo" />
            <h2> Learnify </h2>
          </div>
        </Link>
      </div>


      <div className="right">
        <div className={`search-mobile ${ isSearchExpanded ? 'expanded' : '' }`} >
          <SearchIcon className="search-icon" onClick={openSearchBar} />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onBlur={onBlurSearch}
          />
          <CancelIcon className="cancel-icon" onClick={cancelSearch} />
        </div>

        <div className='search'>
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onBlur={onBlurSearch}
          />
          <CancelIcon className={`cancel-icon  ${ searchText ? 'hasInputText' : '' }`} onClick={cancelSearch} />
        </div>

        {userdata && userdata.id ? (
          <div className="right-profile">
            <img src={userdata.profileImage} alt="profileImage" />
            <div ref={dropdownRef}>
              {isDropdownOpen ?
                <KeyboardArrowUpIcon onClick={toggleDropdown} />
                : <KeyboardArrowDownIcon onClick={toggleDropdown} />
              }
              {isDropdownOpen && (
                <DropdownMenu>
                  <div>
                    <PersonIcon />
                    {userdata.username}
                  </div>
                  <div>
                    <SettingsIcon />
                    Settings
                  </div>
                  <div onClick={logout}>
                    <ExitToAppIcon />
                    Logout
                  </div>
                </DropdownMenu>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="right-profile">
              <button onClick={() => navigate('/signup')}>Signup</button>
              <button onClick={() => navigate('/login')}>Login</button>
            </div>
          </>
        )}
      </div>

    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  background-color: #fff;
  /* background-color: #000000; */
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d0d0d0;
  height: 70px;
  padding: 5px 20px;
  margin: 0;

  .left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      .navbar_branding {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img {
          width: 45px;
          height: 45px;
          margin: 0;
          /* mix-blend-mode: ; */
          box-shadow: 0;
        }

        h2 {
          margin: 5px;
          padding: 0;
          color: #3455e4;
          color: #000;
          /* background: linear-gradient(to right, #000000, #0000ff, #0f18bb);
          -webkit-background-clip: text;
          color: transparent; */
          /* text-shadow: 1px 1px 2px rgba(55, 63, 169, 0.57); */
          font-weight: 500;
           
          
        }
      }
    }
  }



  .right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .search {
      position: relative;
      cursor: pointer;

      .search-icon {
        color: #13298b;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      input {
        width: 30vw;
        border: 0;
        outline: none;
        padding: 7px 45px;
        background-color: #ebebeb;
        border-radius: 30px;

        &:focus {
          outline: none;
          border: 1px solid #3c54c0;
        }
      }

      .cancel-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
         
        &.hasInputText {
          display: block;
        }
      }
    }

    .search-mobile {
      display: none;
    }


    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .right-profile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;

      button {
        padding: 6px 5px;
        margin: 0;
        width: 5rem;
        color: #1732ac;
        background-color: #ebebeb;
        border: 0;
        outline: 0;
        border-radius: 20px;
        /* font-size: 1rem; */
        font-weight: 500;

        &:hover {
          background-color: #e2e2e2;
        }
      }

      button:nth-child(2) {
        background-color: #1732ac;
        color: white;

        &:hover {
          background-color: #344aac;
        }
      }
    }
  }


  @media screen and (max-width: 600px) {
    padding: 3px 10px;
    margin: 0;

    .left {
      h2 {
        display: none;
      }
    }
  

    .right {
      .search {
        display: none;
      }

      .search-mobile {
        display: flex;
        position: relative;
        input {
          display: none; 
        }
        .cancel-icon {
          display: none;
        }
         
        &.expanded {
          background-color: red; 
          position: fixed;
          top: 0;
          left:0;
          width: 100vw;
          height: 70px;
          background-color: white; // Change the background color as needed

        

          .search-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }

          input {
            display: block;
            width: calc(100% - 70px); 
            margin: 10px;
            width: 100%;
            border: 0;
            outline: none;
            padding: 7px 40px;
            background-color: #ebebeb;
            border-radius: 30px;

            &:focus {
              outline: none;
              border: 1px solid #3c54c0;
            }
          }

          .cancel-icon {
            display: block;
            position: absolute;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;

  div {
    padding: 12px 20px; /* Increased padding for larger screens */
    cursor: pointer;
    font-size: 16px; /* Increased font size for larger screens */
    color: #333;
    transition: background-color 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    &:hover {
      background-color: #f5f5f5;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
  }

  @media screen and (min-width: 600px) {
    div {
      padding: 14px 40px; /* Further adjustments for screens wider than 600px */
      font-size: 18px;
    }
  }
`;
