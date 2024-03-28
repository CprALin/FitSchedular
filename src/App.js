import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Utils/AuthContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="App">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <AuthProvider>
              <Header />
              <Body />
              <Footer />
          </AuthProvider>
        </Router>  
       </LocalizationProvider>
    </div>
  );
}

export default App;
