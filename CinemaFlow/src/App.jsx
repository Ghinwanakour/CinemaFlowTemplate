import { Routes, Route } from 'react-router-dom'
import Layout from './assets/components/Layout'
import Hero from '../src/assets/section/Hero'
import Section from '../src/assets/section/Section'
import Mainpages from './assets/section/Mainpages'
import Utilitypages from './assets/section/Utilitypages'
import Template from './assets/section/Template'
import SectionFirst from './assets/section/SectionFirst'
import JoinOur from './assets/section/JoinOur'
import MoreTemplatesBadge from './assets/components/MoreTemplatesBadge'
import NotFound from './assets/section/NotFound'
import HomePage from './assets/section/HomePage'
import AboutPage from './assets/section/AboutPage'
import PortfolioPage from './assets/section/PortfolioPage'
import BlogPage from './assets/section/BlogPage'

function App() {
  return (
    <>
        <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Section/>
              <Mainpages/>
              <Utilitypages/>
              <Template/>
              <SectionFirst/>
              <JoinOur/>
            </>
          }/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/404-not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MoreTemplatesBadge/>
      </Layout>
    </>
  )
}

export default App