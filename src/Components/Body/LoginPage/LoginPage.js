import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../../ReuseComp/Button';
import { Link } from 'react-router-dom';

function LoginPage(){

    window.scrollTo({ top : 0});

    return(
        <div className="login-page">
            <div className="login-form">
                <h1>Hello !</h1>
                <FloatingLabel controlId="floatingInput" label="Email Adress" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <div className='btn-register'>
                   <Button>Login</Button>  
                   <p>You don't have an account ? <Link>Register</Link></p>
                </div>
            </div>
        </div>
       
    );
}

export default LoginPage;