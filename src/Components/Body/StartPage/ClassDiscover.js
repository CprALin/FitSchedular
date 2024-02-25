import Button from "../../ReuseComp/Button";
import image1 from "../../../Images/crossfit-photo.jpg";
import image2 from "../../../Images/fit-photo.jpg";
import image3 from "../../../Images/hit-photo.jpg";

function ClassDiscover(){
    return (
        <div className="class-discover">
            <h1>Discover our classes</h1>
           
            <div className="class-containers">
                <div className="class-container">
                    <h1>Crossfit</h1>
                    <img src={image1} alt="crossfit"/>
                </div>

                <div className="class-container">
                    <h1>Fit</h1>
                    <img src={image2} alt="crossfit"/>
                </div>

                <div className="class-container">
                    <h1>Hit</h1>
                    <img src={image3} alt="crossfit"/>
                </div>
            </div>
            
            <div className="discover-btn">
               <Button>View All</Button>
            </div>
        </div>
    );
}

export default ClassDiscover;