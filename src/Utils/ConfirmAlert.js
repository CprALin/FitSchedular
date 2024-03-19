import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function ConfirmAlert({message,compMessage,show,onClickYes,onClickNo}) {
  

  return (
    <Alert show={show} variant="danger" style={{ position: 'fixed', zIndex: 9999, top: '20px', left: '50%', transform: 'translateX(-50%)', width: '50%' , opacity : '0.7'}}>
      <Alert.Heading>{message}</Alert.Heading>
      <p>
         {compMessage}
      </p>
      <hr />
      <div className="d-flex justify-content-center">
         <Button id="bootstrap-btn" onClick={onClickYes} variant="outline-success" style={{ margin : '10px 50px' , borderColor : 'red'}}>
            Yes
         </Button>
         <Button id="bootstrap-btn" onClick={onClickNo} variant="outline-success" style={{ margin : '10px 50px' , borderColor : 'red'}}>
            No
         </Button>
      </div>
    </Alert>
  );
}

export default ConfirmAlert;