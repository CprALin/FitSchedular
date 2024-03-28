import TrainerPhoto from "../TrainerPage/TrainerPhoto";


function ShortTrainers({trainers}){
    
    return(
        <div className="short-trainers">
            <h1>Team of professional trainers</h1>

            <div className="trainer-containers">
                {trainers?.map((trainer) => (
                    <div key={trainer._id} className="trainer-container">
                        <TrainerPhoto trainerId={trainer._id} trainerPhoto={trainer.user.photo} trainerName={trainer.user.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShortTrainers;