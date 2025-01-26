import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getAllMessages, postMessage } from "../../RTK/Thunks/MessageThunks";

// Socket connection
const socket = io.connect(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`);

// CSS files
import "../../CSS/Home/Welcome.css";
import "../../CSS/About/About.css";
import "../../CSS/WebAdminDashboard/Admin.css";

// Icons
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

function UserChat({ AImage, Admin, User }) {
  const [receivedMessages, setReceivedMessages] = useState([]);  
  const [show, setShow] = useState(false);
  const target = useRef(null);
    const [message, setMessage] = useState({
      senderId: null,
      recieverId: null,
      text: '',
    });
  const dispatch = useDispatch();
  

  const {MessageItems} = useSelector((state)=> state.MessageStore)

  // Fetch messages from the server on mount

  useEffect(() => {
    try {
      dispatch(getAllMessages());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);



  const handleSubmit = async () => {
    try {
      if (!Admin?._id || !User?._id) {
        console.log("Error: senderId or recieverId is undefined");
        return;
      }
  
      // Ensure senderId and recieverId are set correctly
      const newMessage = {
        senderId: Admin?._id, // Admin's ID as sender
        recieverId: User._id,     // Current user's ID as receiver
        text: message.text,       // The message text
      };
  
      // Emit the message through socket
      socket.emit('send_message', newMessage);
  
      // Reset the message text after sending
      setMessage({
        senderId: Admin?._id,  // Admin's ID
        recieverId: User._id,      // Current user's ID
        text: '',                  // Clear the message text
      });
    } catch (error) {
      console.log("Error in submitting message:", error);
    }
  };


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


  
  // filterAdminPost
  const filterAdminPost = MessageItems && MessageItems.filter((msg) =>
    msg.senderId === Admin?._id && msg.recieverId === User?._id
  );


// Format time to a readable format with AM/PM
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Format the time as hh:mm AM/PM
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

  return formattedTime;
};


  // Sort messages based on createdAt (timestamp)
  const sortedMessages = [...MessageItems, ...filterAdminPost]
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  .filter((value, index, self) => 
    index === self.findIndex((t) => (
      t._id === value._id
    ))
    
  );

  console.log("filterAdminPost",filterAdminPost);
  

  
  

  

  return (
    <>
      <button className="button UserChatBTN text-center" ref={target} onClick={() => setShow(!show)}>
        <div id="UserChatImg" style={{ backgroundImage: `url(${AImage})` }} />
        <p className="lightOrange Roman">{Admin?.name}</p>
      </button>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            <div className="UChatContainer w-100">
              <div className="Uchat1 p-2 d-flex flex-column align-items-center">
                <strong className="mt-1" style={{ fontSize: "1.5rem" }}>
                  {`HI ${User?.name}✌️`}
                </strong>
              </div>

              {/* Chat2 */}
              <div className="Uchat2 my-1 pt-4 d-flex flex-column align-items-start">
                
                              {/* Chat messages */}
              {sortedMessages.map((msg, index) => (
  <div key={`${msg._id}-${index}`} className="container d-flex flex-column">
    {User?._id === msg.recieverId && msg.senderId === Admin?._id ? (
      <div className="message p-3 my-1 ms-1" id="person1">
        <p>{msg.text}</p>
        <span className="message-time">{formatDate(msg.createdAt)}</span>
      </div>
    ) : (
      <div className="message p-3 my-1 me-1" id="person2">
        <p>{msg.text}</p>
        <span className="message-time">{formatDate(msg.createdAt)}</span>
      </div>
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

              </div>

              {/* Chat Text Area */}
              <div className="ChatTextArea px-2 py-3 w-100 m-0 d-flex justify-content-center" style={{ borderRadius: "40px" }}>
                <InsertEmoticonIcon className="icons mx-1 mt-2" id="ChatIcon" />
                <AttachFileIcon className="icons mx-1 mt-2" id="ChatIcon" />

                <textarea
                  className="w-100 py-2 mb-1 text-start p-4"
                  name="text"
                  placeholder="Write a Message...."
                  rows={1.5}
                  value={message.text}
                  onChange={(event) => setMessage({
                      text:event.target.value
                    })}
                />

                {/* Conditionally render either the SendIcon or MicIcon based on the textarea content */}
                {message.text === "" ? (
                  <MicIcon className="icons mx-1 mt-2" id="ChatIcon" />
                ) : (
                  <button className="button" onClick={handleSubmit}>
                    <SendIcon className="icons mx-1 mt-2" id="sendIcon" />
                  </button>
                )}
              </div>
            </div>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default UserChat;
