import { useEffect , useState } from "react";
import axios from 'axios';
import { Buffer } from "buffer";
import { Link } from "react-router-dom";


function ShortTrainers(){
    const [trainers , setTrainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers/allTrainers').then((result) => {
             setTrainers(result.data.data.data);   
        }).catch((err) => {
            console.err('Error fetching trainers data : ' , err);
        });
    },[]);

    /* console.log(trainers); */

    return(
        <div className="short-trainers">
            <h1>Team of professional trainers</h1>

            <div className="trainer-containers">
                {trainers?.map((trainer) => (
                    <div key={trainer._id} className="trainer-container">
                        <TrainerPhoto trainer={trainer} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrainerPhoto({trainer}){
    const [url , setUrl] = useState('');

    useEffect(() => {
        const fetchTrainerPhoto = async () => {
            try
            {
                const response = await axios.get(`http://localhost:8000/api/trainers/getTrainerPhoto/${trainer.user.photo}`, { responseType: 'arraybuffer' });
                const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                setUrl(`data:image/png;base64,${base64Image}`);
            }catch(err){
                setUrl(require('../../../Images/users/default.png'));
            }
        }

        fetchTrainerPhoto();
    }, [trainer]);

    return(
        <Link to={`trainer-page/${trainer._id}`}>
             <img src={url} alt={trainer.user.name}/> 
        </Link>
    );
}

export default ShortTrainers;