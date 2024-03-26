import { useEffect , useState } from "react";
import axios from 'axios';
import TrainerPhoto from "../TrainerPage/TrainerPhoto";


function ShortTrainers(){
    const [trainers , setTrainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers/allTrainers').then((result) => {
             setTrainers(result.data.data.data);   
        }).catch((err) => {
            console.log('Error fetching trainer data : ' , err);
        });
    },[]);

    console.log(trainers);

    return(
        <div className="short-trainers">
            <h1>Team of professional trainers</h1>

            <div className="trainer-containers">
                {trainers?.map((trainer) => (
                    <div key={trainer._id} className="trainer-container">
                        <TrainerPhoto trainerId={trainer._id} trainerPhoto={trainer.user.photo} trainerName={trainer.user.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShortTrainers;