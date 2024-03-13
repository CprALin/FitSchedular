import { useAuth } from "../../../Utils/AuthContext";
import Form from 'react-bootstrap/Form';
import { useNavigate , Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { LuCalendarSearch } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";

function UserPage(){
    const { user } = useAuth();
    const navigate = useNavigate();


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
                    <Link>My Appointments</Link>
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
            
                 <h1>Your Account Settings</h1>

                 <div className="image-settings">
                    <img src={require(`../../../Images/users/${user.data.user.photo}`)} alt="profile" />
                    <Form.Group controlId="formChoosePhoto" className="mb-3">
                        <Form.Label>Choose new photo</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                 </div>

                <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Name"/>
                </FloatingLabel>
           </section>
       </div>
    );
}


export default UserPage;