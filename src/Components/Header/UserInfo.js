import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from 'react-router-dom';

function UserInfo(){
    const { user } = useAuth();
    const navigate = useNavigate();

    let userPhotoUrl;
    try {
        // Încercăm să încărcăm imaginea utilizatorului
        userPhotoUrl = require(`../../Images/users/${user.data.user.photo}`);
    } catch (error) {
        // Dacă apare o eroare, folosim imaginea implicită
        userPhotoUrl = require('../../Images/users/default.png');
    }

    const handleProfilePage = () => {
        navigate("/user-profile");
    }

    return(
        <div className="nav-user-info" onClick={handleProfilePage}>
            <img src={userPhotoUrl} alt='profile' style={{width : '30px' , height : '30px'}}/>
            <p>{user.data.user.name}</p>
        </div>
    );
}

export default UserInfo;    