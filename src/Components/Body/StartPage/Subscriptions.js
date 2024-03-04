import Button from "../../ReuseComp/Button";
import { FaCheck } from "react-icons/fa6";

function Subscriptions(){
    return(
        <div className="subscriptions" id="subs">
           
            <div className="subscription-intro">
                <h1 className="center">Packages</h1>
                <div className="sub-p">
                    <p>
                        Explore your fitness possibilities. 
                        Take a look at our packages designed
                        to meet your needs and start your journey.
                    </p>
                </div>
            </div>

            <div className="subscription-containers">

                <div className="subscription-container">
                     <h1>$60</h1>
                     <section className="plan-name">
                        <p>Starter Package</p>
                        <p>Billed annually</p>
                     </section>

                     <section className="plan-options">
                        <p><span><FaCheck /></span>Unlimited access to gym</p>
                        <p><span><FaCheck /></span>Facilities during regular hours</p>
                        <p><span><FaCheck /></span>Group fitness classes twice a week</p>
                        <p><span><FaCheck /></span>Access to general workout plans</p>
                        <p><span><FaCheck /></span>24/7 gym access</p>
                     </section>
                    

                     <div className="subscription-btn">
                         <Button padding={'10px 60px'} color={'#000000'}>Get started</Button>
                     </div>
                </div>

                <div className="subscription-container">
                     <h1>$84</h1>
                     <section className="plan-name">
                        <p>Starter Package</p>
                        <p>Billed annually</p>
                     </section>

                     <section className="plan-options">
                        <p><span><FaCheck /></span>Unlimited access to gym</p>
                        <p><span><FaCheck /></span>Facilities during regular hours</p>
                        <p><span><FaCheck /></span>Group fitness classes twice a week</p>
                        <p><span><FaCheck /></span>Access to general workout plans</p>
                        <p><span><FaCheck /></span>24/7 gym access</p>
                     </section>
                    

                     <div className="subscription-btn">
                         <Button padding={'10px 60px'} color={'#000000'}>Get started</Button>
                     </div>
                </div>

                <div className="subscription-container">
                     <h1>$120</h1>
                     <section className="plan-name">
                        <p>Starter Package</p>
                        <p>Billed annually</p>
                     </section>

                     <section className="plan-options">
                        <p><span><FaCheck /></span>Unlimited access to gym</p>
                        <p><span><FaCheck /></span>Facilities during regular hours</p>
                        <p><span><FaCheck /></span>Group fitness classes twice a week</p>
                        <p><span><FaCheck /></span>Access to general workout plans</p>
                        <p><span><FaCheck /></span>24/7 gym access</p>
                     </section>
                    

                     <div className="subscription-btn">
                         <Button padding={'10px 60px'} color={'#000000'}>Get started</Button>
                     </div>
                </div>

            </div>
        </div>
    );
}   

export default Subscriptions;