// src/pages/LandingPage.tsx
import { Hero } from '../components/Hero/Hero';
import { Solucoes } from '../components/Solucoes/Solucoes';
import { Templates } from "../components/Templates/Templates";
import { Recursos } from '../components/Recursos/Recursos';
import { Precos } from '../components/Precos/Precos';
import { Footer } from '../components/Footer/Footer';

export const LandingPage = () => (
    <>
        <Hero />
        <Solucoes />
        <Templates />
        <Recursos />
        <Precos />
        <Footer />
    </>
);