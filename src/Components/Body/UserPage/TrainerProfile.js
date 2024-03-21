import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useState , useEffect } from "react";
import Button from '../../ReuseComp/Button';

function TrainerProfile({ user , setAlertVariant , setAlertMessage , setShowAlert , navigate , loading , setIsLoading}){

    const [ className , setClassName ] = useState('');
    const [ classDescription , setClassDescription ] = useState('');
    const [ occupation , setOccupation ] = useState('');
    const [ studies , setStudies ] = useState(''); 
    const [ selectedFiles , setSelectedFiles ] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const newFiles = Array.from(files);
        setSelectedFiles(newFiles);
    };    
    

    useEffect(() => {
        async function fetchData() { 
            const response = await axios.get(`http://localhost:8000/api/trainers/currentTrainer/${user.data.user._id}`); 
    
            /* console.log(response) */
            setClassName(response.data.data.trainer.className);
            setClassDescription(response.data.data.trainer.classDescription);
            setOccupation(response.data.data.trainer.occupation);
            setStudies(response.data.data.trainer.studies); 
        }

        fetchData();
    }, [user]);

    const handleUpdateTrainer = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('className' , className);
        formData.append('classDescription' , classDescription);
        formData.append('occupation' , occupation);
        formData.append('studies' , studies);

        selectedFiles.forEach((file) => {
            formData.append(`trainerPhotos`, file);
        });

        try 
        {
            setIsLoading(true);
            await axios.patch('http://localhost:8000/api/trainers/updateTrainer' , formData);

            setAlertVariant('success');
            setAlertMessage('Profile update successfully !');
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
                setAlertMessage(`Profile update failed ! ${err.response.data.message}`);
                setShowAlert(true);
            }

            setTimeout(() => {
                setShowAlert(false);
                setIsLoading(false);
            }, 2000);
        }


    }

    const imageCount = selectedFiles.length;

    return(
        <div className="settings-container">
            <h1>Trainer Specs</h1>

            <FloatingLabel controlId="floatingInputClassName" label="Class Name" className="mb-3">
                <Form.Control type="text" value={className} placeholder="Class Name" onChange={(e) => setClassName(e.target.value)}/>
            </FloatingLabel>

            <Form.Group className="mb-3" controlId="TextareaDescription">
                <Form.Label style={{color : 'gray' , background : '#FFF' , borderRadius : '5px' , padding : '0px 2px'}}>Description</Form.Label>
                <Form.Control as="textarea" value={classDescription} placeholder='Description' rows={3} style={{background : '#BE3144' , color : '#FFF' , border : 'none'}} onChange={(e) => setClassDescription(e.target.value)}/>
            </Form.Group>

            <FloatingLabel controlId="floatingInputTrainerOccupation" label="Occupation" className="mb-3">
                <Form.Control type="text" value={occupation} placeholder="Trainer Ocuppation" onChange={(e) => setOccupation(e.target.value)}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputTrainerStudies" label="Studies" className="mb-3">
                <Form.Control type="text" value={studies} placeholder="Trainer Studies" onChange={(e) => setStudies(e.target.value)}/>
            </FloatingLabel>
          
            <Form.Group controlId="formChooseTrainerPhotos" className="mb-3">
                <Form.Label>Choose new photos ({imageCount} images added)</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange}/>
            </Form.Group>

            {loading ? <Button padding={'10px 20px'}>Loading ...</Button> : <Button padding={'10px 20px'} event={handleUpdateTrainer}>Save settings</Button>}
        </div>
    );
}

export default TrainerProfile;