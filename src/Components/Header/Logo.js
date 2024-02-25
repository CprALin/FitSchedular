import { GiWeightLiftingUp } from "react-icons/gi";

function Logo({fontSize , textSize}){

    function handleDivClick() {
        const element = document.getElementById('home-page');
        if (element) {
          element.scrollIntoView();
        }
    }
    
    const logoStyle = {
        div : {
            display : 'flex',
            margin : '5px 30px',
            cursor : 'pointer'
        },
        logo : {
            margin : '4px 2px',
            fontSize : fontSize || '40px'
        },
        p : {
            fontSize : textSize || '17px',
            fontWeight : 'bolder'
        }
    };

    return(
        <div style={logoStyle.div} onClick={handleDivClick}>
            <GiWeightLiftingUp style={logoStyle.logo}/>
            <p style={logoStyle.p}>FitSchedular</p>
        </div>
    );
}

export default Logo;