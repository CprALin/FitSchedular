import { useAuth } from "../../../Utils/AuthContext";
import Form from 'react-bootstrap/Form';
import { useNavigate , Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { LuCalendarSearch } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { useState } from "react";
import Button from "../../ReuseComp/Button";

function UserPage(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [name , setName] = useState(`${user.data.user.name}`);
    const [email , setEmail] = useState(`${user.data.user.email}`);


    const handleHomePage = () => {
        navigate("/");
    }

    return(
       <div className="user-page">
           <h1 id="close" onClick={handleHomePage}>x</h1>
           
           <section className="user-options">
                <div className="option">
                    <IoMdSettings />
                    <Link to="/user-profile">Settings</Link>
                </div>
                <div className="option">
                    <LuCalendarSearch />
                    <Link>Appointments</Link>
                </div>
                <div className="option">
                    <FaRegStar />
                    <Link>My Reviews</Link>
                </div>
                <div className="option">
                    <FaCreditCard />
                    <Link>Billing</Link>
                </div>
           </section>

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
                
           </section>
       </div>
    );
}


export default UserPage;