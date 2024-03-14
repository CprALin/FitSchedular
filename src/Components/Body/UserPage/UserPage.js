import { useAuth } from "../../../Utils/AuthContext";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from "react";
import Button from "../../ReuseComp/Button";
import UserOptions from "./UserOptions";

function UserPage(){
    const { user } = useAuth();
    const [name , setName] = useState(`${user.data.user.name}`);
    const [email , setEmail] = useState(`${user.data.user.email}`);

    return(
       <div className="user-page">
           <UserOptions />

           <section className="user-profile-settings">
            
                <div className="settings-container">
                    <h1>Your Account Settings</h1>

                    <div className="image-settings">
                    <img src={require(`../../../Images/users/${user.data.user.photo}`)} alt="profile" />
                    <Form.Group controlId="formChoosePhoto" className="mb-3">
                        <Form.Label>Choose new photo</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    </div>

                    <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                    <Form.Control type="text" value={name} placeholder="Name"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                    <Form.Control type="email" value={email} placeholder="name@example.com" />
                    </FloatingLabel>


                    <Button padding={'10px 20px'}>Save settings</Button>
                </div>

                <div className="settings-container">
                    <h1>Password Change</h1>

                    <FloatingLabel controlId="floatingOldPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingNewPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>


                    <Button padding={'10px 20px'}>Change password</Button>
                </div>
                
           </section>
       </div>
    );
}


export default UserPage;