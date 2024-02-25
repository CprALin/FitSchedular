import image1 from "../../../Images/trainer1.jpg";
import image2 from "../../../Images/trainer2.jpg";
import image3 from "../../../Images/trainer3.jpg";

function ShortTrainers(){
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