import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function LoginPage(){

    window.scrollTo({ top : 0});

    return(
        <div className="login-page">
            <div className="login-form">
                <h1>Login</h1>
                <FloatingLabel controlId="floatingInput" label="Email Adress" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>  
            </div>
        </div>
       
    );
}

export default LoginPage;