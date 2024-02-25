import { LuHeartHandshake } from "react-icons/lu";
import { SiFireship } from "react-icons/si";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function AboutUs(){
    return(
        <div className="about-us" id="about-us">
            <p id="first-p">Why us?</p>
            
            <div className="about-containers">
                <div className="about-container">
                    <IoMdCheckmarkCircleOutline />
                    <h2>Appointments</h2>
                    <p>It is easy to make an appointment, just a click away, we take care of the rest.</p>
                </div>

                <div className="about-container">
                    <SiFireship />
                    <h2>Motivation</h2>
                    <p>Unlock your full potential and embrace the power if fitness motivation with us.</p>
                </div>

                <div className="about-container">
                    <FaRegFaceSmileBeam />
                    <h2>Professional Staff</h2>
                    <p>Get to know our certified and friendly trainers who will guide you towards your desired goal.</p>
                </div>

                <div className="about-container">
                    <LuHeartHandshake />
                    <h2>Support</h2>
                    <p>We understand that the path to a healthier lifestyle can be challenging , we are here!</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;