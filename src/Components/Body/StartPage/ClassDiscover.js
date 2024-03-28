import Button from "../../ReuseComp/Button";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useAuth } from "../../../Utils/AuthContext";
import { useEffect , useState } from "react";
import axios from 'axios';

function ClassDiscover({trainers}){
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClassesPage = () => {
        navigate('/classes-page');
    }

    const handleLoginPage = () => {
        navigate('/login-page');
    }

    return (
        <div className="class-discover">
            <h1>Discover our classes</h1>
           
            <div className="class-containers">
                {trainers?.map((trainer) => (
                    <div key={trainer._id} className="class-container">
                        <h1>{trainer.className}</h1>
                        <TrainerPhotos navigate={navigate} trainerId={trainer._id} trainerPhotos={trainer.trainerPhotos[0]} trainerName={trainer.user.name} />
                    </div>
                ))}
            </div>
            
            <div className="discover-btn" style={user ? {display : 'flex'} : {display : 'none'}}>
               <Button event={handleClassesPage}><IoCreateOutline /> Appointment</Button>
            </div>

            <p style={user ? {display : 'none'} : {display : 'flex'}}>If you want to make an appointment ? <span style={{color : '#F05941' , paddingLeft : '2px' , textDecoration : 'underline' , cursor : 'pointer'}} onClick={handleLoginPage}> Login</span></p>
        </div>
    );
}

function TrainerPhotos({ navigate ,trainerId ,trainerPhotos, trainerName }) {
    const [url, setUrl] = useState('');

    const handleTrainerPage = () => {
        navigate(`trainer-page/${trainerId}`)
    }
 
    useEffect(() => {
        const fetchTrainerPhotos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/trainers/getTrainerPhotos/${trainerPhotos}`, { responseType: 'arraybuffer' });
 
                const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                setUrl(`data:image/png;base64,${base64Image}`);
            } catch (err) {
                console.log("Error fetching trainer photos:", err);
            }
        }
 
        fetchTrainerPhotos();
    }, [trainerPhotos, trainerName]);
 
    return (
        <img onClick={handleTrainerPage} id="trainer-photo" src={url} alt={trainerName} />
    );
 }
 

export default ClassDiscover;