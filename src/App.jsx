import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import ChooseRolePage from './pages/ChooseRolePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LanguagePage from './pages/LanguagePage'
import HelpDeskPage from './pages/HelpDeskPage'
import AboutPage from './pages/AboutPage'

import CustomerDashboard from './pages/CustomerDashboard'
import TransportationPage from './pages/TransportationPage'
import WorkerListPage from './pages/WorkerListPage'
import WorkerProfilePage from './pages/WorkerProfilePage'
import RequestServicePage from './pages/RequestServicePage'
import MyRequestsPage from './pages/MyRequestsPage'

import BusinessAdminPage from './pages/BusinessAdminPage'
import ProfessionalDashboard from './pages/ProfessionalDashboard'
import DiaryPage from './pages/DiaryPage'
import PhotosPage from './pages/PhotosPage'
import DocumentsPage from './pages/DocumentsPage'
import ReportPage from './pages/ReportPage'
import WorkHistoryPage from './pages/WorkHistoryPage'

import GovernmentDashboard from './pages/GovernmentDashboard'
import GovernmentProjectsPage from './pages/GovernmentProjectsPage'
import GovernmentTendersPage from './pages/GovernmentTendersPage'
import ApplicationsPage from './pages/ApplicationsPage'
import InspectionPage from './pages/InspectionPage'
import MonitoringPage from './pages/MonitoringPage'

import CorporateDashboard from './pages/CorporateDashboard'
import CorporateProfilePage from './pages/CorporateProfilePage'
import CorporateProjectsPage from './pages/CorporateProjectsPage'
import PortfolioPage from './pages/PortfolioPage'
import OpportunitiesPage from './pages/OpportunitiesPage'

// Legacy / secondary pages
import Search from './pages/Search'
import Tenders from './pages/Tenders'
import Companies from './pages/Companies'
import Estimation from './pages/Estimation'
import PostProject from './pages/PostProject'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/help" element={<HelpDeskPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />

        {/* Customer admin flow */}
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/transportation" element={<TransportationPage />} />
        <Route path="/customer/workers/:category" element={<WorkerListPage />} />
        <Route path="/customer/worker/:id" element={<WorkerProfilePage />} />
        <Route path="/customer/request/:id" element={<RequestServicePage />} />
        <Route path="/customer/requests" element={<MyRequestsPage />} />

        {/* Business admin flow */}
        <Route path="/business" element={<BusinessAdminPage />} />

        {/* Professional */}
        <Route path="/business/professional" element={<ProfessionalDashboard />} />
        <Route path="/business/professional/diary" element={<DiaryPage />} />
        <Route path="/business/professional/photos" element={<PhotosPage />} />
        <Route path="/business/professional/documents" element={<DocumentsPage />} />
        <Route path="/business/professional/report" element={<ReportPage />} />
        <Route path="/business/professional/workhistory" element={<WorkHistoryPage />} />

        {/* Government */}
        <Route path="/business/government" element={<GovernmentDashboard />} />
        <Route path="/business/government/projects" element={<GovernmentProjectsPage />} />
        <Route path="/business/government/tenders" element={<GovernmentTendersPage />} />
        <Route path="/business/government/applications" element={<ApplicationsPage />} />
        <Route path="/business/government/inspection" element={<InspectionPage />} />
        <Route path="/business/government/monitoring" element={<MonitoringPage />} />

        {/* Corporate */}
        <Route path="/business/corporate" element={<CorporateDashboard />} />
        <Route path="/business/corporate/profile" element={<CorporateProfilePage />} />
        <Route path="/business/corporate/projects" element={<CorporateProjectsPage />} />
        <Route path="/business/corporate/portfolio" element={<PortfolioPage />} />
        <Route path="/business/corporate/opportunities" element={<OpportunitiesPage />} />

        {/* Secondary / public */}
        <Route path="/search" element={<Search />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      <ScrollTop />
    </>
  )
}