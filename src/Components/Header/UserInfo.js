import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from 'react-router-dom';

function UserInfo(){
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleProfilePage = () => {
        navigate("/user-profile");
    }

    return(
        <div className="nav-user-info" onClick={handleProfilePage}>
            <img src={require(`../../Images/users/${user.data.user.photo}`)} alt='profile' style={{width : '30px' , height : '30px'}}/>
            <p>{user.data.user.name}</p>
        </div>
    );
}

export default UserInfo;    