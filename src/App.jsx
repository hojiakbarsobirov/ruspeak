import { useEffect } from 'react';
import './App.css'
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
      <PremiumLandingPage/>
    </>
  )
}

export default App