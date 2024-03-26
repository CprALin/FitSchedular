import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from 'axios';

function TrainerPage(){
    const {trainerId} = useParams();
    const navigate = useNavigate();
    const [trainer , setTrainer] = useState([]);

    console.log("Trainer id : " + trainerId);

    useEffect(() => {
       axios.get(`http://localhost:8000/api/trainers/${trainerId}`).then((result) => {
          setTrainer(result.data.data);
       }).catch((err) => {
          console.log('Error fetching trainer data : ' , err);
       });
    },[trainerId]); 

   console.log(trainer);    

    const handleHomePage = () => {
        navigate('/');
    }

    return(
       <div className="user-page">
            <h1 id="close" onClick={handleHomePage}>x</h1>
       </div>
    );
}

export default TrainerPage;