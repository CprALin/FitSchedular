import { useNavigate , useParams } from "react-router-dom";

function TrainerPage(){
    const {trainerId} = useParams();
    const navigate = useNavigate();

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