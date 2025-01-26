import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { getAllMessages, postMessage } from "../../RTK/Thunks/MessageThunks";
import "../../CSS/WebAdminDashboard/Admin.css";
import "../../CSS/SignUp/SignUp.css";
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { getAllUsers } from "../../RTK/Thunks/UserThunk";

const socket = io.connect(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`);

function DAContact() {
  const [message, setMessage] = useState({
    senderId: null,
    recieverId: null,
    text: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);  
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { AllUsers, loading } = useSelector((state) => state.userStore);
  const { MessageItems } = useSelector((state) => state.MessageStore);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(getAllUsers());
      } catch (error) {
        setError("Failed to fetch users.");
        console.log("Fetch All Users Error", error);
      }
    };
    fetchUsers();
  }, [dispatch, currentUser]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }, []);

  const Admin = AllUsers.filter((user) => user.roleId?.name === "Admin");

  const handlecurrentUser = (user) => {
    
    console.log("currentUser",currentUser)
    setCurrentUser(user);
    socket.emit('join_Data', currentUser)

    setMessage({
      senderId: Admin[0]?._id,
      recieverId: user._id,
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (user) => {
    try {
      if (!Admin[0]?._id || !user?._id) {
        console.log("Error: senderId or recieverId is undefined");
        return;
      }
  
      // Ensure senderId and recieverId are set correctly
      const newMessage = {
        senderId: Admin[0]?._id, // Admin's ID as sender
        recieverId: user._id,     // Current user's ID as receiver
        text: message.text,       // The message text
      };
  
      // Emit the message through socket
      socket.emit('send_message', newMessage);
  
      // Reset the message text after sending
      setMessage({
        senderId: Admin[0]?._id,  // Admin's ID
        recieverId: user._id,      // Current user's ID
        text: '',                  // Clear the message text
      });
    } catch (error) {
      console.log("Error in submitting message:", error);
    }
  };
  console.log("receivedMessages",receivedMessages);
  

  

  useEffect(() => {
    // Listen for 'receive_message' from the server
    socket.on('receive_message', (data) => {
      console.log('Received message DAChat:', data);

      // Update the state with the received message while keeping previous messages
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup listener on component unmount to avoid memory leaks
    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    try {
      dispatch(getAllMessages());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentUser]);

  const filterAdminPost = MessageItems.filter((msg) =>
    msg.senderId === Admin[0]?._id && msg.recieverId === currentUser?._id
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    return formattedTime;
  };

  const sortedMessages = [...MessageItems, ...filterAdminPost]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .filter((value, index, self) =>
      index === self.findIndex((t) => (
        t._id === value._id
      ))
    );

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status" style={{ color: "white" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  const filteredUsers = AllUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid mt-5">
      <h1 className="Script" style={{ fontSize: "4rem" }}>----*----</h1>
      <div className='d-flex DAChatCon_'>
        <div className="container p-0 mx-2 h-100 text-center DAGalleryContainer d-flex flex-column align-items-center mb-2">
          {currentUser ? (
            <>
              <div className="d-flex justify-content-center align-items-center w-100">
                <div className="ChatDate mt-1 mb-5 mx-2">
                  <h2 className="Script lightOrange mb-1 mt-2">{`-*--  ${currentUser.name}  --*-`}</h2>
                </div>
              </div>

              {sortedMessages.map((msg, index) => (
  <div key={`${msg._id}-${index}`} className="container d-flex flex-column">
    {/* Check if the message is from the current user */}
    {currentUser?._id === msg.senderId && msg.recieverId === Admin[0]?._id ? (
      <div className="message p-3 my-1" id="person1">
        <p>{msg.text}</p>
        <span className="message-time">{formatDate(msg.createdAt)}</span>
      </div>
    ) : (
      currentUser?._id === msg.recieverId && msg.senderId === Admin[0]?._id ? (
        <div className="message p-3 my-1" id="person2">
          <p>{msg.text}</p>
          <span className="message-time">{formatDate(msg.createdAt)}</span>
        </div>
      ) : null
    )}
  </div>
))}

{/* Display all received messages */}
{receivedMessages.length > 0 && (
  <div className="container mt-4">
    <h5 className="Script lightOrange">Received Messages</h5>
    {receivedMessages.map((receivedMessage, index) => (
      <div key={`${receivedMessage._id}-${index}`} className="message p-3 my-1">
        <p>{receivedMessage.text}</p>
        <span className="message-time">{formatDate(receivedMessage.createdAt)}</span>
      </div>
    ))}
  </div>
)}


              <div className="container mt-4 ChatTextArea px-2 py-3 w-100 m-0 d-flex justify-content-center">
                <InsertEmoticonIcon className='icons mx-1 mt-2' id='ChatIcon' />
                <AttachFileIcon className='icons mx-1 mt-2' id='ChatIcon' />
                <textarea
                  className="w-100 py-2 mb-1 text-start p-4"
                  name="text"
                  placeholder="Write a Message...."
                  value={message.text}
                  onChange={handleChange}
                  rows={1.5}
                />
                {message.text === "" ? (
                  <MicIcon className='icons mx-1 mt-2' id='ChatIcon' />
                ) : (
                  <button className='button' onClick={()=> handleSubmit(currentUser)}>
                    <SendIcon className='icons mx-1 mt-2' id='sendIcon' />
                  </button>
                )}
              </div>
            </>
          ) : (
            <h1 className='Roman lightOrange'>Chat</h1>
          )}
        </div>

        <div className="container p-2 text-center DAGalleryContainer" style={{ width: "22rem", height: "24rem", overflow: "auto" }}>
          <h5 className="Roman lightOrange">USER</h5>
          <div className="d-flex align-items-center justify-content-center" style={{ position: 'relative' }}>
            <span>
              <SearchIcon className="icons p-1" style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
            </span>
            <input
              className="form-control py-2 mb-1 ms-2 text-start"
              type="text"
              placeholder="Search"
              style={{ paddingLeft: '30px' }} // adds space for the icon
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="d-flex flex-column mt-4">
            {!loading && filteredUsers && filteredUsers.map((user) => (
              <button className='button' onClick={() => handlecurrentUser(user)} key={user._id}>
                <div className="m-1 p-2 CUser d-flex align-items-center">
                  <div style={{
                    borderRadius: "50%",
                    backgroundImage: `url(${user.image})`, // Corrected background image syntax
                    backgroundColor: "white",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "4.2rem",
                    height: "3.5rem"
                  }} />
                  <div className='ms-2 text-start mb-2 w-100 me-1'>
                    <div className='d-flex justify-content-between w-100'>
                      <h6 className="ml-2 mb-1">{user.name}</h6>
                      <p className='mb-1 CUserPara'>Saturday</p>
                    </div>
                    <p className="ml-2 CUserPara mb-1">{'Spark Meaningful Conversations Anytime, Anywhere'.split(' ').slice(0, 3).join(' ')}</p>
                  </div>
                </div>
                <div className='w-100 mt-1' style={{ backgroundColor: "#ffffff40", height: "0.1px" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DAContact;
