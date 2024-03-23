import { useEffect , useState } from "react";
import axios from 'axios';

import image1 from "../../../Images/trainer1.jpg";
import image2 from "../../../Images/trainer2.jpg";
import image3 from "../../../Images/trainer3.jpg";

function ShortTrainers(){
    const [trainers , setTrainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers/allTrainers').then((result) => {
             setTrainers(result.data.data);   
        }).catch((err) => {
            console.err('Error fetching trainers data : ' , err);
        });
    },[]);

    console.log(trainers);

    return(
        <div className="short-trainers">
            <h1>Team of professional trainers</h1>

            <div className="trainer-containers">

                <div className="trainer-container">
                    <img src={image1} alt="trainer" />
                </div>

                <div className="trainer-container">
                    <img src={image2} alt="trainer" />
                </div>

                <div className="trainer-container">
                    <img src={image3} alt="trainer" />
                </div>

            </div>
        </div>
    );
}

export default ShortTrainers;