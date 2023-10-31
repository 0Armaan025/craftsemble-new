import React, { useState, useEffect } from 'react';
import './messagesendingscreen.css';
import Navbar from '../components/navbar/Navbar';
import { Hanko } from '@teamhanko/hanko-elements';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { getFirestore, collection, setDoc, doc, deleteDoc, getDoc, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { newStorage } from '../../firebase_setup/firebase'; // Import your Firebase Storage setup
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MessageSendingScreen = () => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const db = getFirestore();

    // Reference to the "messages" collection
    const messagesCollectionRef = collection(db, 'messages');

    const getFillData = async () => {
        const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
        const hanko = new Hanko(hankoApi);

        const currentUser = hanko.user.getCurrent();
        const { id } = await currentUser;

        const userDocRef = doc(db, 'users', id);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        setName(userData.fullName);

    };

    useEffect(() => {
        getFillData();

        // Subscribe to changes in the "messages" collection
        const q = query(messagesCollectionRef, orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedMessages = [];
            querySnapshot.forEach((doc) => {
                const messageData = doc.data();
                updatedMessages.push({ id: doc.id, ...messageData });
            });
            setMessages(updatedMessages);
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }, []);

    const handleTextChange = (e) => {
        setMessage(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const sendMessage = async () => {
        if (message.trim() === '' && !image) return;

        const timestamp = new Date();

        // Use Hanko to get the current user's ID
        const hankoApi = "https://c0cf08ab-bf6f-467b-b53b-20d2ab6f77dc.hanko.io";
        const hanko = new Hanko(hankoApi);
        const currentUser = hanko.user.getCurrent();
        const { id } = await currentUser;

        // Create a new message document in Firestore
        try {
            const docRef = await addDoc(messagesCollectionRef, {
                senderId: id,
                senderName: name,
                text: message,
                timestamp,
            });

            // Upload the image if available
            if (image) {
                const imageRef = ref(newStorage, `/messageImages/${docRef.id}/${image.name}`);
                const uploadTask = uploadBytesResumable(imageRef, image);
                await uploadTask;

                const imageUrl = await getDownloadURL(imageRef);

                // Update the message document with the image URL
                await setDoc(doc(db, 'messages', docRef.id), {
                    senderId: id,
                    senderName: name,

                    timestamp,
                    image: imageUrl,
                });
            }

            setMessage('');
            setImage(null);
        } catch (error) {
            
        }
    };

    const deleteMessage = async (messageId) => {
        // Delete the message document in Firestore
        try {
            await deleteDoc(doc(db, 'messages', messageId));
        } catch (error) {
            
        }
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-screen">
                <div className="sidebar">
                    <Link to="/dashboard" className="sidebar-item" style={{ color: "white" }}>
                        Dashboard
                    </Link>
                    <Link to="/profile" className="sidebar-item" style={{ color: "white" }}>
                        Profile
                    </Link>
                    <Link to="/virtual-drawing-screen" className="sidebar-item" style={{ color: "white" }}>
                        Virtual Drawing
                    </Link>
                    <Link to="/send-message" className="sidebar-item" style={{ color: "white" }}>
                        Messages
                    </Link>
                    <div className="sidebar-item">Logout</div>
                </div>
                <div className="content">
                    <div className="messageContainer">
                        {messages.map((message) => (
                            <div key={message.id} className="message">
                                <div className="textAreaDiv">
                                    <h3>{message.senderName}</h3>
                                    {message.text}
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="Sent Image"
                                            height="100px"
                                            width="170px"
                                        />
                                    )}
                                    <button onClick={() => deleteMessage(message.id)} className="deleteButton">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="messageInput">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={handleTextChange}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button onClick={sendMessage} className="sendMessageBtn">
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MessageSendingScreen;
