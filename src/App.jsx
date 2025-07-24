import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Pattern from './components/Pattern';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Pattern />
      <Router>
        <LoaderController loading={loading} setLoading={setLoading} />
        <NavigationBar />
        <div className="min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-32 px-2 w-full">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/projects" element={<ProjetsEtExperience />} />
            <Route path="/services" element={<MesServices />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
      {loading && <Loader />}
    </>
  );
}

function LoaderController({ loading, setLoading }) {
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [location, setLoading]);
  return null;
}

// Pages à créer ci-dessous
function Accueil() {
  return <h1 className="text-3xl sm:text-5xl font-bold text-white text-center">Accueil</h1>;
}
function ProjetsEtExperience() {
  return <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">Projets & Expérience</h1>;
}
function MesServices() {
  return <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">Mes services</h1>;
}
function Contact() {
  return <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">Contact</h1>;
}

export default App
