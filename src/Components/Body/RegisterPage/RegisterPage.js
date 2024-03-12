import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import { Link } from 'react-router-dom';

function RegisterPage(){

    window.scrollTo({ top : 0});

    return(
        <div className="login-page">
            <div className="login-form">
                <h1>Hello !</h1>
                <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputEmail" label="Email Adress" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <div className='btn-register'>
                   <Button>Register</Button>  
                   <p>You have an account ? <Link to="/login-page">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;