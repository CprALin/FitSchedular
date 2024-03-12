import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import { Link } from 'react-router-dom';

function RegisterPage(){
    return(
        <div className="register-page">
            <div className="register-form">
                <h2>Hello !</h2>
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
                   <p>You have an account ? <Link>Login</Link></p>
                </div>
            </div>
        </div>
    );
}