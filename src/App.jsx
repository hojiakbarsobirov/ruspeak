import { useEffect } from 'react';
import './App.css'
// import BonusPage from './components/BonusPage'
// import InfoPage from './components/InfoPage'
// import Navbar from './components/Navbar'
import PremiumLandingPage from './components/PremiumLandingPage'
import AOS from "aos";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true,     // faqat bir marta animatsiya bo'lsin
    });
  }, []);

  return (
    <>
      {/* <Navbar/> */}
      <PremiumLandingPage/>
      {/* <InfoPage/> */}
      {/* <BonusPage/> */}
    </>
  )
}

export default App