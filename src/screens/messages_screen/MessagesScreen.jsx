import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './messagesscreen.css';
import Message from './Message';
import { Hanko } from '@teamhanko/hanko-elements';
import Footer from '../components/footer/Footer';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'; // Import Storage functions

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(''); // Initialize with user's name
  const [messageText, setMessageText] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userId, setuserId] = useState(null);

  useEffect(() => {
    // Initialize Firestore
    const db = getFirestore();
    const messagesCollection = collection(db, 'messages');

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(messagesCollection);
        const messageData = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messageData);
      } catch (error) {
        
      }
    }

    
    const usersCollection = collection(db, 'users'); 
    
   
    const userDocRef = collection(usersCollection, userId);

    getDownloadURL(userDocRef).then((url) => {
      setUserPhoto(url);
    });


    const getUserId = async () => {
      const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
      const hanko = new Hanko(hankoApi);

      const currentUser = hanko.user.getCurrent();
      const { id } = await currentUser;
      setuserId(id);
    }


    // Fetch user's name from Firestore
    const fetchData = async () => {
      const doc = await getDocs(userDocRef);
      if (doc.exists()) {
        setName(doc.data().name); // Set the user's name
      }
    };

    fetchData();
    fetchMessages();
    getUserId();
  }, []);

  const addMessage = async () => {
    const db = getFirestore();
    const messagesCollection = collection(db, 'messages');

    try {
      await addDoc(messagesCollection, {
        name: name,
        time: serverTimestamp(),
        message: messageText,
      });
      setMessageText(''); // Clear the message input
    } catch (error) {
      
    }
  };


  

  return (
    <>
      <Navbar />
      <div className="dashboard-screen">
        <div className="content">
          <center>
            <h1 className="messageHeading" style={{ color: 'black' }}>
              Messages sent to you by different people! 💬
            </h1>
            <div className="user-profile">
              <img
                src={userPhoto}
                alt="User Profile"
                className="user-photo"
              />
              <input
                type="file"
                accept="image/*"
                
                className="user-photo-upload"
              />
              <div className="user-name">
                <p>User Name: {name}</p>
              </div>
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button onClick={addMessage}>Send</button>
            </div>
            {messages.map((message, index) => (
              <div key={index}>
                <Message message={message} />
                <br />
              </div>
            ))}
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MessagesScreen;
