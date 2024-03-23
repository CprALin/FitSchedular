import { useAuth } from "../../../Utils/AuthContext";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState , useEffect } from "react";
import Button from "../../ReuseComp/Button";
import UserOptions from "./User/UserOptions";
import axios from "axios";
import CustomAlert from "../../../Utils/CustomAlert";
import { useNavigate } from "react-router-dom";
import ConfirmAlert from "../../../Utils/ConfirmAlert";
import TrainerProfile from "./Trainer/TrainerProfile";
import { Buffer } from "buffer";
//import Cookies from "js-cookie";

function UserPage(){
    const [loading , setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { user , logout } = useAuth();
    const [name , setName] = useState(`${user.data.user.name}`);
    const [email , setEmail] = useState(`${user.data.user.email}`);
    const [ selectedFile , setSelectedFile ] = useState(`user-${user.data.user._id}-${Date.now()}.png`);

    const [alertMessage , setAlertMessage] = useState('');
    const [alertVariant , setAlertVariant] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [showConfirmAlert , setShowConfirmAlert] = useState(false);

    const isTrainer = user.data.user.role === 'trainer';

    const [userPhoto , setUserPhoto] = useState(null);

    useEffect(() => {
        const fetchUserPhoto = async () => {
            try{
              const response = await axios.get(`http://localhost:8000/api/users/getUserPhoto/${user.data.user.photo}`, { responseType: 'arraybuffer' });
              const base64Image = Buffer.from(response.data, 'binary').toString('base64');
              setUserPhoto(`data:image/png;base64,${base64Image}`);
            }catch(err){
              setUserPhoto(require('../../../Images/users/default.png'));
            }
        }

        fetchUserPhoto();
    }, [user.data.user.photo]);

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
           setIsLoading(true); 
           const response = await axios.patch(`http://localhost:8000/api/users/updateMe` , formData);

           user.data.user = response.data.data.user;           

           setAlertVariant('success');
           setAlertMessage('Profile update successfully !');
           setShowAlert(true);

           setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
                navigate("/");
           }, 1000);
        }catch(err){
            setAlertVariant('danger');
            setAlertMessage(`Profile update failed !`);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
            }, 1500);
        }
    }

    const [password , setPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        try{
            setIsLoading(true);
            await axios.patch('http://localhost:8000/api/users/updateMyPassword' , {
                passwordCurrent : password,
                password : newPassword,
                passwordConfirm : confirmPassword
            });

            setAlertVariant('success');
            setAlertMessage('Password update successfully !');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                logout();
                setIsLoading(false);
                navigate("/login-page");
            });

        }catch(err){
         
            if(err.response.data.status === "fail")
            {
                setAlertVariant('danger');
                setAlertMessage(`Password update failed ! ${err.response.data.message}`);
                setShowAlert(true);
            }

            setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
            }, 2000);
        }
    }

    const handleDeleteProfile = () => {
        setShowConfirmAlert(true);
    } 

    const handleOnNoClick = () => {
        setShowConfirmAlert(false);
    }

    const handleOnYesClick = async () => {
        try{
            await axios.delete('http://localhost:8000/api/users/deleteMe');
            
            setAlertVariant('success');
            setAlertMessage('Account was deleted successfully !');
            setShowAlert(true);


            setTimeout(() => {
                setShowAlert(false);
                logout();
                navigate("/login-page");
            });
        }catch(err){
            if(err.response.data.status === "fail")
            {
                setAlertVariant('danger');
                setAlertMessage(`Password update failed ! ${err.response.data.message}`);
                setShowAlert(true);
            }

            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }    
    }

    return(
       <div className="user-page">
           <UserOptions />

           <section className="user-profile-settings">
            
                <div className="settings-container">
                    <h1>Your Account Settings</h1>

                    <div className="image-settings">
                    <img src={userPhoto} alt="profile" />
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


                    {loading ?  <Button padding={'10px 20px'}>Loading ...</Button> : <Button padding={'10px 20px'} event={handleUpdateProfile}>Save settings</Button>}
                </div>

                <div className="settings-container">
                    <h1>Password Change</h1>

                    <FloatingLabel controlId="floatingOldPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingNewPassword" label="New Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" required onChange={(e) => setNewPassword(e.target.value)}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </FloatingLabel>


                    {loading ? <Button padding={'10px 20px'}>Loading ...</Button> : <Button padding={'10px 20px'} event={handleChangePassword}>Change password</Button>}
                </div>

                {isTrainer && (
                    <div className="settings-container">
                        <TrainerProfile user={user} setAlertMessage={setAlertMessage} setAlertVariant={setAlertVariant} setShowAlert={setShowAlert} navigate={navigate} loading={loading} setIsLoading={setIsLoading}/>
                    </div>
                )}

                <div className="settings-container">
                    <p id="delete-option">Do you want to delete your account ? <span onClick={handleDeleteProfile}>Delete Account</span></p>
                </div>
                
           </section>

           {showAlert && (
                <CustomAlert variant={alertVariant} message={alertMessage}/>
            )}

            {showConfirmAlert && (
                <ConfirmAlert message={"Delete Account"} compMessage={"Are you sure?"} show={showConfirmAlert} onClickNo={handleOnNoClick} onClickYes={handleOnYesClick}/>
            )}
       </div>
    );
}


export default UserPage;