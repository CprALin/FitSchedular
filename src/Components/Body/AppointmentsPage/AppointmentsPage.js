import { useNavigate } from "react-router-dom";

function AppointmentsPage(){
    const navigate = useNavigate();

    const handleHomePage = () => {
        navigate("/");
    }

    return(
        <div className="user-page">
            <h1 id="close" onClick={handleHomePage}>x</h1>
                
        </div> 
    );
}

export default AppointmentsPage;