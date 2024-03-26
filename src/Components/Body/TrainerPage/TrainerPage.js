import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from 'axios';
import TrainerPhoto from "./TrainerPhoto";

function TrainerPage(){
    const {trainerId} = useParams();
    const navigate = useNavigate();
    const [trainer , setTrainer] = useState([]);
    const [trainerData , setTrainerData] = useState([]);

    useEffect( () => {
      axios.get(`http://localhost:8000/api/trainers/${trainerId}`).then((result) => {
          setTrainer(result.data.data.doc);
          setTrainerData(result.data.data.doc.user);
       }).catch((err) => {
          console.log('Error fetching trainer data : ' , err);
       });
    },[trainerId]); 

    const handleHomePage = () => {
        navigate('/');
    }

    return(
       <div className="user-page">
            <h1 id="close" onClick={handleHomePage}>x</h1>

            <div className="trainer-page">
               <TrainerPhoto trainerId={trainerData._id} trainerPhoto={trainerData.photo} trainerName={trainerData.name} />
               
               <div className="trainer-data">
                  <h1>{trainerData.name}</h1> 
                  <p>Class name : {trainer.className}</p>
                  <p>Class description : {trainer.classDescription}</p>
                  <p>Occupation : {trainer.occupation}</p>
                  <p>Studies : {trainer.studies}</p>
               </div>
               
            </div>
       </div>
    );
}

export default TrainerPage;