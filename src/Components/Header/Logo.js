import { GiWeightLiftingUp } from "react-icons/gi";

function Logo({fontSize}){
    
    const logoStyle = {
        div : {
            display : 'flex',
            margin : '5px 30px'
        },
        logo : {
            margin : '4px 2px',
            fontSize : fontSize || '40px'
        },
        p : {
            fontSize : '17px',
            fontWeight : 'bolder'
        }
    };

    return(
        <div style={logoStyle.div}>
            <GiWeightLiftingUp style={logoStyle.logo}/>
            <p style={logoStyle.p}>FitSchedular</p>
        </div>
    );
}

export default Logo;