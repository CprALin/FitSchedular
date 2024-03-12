import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import Alert from 'react-bootstrap/Alert';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utils/AuthContext';

function LoginPage(){
    const { login } = useAuth();

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [alertMessage , setAlertMessage] = useState('');
    const [alertVariant , setAlertVariant] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {

        if( !email || !password)
        {
            setAlertVariant('warning');
            setAlertMessage(`Please fill the fileds !`);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }else{
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
                setAlertVariant('danger');
                setAlertMessage(`Login failed ! - Incorect email or password`);
                setShowAlert(true);
    
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
            }
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
                    <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible style={{ position: 'fixed', zIndex: 9999, top: '20px', left: '50%', transform: 'translateX(-50%)', width: '50%' }}>
                         <Alert.Heading>{alertMessage}</Alert.Heading>
                    </Alert>
                )}
            </div>
        </div>
       
    );
}

export default LoginPage;