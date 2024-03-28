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

    window.scrollTo({ top : 0});

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
                <div className="trainer-info">
                     <TrainerPhoto trainerId={trainerData._id} trainerPhoto={trainerData.photo} trainerName={trainerData.name} />
                     <div className="trainer-data">
                        <h1>{trainerData.name}</h1> 
                        <p><span>Occupation :</span> {trainer.occupation}</p>
                        <p><span>Studies :</span> {trainer.studies}</p>
                     </div>
                </div>
               
               <div className="class-description">
                  <p id="class-title">{trainer.className}</p>
                  <p>{trainer.classDescription}</p>
               </div>

               <div className="trainer-images">
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

   return (
       <>
           {urls.map((url, index) => (
               <img id="trainer-photo" key={index} src={url} alt={trainerName} />
           ))}
       </>
   );
}

export default TrainerPage;