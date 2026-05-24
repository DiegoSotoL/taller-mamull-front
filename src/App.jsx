import './index.css'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Catalog from './components/sections/Catalog.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Configurator from './components/sections/Configurator.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Gallery />
        <Configurator />
      </main>
      <Footer />
    </>
  )
}

export default App
