import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utils/AuthContext';
import CustomAlert from '../../../Utils/CustomAlert';

function LoginPage(){
    const { login } = useAuth();

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [alertMessage , setAlertMessage] = useState('');
    const [alertVariant , setAlertVariant] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {

            try{
                const response = await axios.post('http://localhost:8000/api/users/login' , { 
                    email : email, 
                    password : password
                });

                login(response.data);

                setAlertVariant('success');
                setAlertMessage('Login successfully !');
                setShowAlert(true);
    
                setTimeout(() => {
                    setShowAlert(false);
                    setEmail('');
                    setPassword('');
                    navigate("/");
                }, 1000);
    
            }catch(err){
                if(err.response.data.status === "fail")
                {
                    setAlertVariant('danger');
                    setAlertMessage(`Login failed ! - ${err.response.data.message}`);
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
                <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                </FloatingLabel>

                <div className='btn-register'>
                   <Button event={handleLogin}>Login</Button>  
                   <p>You don't have an account ? <Link to="/register-page">Register</Link></p>
                </div>

                {showAlert && (
                    <CustomAlert variant={alertVariant} message={alertMessage}/>
                )}
            </div>
        </div>
       
    );
}

export default LoginPage;