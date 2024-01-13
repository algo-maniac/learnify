import './RequestBox.css'
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
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
        console.log(data[id].profileImage)
        setImgUrl(data[id].profileImage)
        setDocument(false)
        setImg(true)
    }
    const disableImagePopup = () => {
        setImg(false)
        setDocument(false)
    }
    const documentHandler = () => {
        setImg(false);
        setDocument(true)
    }
    const fetchHandler = async () => {
        try {
            const result = await fetch('http://localhost:8000/admin/getpendingrequests', {
                method: 'GET',
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });

            if (!result.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await result.json();
            console.log(data);
            setData(data.pendingRequests)
            console.log(data)
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
    }
    const getDate = (data) => {
        const dateObject = new Date(data);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const day = dateObject.getDay();
        var date = ""
        date += `${day},${monthNames[month]} ${year}`;
        return date
    }

    const approveRequest = async (role, id) => {
        const result = await fetch('http://localhost:8000/admin/approveAccount', {
            method: 'POST',
            headers: {
                "authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                role: role
            })
        });

        fetchHandler();
        // do notifying stuff
    }

    const denyRequest = async (role, id) => {
        const result = await fetch('http://localhost:8000/admin/denyAccount', {
            method: 'POST',
            headers: {
                "authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                role: role
            })
        });

        fetchHandler();
    }

    useEffect(() => {
        const sortData = (data) => {
            const sortedData = [...data].sort((a, b) => {
                const valueA = a[sortOption];
                const valueB = b[sortOption];

                if (sortOption === "createdAt") {
                    return sortOrder === "desc" ? new Date(valueB) - new Date(valueA) : new Date(valueA) - new Date(valueB);
                } else if (sortOption === "email" || sortOption === "username") {
                    return sortOrder === "desc" ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
                } else if (sortOption === "role") {
                    const roleOrder = { "Admin": 1, "Instructor": 2 };
                    return sortOrder === "desc" ? roleOrder[valueB] - roleOrder[valueA] : roleOrder[valueA] - roleOrder[valueB];
                }

                return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
            });
            console.log(sortedData);
            return sortedData;
        };

        setData(prevData => sortData(prevData));
    }, [sortOption, sortOrder]);

    return <>
        {img && <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="content" onClick={disableImagePopup}>
                {img && <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={imgUrl}></img>
                </Typography>}
            </Box>
        </Modal>}
        {document && <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="content" onClick={disableImagePopup}>
                {document && <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={imgUrl}></img>
                </Typography>}
            </Box>
        </Modal>}
        <div className='request-box'>
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
                    {data.length > 0 && data.map((item, index) => (
                        <tr
                            key={item.id}
                            className={index === activeRowIndex ? 'active-row' : ''}
                            onClick={() => handleRowClick(index)}
                        >
                            <td className="serial-no">{index + 1}</td>
                            <td className="role">{item.role}</td>
                            <td className="name">{item.username}</td>
                            <td className="email">{item.email}</td>
                            <td className='img-link' id={index} onClick={imagePopupHandler}>Image-Link</td>
                            <td className="timestamp">{getTime(item.createdAt)}<br></br>{getDate(item.createdAt)}</td>
                            <td className="link" id={index} onClick={documentHandler}>Attachment</td>
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
    </>
}
export default RequestBox