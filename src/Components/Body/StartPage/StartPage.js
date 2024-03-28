import AboutUs from "./AboutUs";
import ClassDiscover from "./ClassDiscover";
import HomePage from "./HomePage";
import ShortTrainers from "./ShortTrainers";
import Subscriptions from "./Subscriptions";
import { useEffect , useState } from "react";
import axios from 'axios';

function StartPage(){
    const [trainers , setTrainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers/allTrainers').then((result) => {
             setTrainers(result.data.data.data);   
        }).catch((err) => {
            console.log('Error fetching trainer data : ' , err);
        });
    },[]);

    return(
        <>
            <HomePage />
            <AboutUs />
            <ClassDiscover trainers={trainers}/>
            <Subscriptions />
            <ShortTrainers trainers={trainers}/>
        </>
    );
}

export default StartPage;