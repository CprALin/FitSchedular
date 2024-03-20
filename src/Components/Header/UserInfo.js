import { useEffect, useState } from "react";
import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from "buffer";

function UserInfo(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userPhoto , setUserPhoto] = useState(null);

    useEffect(() => {
        const fetchUserPhoto = async () => {
            try{
              const response = await axios.get(`http://localhost:8000/api/users/getUserPhoto/${user.data.user.photo}`, { responseType: 'arraybuffer' });
              const base64Image = Buffer.from(response.data, 'binary').toString('base64');
              setUserPhoto(`data:image/png;base64,${base64Image}`);
            }catch{
              setUserPhoto(require('../../Images/users/default.png'));
            }
        }

        fetchUserPhoto();
    }, [user]);

    const handleProfilePage = () => {
        navigate("/user-profile");
    }

    return(
        <div className="nav-user-info" onClick={handleProfilePage}>
            <img src={userPhoto} alt='profile' style={{width : '30px' , height : '30px'}}/>
            <p>{user.data.user.name}</p>
        </div>
    );
}

export default UserInfo;    