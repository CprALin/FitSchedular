import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Utils/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Body />
          <Footer />
        </AuthProvider>
      </Router>  
    </div>
  );
}

export default App;
