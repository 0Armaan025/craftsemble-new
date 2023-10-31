import React, { useState, useEffect } from 'react';
import './profilescreen.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { Hanko } from '@teamhanko/hanko-elements';
import BADGE2 from '../../assets/badge2.png';
import BADGE3 from '../../assets/badge3.png';
import BADGE1 from '../../assets/badge.png';
import Footer from '../components/footer/Footer';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firebase Firestore functions

const ProfileScreen = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [profileImageUrl , setProfileImageUrl] = useState('');
    const [editableFields, setEditableFields] = useState({
        username: false,
        name: false,
        age: false,
        craftSpeciality: false,
        country: false,
        link: false,
    });
    const [fieldValues, setFieldValues] = useState({
        username: '',
        name: '',
        age: '',
        craftSpeciality: '',
        country: '',
        stars: 0,
        link: '',
        verified: true, // Assuming verified is a static value
    });

    const handleImageChange = (e) => {
        alert("in beta!");
    };

    const handleEditClick = (field) => {
        setEditableFields({ ...editableFields, [field]: true });
    };

    const handleFieldChange = (field, value) => {
        setFieldValues({ ...fieldValues, [field]: value });
    };

    const handleFieldBlur = (field) => {
        setEditableFields({ ...editableFields, [field]: false });
    };

    useEffect(() => {
        // Use Hanko to get the user ID
        const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
        const hanko = new Hanko(hankoApi);

        const fetchData = async () => {
            // Get the user ID
            const currentUser = hanko.user.getCurrent();
            const { id } = await currentUser;

            
            const db = getFirestore();
            const userDocRef = doc(db, 'users', id);

            try {
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setProfileImageUrl(userData.profileImageUrl);
                    
                    setFieldValues({
                        username: userData.username,
                        stars: userData.stars,
                        name: userData.fullName,
                        age: userData.age,
                        craftSpeciality: userData.craftSpecialty,
                        country: userData.country,
                        link: userData.socialMediaLinks,
                        verified: userData.verified, 
                    });
                    
                }
            } catch (error) {
                
            }
        };

        fetchData();
    }, []);

    const handleUpdateProfile = async () => {
        // Use Hanko to get the user ID
        const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
        const hanko = new Hanko(hankoApi);
        const currentUser = hanko.user.getCurrent();
        const { id } = await currentUser;

        // Access the Firestore collection and document
        const db = getFirestore();
        const userDocRef = doc(db, 'users', id);

        try {
            // Update the Firestore document with the new user data
            await setDoc(userDocRef, {
                username: fieldValues.username,
                fullName: fieldValues.name,
                age: fieldValues.age,
                craftSpecialty: fieldValues.craftSpeciality,
                country: fieldValues.country,
                socialMediaLinks: fieldValues.link,
                verified: fieldValues.verified,
                // You can update other fields as needed
            });

            
        } catch (error) {
            
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile-screen">
                <div className="sidebar">
                    <div className="sidebar-item"><Link to="/dashboard" className='sidebar-item' style={{color: "white", margin: "0px", padding: "0px"}}>Dashboard</Link></div>
                    <Link to='/profile' className='sidebar-item' style={{color: "white",padding: "0px", margin: "0px"}}><div className="sidebar-item">Profile</div></Link>
                    <Link to='/virtual-drawing-screen' className='sidebar-item' style={{color: "white",padding: "0px", margin: "0px"}}><div className="sidebar-item">Virtual Drawing</div></Link>
                    <div className="sidebar-item" ><Link to='/send-message' style={{color: "white", margin: "0px", padding: "0px", background: "none"}}>Messages</Link></div>
                    <div className="sidebar-item">Logout</div>
                </div>
                <div className="content">
                    <div style={{ color: "black" }}>
                        <h2 className="profileHeading" style={{ color: "white" }}>⭐Welcome, {fieldValues.name}⭐</h2>
                        <br/>
                        <h3 style={{ fontSize: "42px", marginLeft: "160px", marginTop: "10px", fontFamily: "sans-serif", fontWeight: "bold" , color: "white"}}> Your Badges🚀 (beta)</h3>

                        <div className="badgesContainer">

                            <img src={BADGE1} height="175px" width="179px" />
                            <img src={BADGE2} height="175px" width="175px" />
                            <img src={BADGE3} height="175px" width="175px" />

                        </div>

                        <h3 style={{ fontSize: "42px", marginLeft: "160px", marginTop: "10px", fontFamily: "sans-serif", fontWeight: "bold", color: "white" }}> Your Stars⭐ (beta)</h3>
                        <div className="starsContainer">
                            <h4 style={{ marginLeft: "250px", fontSize: "42px", fontWeight: "bold",color: "white"}}> {fieldValues.stars} ⭐</h4>
                        </div>
                    </div>
                    <br />
                    <div className="profileDetails">
                        <div className="profilePic">
                            {profileImageUrl!='' ? (
                                <img src={profileImageUrl} alt="Profile Pic" className="profilePicImg" height="350px" width="350px" />
                            ) : (
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile Pic" className="profilePicImg" height="350px" width="350px" />
                            )}
                            <br />
                            <br />
                            <label htmlFor="changeProfilePicture" className="changeProfilePictureLabel" style={{color: "red"}}>
                                Change Profile Picture (beta)
                            </label>
                            <input
                                type="file"
                                className="changeProfilePicture"
                                id="changeProfilePicture"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="profileInfo">
                            <br />
                            <div className="profileInfoItem">
                                <span className="infoLabel">Name:</span>
                                {editableFields.name ? (
                                    <input
                                        type="text"
                                        value={fieldValues.name}
                                        onChange={(e) => handleFieldChange('name', e.target.value)}
                                        onBlur={() => handleFieldBlur('name')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('name');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('name')}>{fieldValues.name}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('username')} />
                            </div>
                            <div className="profileInfoItem">
                                <span className="infoLabel">Username:</span>
                                {editableFields.username ? (
                                    <input
                                        type="text"
                                        value={fieldValues.username}
                                        onChange={(e) => handleFieldChange('username', e.target.value)}
                                        onBlur={() => handleFieldBlur('username')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('username');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('username')}>{fieldValues.username}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('username')} />
                            </div>
                            <div className="profileInfoItem">
                                <span className="infoLabel">Age:</span>
                                {editableFields.age ? (
                                    <input
                                        type="text"
                                        value={fieldValues.age}
                                        onChange={(e) => handleFieldChange('age', e.target.value)}
                                        onBlur={() => handleFieldBlur('age')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('age');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('age')}>{fieldValues.age}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('age')} />
                            </div>
                            <div className="profileInfoItem">
                                <span className="infoLabel">Craft Speciality:</span>
                                {editableFields.craftSpeciality ? (
                                    <input
                                        type="text"
                                        value={fieldValues.craftSpeciality}
                                        onChange={(e) => handleFieldChange('craftSpeciality', e.target.value)}
                                        onBlur={() => handleFieldBlur('craftSpeciality')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('craftSpeciality');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('craftSpeciality')}>{fieldValues.craftSpeciality}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('craftSpeciality')} />
                            </div>
                            <div className="profileInfoItem">
                                <span className="infoLabel">Country:</span>
                                {editableFields.country ? (
                                    <input
                                        type="text"
                                        value={fieldValues.country}
                                        onChange={(e) => handleFieldChange('country', e.target.value)}
                                        onBlur={() => handleFieldBlur('country')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('country');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('country')}>{fieldValues.country}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('country')} />
                            </div>
                            <div className="profileInfoItem">
                                <span className="infoLabel">Link here:</span>
                                {editableFields.link ? (
                                    <input
                                        type="text"
                                        value={fieldValues.link}
                                        onChange={(e) => handleFieldChange('link', e.target.value)}
                                        onBlur={() => handleFieldBlur('link')}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFieldBlur('link');
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="infoValue" onClick={() => handleEditClick('link')}>{fieldValues.link}</span>
                                )}
                                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Edit" className="editIcon" onClick={() => handleEditClick('link')} />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <button className="updateProfileButton" onClick={handleUpdateProfile}>Update Profile</button>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProfileScreen;
