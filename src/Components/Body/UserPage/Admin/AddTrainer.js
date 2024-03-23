import UserOptions from "../User/UserOptions";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from "../../../ReuseComp/Button";
import { useState } from "react";
import CustomAlert from "../../../../Utils/CustomAlert";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddTrainer(){
    const navigate = useNavigate();

    const [loading , setIsLoading] = useState(false);
    const [alertVariant , setAlertVariant] = useState('');
    const [alertMessage , setAlertMessage] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [trainerEmail , setTrainerEmail] = useState('');

    const handleAddTrainer = async () => {
        try{
            setIsLoading(true);

            await axios.post('http://localhost:8000/api/trainers/addTrainer' , {
                email : trainerEmail
            });

            setAlertVariant('success');
            setAlertMessage('Trainer added successfully !');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
                navigate("/");
            }, 1000);

        }catch(err){
            if(err.response.data.status === "fail")
            {
                setAlertVariant('danger');
                setAlertMessage(`Add trainer failed ! ${err.response.data.message}`);
                setShowAlert(true);
            }

            setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
            }, 2000);
        }
    }

    return(
        <div className="user-page">
             <UserOptions />  

             <section className="user-profile-settings">
                 <div className="settings-container">
                    <h1>Add Trainer</h1>

                    <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                       <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setTrainerEmail(e.target.value)}/>
                    </FloatingLabel> 

                    {loading ? <Button padding={'10px 20px'}>Loading ...</Button> : <Button padding={'10px 20px'} event={handleAddTrainer}>Add</Button>}
                 </div>   
             </section> 

             {showAlert && (
                <CustomAlert variant={alertVariant} message={alertMessage}/>
             )}
        </div>
    );
}

export default AddTrainer;