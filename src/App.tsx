import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import RealTimeMonitoring from './pages/RealTimeMonitoring'
import Reports from './pages/Reports'
import CustomerCommunication from './pages/CustomerCommunication'
import VehicleAssessment from './pages/VehicleAssessment'
import Administration from './pages/Administration'
import BayStatus from './pages/BayStatus'
import VehicleDetails from './pages/VehicleDetails'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/customer-communication" element={<CustomerCommunication />} />
        <Route path="/vehicle-assessment" element={<VehicleAssessment />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/bay-status" element={<BayStatus />} />
        <Route path="/vehicle/:vehicleReg" element={<VehicleDetails />} />
      </Routes>
    </Layout>
  )
}

export default App

