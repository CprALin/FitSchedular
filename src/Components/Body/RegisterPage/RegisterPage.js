import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import CustomAlert from '../../../Utils/CustomAlert';
import { useAuth } from '../../../Utils/AuthContext';

function RegisterPage(){
    const { login } = useAuth();

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [alertMessage , setAlertMessage] = useState('');
    const [alertVariant , setAlertVariant] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            const response = await axios.post('http://localhost:8000/api/users/singup', {
                name : name,
                email : email,
                password : password,
                passwordConfirm : confirmPassword
            });

            login(response.data);

            setAlertVariant('success');
            setAlertMessage('Registered successfully !');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate("/");
            }, 1000);
            
        }catch(err){
            if(err.response.data.status === "fail")
            {
                setAlertVariant('danger');
                setAlertMessage(`Register failed ! - ${err.response.data.message}`);
                setShowAlert(true);
            }

            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
    }

    window.scrollTo({ top : 0});

    return(
        <div className="login-page">
            <div className="login-form">
                <h1>Hello !</h1>
                <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </FloatingLabel>
                <div className='btn-register'>
                   <Button event={handleRegister}>Register</Button>  
                   <p>You have an account ? <Link to="/login-page">Login</Link></p>
                </div>

                {showAlert && (
                    <CustomAlert variant={alertVariant} message={alertMessage} />
                )}
            </div>
        </div>
    );
}

export default RegisterPage;