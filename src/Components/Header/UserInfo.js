import { useAuth } from "../../Utils/AuthContext";

function UserInfo(){
    const { user } = useAuth();

    return(
        <div className="nav-user-info">
            <img src={require(`../../Images/users/${user.data.user.photo}`)} alt='profile' style={{width : '30px' , height : '30px'}}/>
            <p>{user.data.user.name}</p>
        </div>
    );
}

export default UserInfo;    