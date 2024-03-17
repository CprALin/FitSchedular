import { useAuth } from "../../../Utils/AuthContext";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from "react";
import Button from "../../ReuseComp/Button";
import UserOptions from "./UserOptions";
import axios from "axios";
import CustomAlert from "../../../Utils/CustomAlert";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";

function UserPage(){
    const navigate = useNavigate();
    const { user } = useAuth();
    const [name , setName] = useState(`${user.data.user.name}`);
    const [email , setEmail] = useState(`${user.data.user.email}`);
    const [ selectedFile , setSelectedFile ] = useState(`user-${user.data.user._id}-${Date.now()}.png`);

    const [alertMessage , setAlertMessage] = useState('');
    const [alertVariant , setAlertVariant] = useState('');
    const [showAlert , setShowAlert] = useState(false);

    let userPhotoUrl;
    try {
        // Încercăm să încărcăm imaginea utilizatorului
        userPhotoUrl = require(`../../../Images/users/${user.data.user.photo}`);
    } catch (error) {
        // Dacă apare o eroare, folosim imaginea implicită
        userPhotoUrl = require('../../../Images/users/default.png');
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpdateProfile = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('photo' , selectedFile);

        try{
           const response = await axios.patch(`http://localhost:8000/api/users/updateMe` , formData);

           user.data.user = response.data.data.user;           

           setAlertVariant('success');
           setAlertMessage('Profile update successfully !');
           setShowAlert(true);

           setTimeout(() => {
                setShowAlert(false);
                setEmail('');
                setName('');
                navigate("/");
           }, 1000);
        }catch(err){
            setAlertVariant('danger');
            setAlertMessage(`Profile update failed !`);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
    }

    return(
       <div className="user-page">
           <UserOptions />

           <section className="user-profile-settings">
            
                <div className="settings-container">
                    <h1>Your Account Settings</h1>

                    <div className="image-settings">
                    <img src={userPhotoUrl} alt="profile" />
                    <Form.Group controlId="formChoosePhoto" className="mb-3">
                        <Form.Label>Choose new photo</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange}/>
                    </Form.Group>
                    </div>

                    <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                    <Form.Control type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                    <Form.Control type="email" value={email} placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                    </FloatingLabel>


                    <Button padding={'10px 20px'} event={handleUpdateProfile}>Save settings</Button>
                </div>

                <div className="settings-container">
                    <h1>Password Change</h1>

                    <FloatingLabel controlId="floatingOldPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingNewPassword" label="New Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>


                    <Button padding={'10px 20px'}>Change password</Button>
                </div>
                
           </section>

           {showAlert && (
                    <CustomAlert variant={alertVariant} message={alertMessage}/>
            )}
       </div>
    );
}


export default UserPage;