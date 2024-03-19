import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

function UserInfo(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userPhotoUrl , setUserPhotoUrl] = useState('');

    useEffect(() => {
        const getUserPhoto = async () => {
            const response = await axios.get(`http://localhost:8000/api/users/getUserPhoto/${user.data.user.photo}`);
            setUserPhotoUrl(response.data);
        }

        getUserPhoto();
    },[user,userPhotoUrl]);

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