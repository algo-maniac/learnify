import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import styled from "styled-components";
const RequestBox = () => {
  const [img, setImg] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [document, setDocument] = useState(false);
  const [data, setData] = useState([]);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [sortOption, setSortOption] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const ctx = useContext(AuthContext);

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleRowClick = (index) => {
    setActiveRowIndex(index);
  };

  const imagePopupHandler = (env) => {
    // console.log(env.target.id)
    const id = env.target.id;
    console.log(data[id].profileImage);
    setImgUrl(data[id].profileImage);
    setDocument(false);
    setImg(true);
  };
  const disableImagePopup = () => {
    setImg(false);
    setDocument(false);
  };
  const documentHandler = () => {
    setImg(false);
    setDocument(true);
  };
  const fetchHandler = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/getpendingrequests`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      console.log(data);
      setData(data.pendingRequests);
      console.log(data);
    } catch (error) {
      console.error("Error occurred:");
    }
  };
  useEffect(() => {
    fetchHandler();
  }, []);
  const getTime = (data) => {
    const dateObject = new Date(data);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    var time = "";
    let period = hours >= 12 ? "PM" : "AM";
    time += `${hours}:${minutes} ${period}`;
    return time;
  };
  const getDate = (data) => {
    const dateObject = new Date(data);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = dateObject.getDay();
    var date = "";
    date += `${day},${monthNames[month]} ${year}`;
    return date;
  };

  const approveRequest = async (role, id) => {
    const result = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/approveAccount`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        role: role,
      }),
    });

    fetchHandler();
    // do notifying stuff
  };

  const denyRequest = async (role, id) => {
    const result = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/denyAccount`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        role: role,
      }),
    });

    fetchHandler();
  };

  useEffect(() => {
    const sortData = (data) => {
      const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortOption];
        const valueB = b[sortOption];

        if (sortOption === "createdAt") {
          return sortOrder === "desc"
            ? new Date(valueB) - new Date(valueA)
            : new Date(valueA) - new Date(valueB);
        } else if (sortOption === "email" || sortOption === "username") {
          return sortOrder === "desc"
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB);
        } else if (sortOption === "role") {
          const roleOrder = { Admin: 1, Instructor: 2 };
          return sortOrder === "desc"
            ? roleOrder[valueB] - roleOrder[valueA]
            : roleOrder[valueA] - roleOrder[valueB];
        }

        return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
      });
      console.log(sortedData);
      return sortedData;
    };

    setData((prevData) => sortData(prevData));
  }, [sortOption, sortOrder]);

  return (
    <Container>
      {img && (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="content" onClick={disableImagePopup}>
            {img && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src={imgUrl}></img>
              </Typography>
            )}
          </Box>
        </Modal>
      )}
      {document && (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="content" onClick={disableImagePopup}>
            {document && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src={imgUrl}></img>
              </Typography>
            )}
          </Box>
        </Modal>
      )}
      <div className="request-box">
        <div className="top">
          <h3 className="heading">Pending Request</h3>
          <div className="sort-options">
            <label htmlFor="sortOption">Sort by:</label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="role">Role</option>
              <option value="username">Name</option>
              <option value="createdAt">Request Time</option>
            </select>

            <label htmlFor="sortOrder">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => handleOrderChange(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <br />
        <table class="content-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th>Image Link</th>
              <th>Date & Time</th>
              <th>Document</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody class="table-body">
            {/* <tr>
                    <td className="serial-no">1</td>
                    <td className="name">Manoj Kumar</td>
                    <td className="email">manoj69@gmail.com</td>
                    <td className='img-link' onClick={imagePopupHandler}>Image-Link</td>
                    <td className="timestamp">11:10am<br></br>11 Jan,2024</td>
                    <td className="link" onClick={documentHandler}>Attachment</td>
                    <td><button className="button-41" role="button">Accept</button></td>
                    <td><button className="button-24" role="button">Reject</button></td>
                </tr> */}
            {data.length > 0 &&
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index === activeRowIndex ? "active-row" : ""}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="serial-no">{index + 1}</td>
                  <td className="role">{item.role}</td>
                  <td className="name">{item.username}</td>
                  <td className="email">{item.email}</td>
                  <td
                    className="img-link"
                    id={index}
                    onClick={imagePopupHandler}
                  >
                    Image-Link
                  </td>
                  <td className="timestamp">
                    {getTime(item.createdAt)}
                    <br></br>
                    {getDate(item.createdAt)}
                  </td>
                  <td className="link" id={index} onClick={documentHandler}>
                    Attachment
                  </td>
                  <td>
                    <button
                      className="button-41"
                      onClick={() => approveRequest(item.role, item.id)}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      className="button-24"
                      onClick={() => denyRequest(item.role, item.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default RequestBox;

const Container = styled.div`
  width: 100%;
  padding: 0 30px;
  .request-box .heading {
    color: rgb(137, 137, 137);
    font-weight: 650;
    /* padding-left: 1.2rem; */
    font-size: 1.55rem;
    border-radius: 5px;
    margin: 0;
  }

  .request-box .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .request-box .sort-options {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .request-box .content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    /* max-width: 80vw; */
    width: 100%;
    border-radius: 5px 5px 0 0;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  .request-box .content-table thead tr {
    background-color: #07279d;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
    border-radius: 5px;
  }

  .request-box .content-table th,
  .request-box .content-table td {
    padding: 12px 15px;
    box-sizing: border-box;
  }

  .request-box .content-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .request-box .content-table tbody tr:nth-of-type(even) {
    background-color: #e3e0e0;
  }

  .request-box .MuiModal-root {
    max-height: 80vh;
    /* You can adjust this value based on your needs */
  }

  .request-box .image-container {
    position: relative;
    width: 100%;
    padding-top: 75%;
    /* Adjust this value to set the aspect ratio (e.g., 75% for 4:3) */
  }

  .content img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Maintain aspect ratio while covering the container */
  }

  .request-box .content-table tbody tr.active-row {
    font-weight: bold;
    background-color: #c2cbf4;
  }

  .request-box .table-body tr:hover {
    background-color: #c2cbf4 !important;
  }

  .request-box .content-table .table-body .img-link:hover {
    cursor: pointer;
    color: blue;
  }

  .request-box .content-table .table-body .link:hover {
    cursor: pointer;
    color: blue;
  }

  .request-box .content-table .table-body .img-link {
    font-weight: 700;
  }

  .request-box .content-table .table-body .link {
    font-weight: 700;
  }

  /* .button-24 {
    background: #FF4742;
    border: 1px solid #FF4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 16px;
    min-height: 25px;
    outline: 0;
    padding: 8px 8px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
}

.button-24:hover,
.button-24:active {
    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
}

.button-24:active {
    opacity: .5;
}

.button-41 {
    background: #1bd01e;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 16px;
    min-height: 25px;
    outline: 0;
    padding: 8px 8px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
}

.button-41:hover {
    background: #03673a;
} */

  .request-box .timestamp {
    color: rgb(69, 81, 211);
    font-weight: 700;
  }

  .request-box .role,
  .request-box .name,
  .request-box .email,
  .request-box .serial-no {
    font-weight: 700;
  }

  .request-box .content {
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
  }

  .content img {
    width: 50vw;
    top: 10%;
    left: 25%;
    pointer-events: none;
    position: absolute;
    height: 80vh;
  }

  .request-box img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .button-41 {
    background-color: #4caf50; /* Green color */
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Hover effect for the Accept button */
  .button-41:hover {
    background-color: #45a049; /* Darker green color on hover */
  }

  /* Style for the Reject button */
  .button-24 {
    background-color: #f44336; /* Red color */
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Hover effect for the Reject button */
  .button-24:hover {
    background-color: #d32f2f; /* Darker red color on hover */
  }

  .sort-options {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  /* Label style for sort options */
  .request-box .sort-options label {
    font-weight: bold;
  }

  /* Select dropdown style for sort options */
  .request-box .sort-options select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;
