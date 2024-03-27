import { Buffer } from "buffer";
import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


function TrainerPhoto({trainerId , trainerPhoto , trainerName}){
    const [url , setUrl] = useState('');

    useEffect(() => {
        const fetchTrainerPhoto = async () => {
            try
            {
                const response = await axios.get(`http://localhost:8000/api/trainers/getTrainerPhoto/${trainerPhoto}`, { responseType: 'arraybuffer' });
                const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                setUrl(`data:image/png;base64,${base64Image}`);
            }catch(err){
                setUrl(require('../../../Images/users/default.png'));
            }
        }

        fetchTrainerPhoto();
    }, [trainerId , trainerPhoto , trainerName]);

    return(
        <Link to={`trainer-page/${trainerId}`}>
             <img id="trainer-profile-img" src={url} alt={trainerName}/> 
        </Link>
    );
}

export default TrainerPhoto;