import AboutUs from "./AboutUs";
import ClassDiscover from "./ClassDiscover";
import HomePage from "./HomePage";
import ShortTrainers from "./ShortTrainers";
import Subscriptions from "./Subscriptions";

function StartPage(){
    return(
        <>
            <HomePage />
            <AboutUs />
            <ClassDiscover />
            <Subscriptions />
            <ShortTrainers />
        </>
    );
}

export default StartPage;