import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from 'axios';
import TrainerPhoto from "./TrainerPhoto";
import { Buffer } from "buffer";

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

    console.log(trainer)

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
                  <TrainerPhotos trainerPhotos={trainer.trainerPhotos} trainerName={trainerData.name} />
               </div>
               
            </div>
       </div>
    );
}

function TrainerPhotos({trainerPhotos, trainerName }) {
   const [urls, setUrls] = useState([]);

   useEffect(() => {
       const fetchTrainerPhotos = async () => {
           try {
               const responses = await Promise.all(
                   trainerPhotos.map(photo =>
                       axios.get(`http://localhost:8000/api/trainers/getTrainerPhotos/${photo}`, { responseType: 'arraybuffer' })
                   )
               );

               const base64Images = responses.map(response => Buffer.from(response.data, 'binary').toString('base64'));
               setUrls(base64Images.map(base64Image => `data:image/png;base64,${base64Image}`));
           } catch (err) {
               console.log("Error fetching trainer photos:", err);
           }
       }

       fetchTrainerPhotos();
   }, [trainerPhotos, trainerName]);

   console.log(trainerPhotos)

   return (
       <>
           {urls.map((url, index) => (
               <img key={index} src={url} alt={trainerName} />
           ))}
       </>
   );
}

export default TrainerPage;