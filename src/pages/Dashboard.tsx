import { useEffect, useState } from 'react'
import { FiTruck, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import VehicleStatusCard from '../components/Dashboard/VehicleStatusCard'
import KPICard from '../components/Dashboard/KPICard'
import LiveAlerts from '../components/Dashboard/LiveAlerts'
import VehicleTicker from '../components/Dashboard/VehicleTicker'
import RecentActivity from '../components/Dashboard/RecentActivity'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    inWorkshop: 0,
    completed: 0,
    pending: 0,
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats({
        totalVehicles: 45,
        inWorkshop: 23,
        completed: 12,
        pending: 10,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Central Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time workshop operations overview</p>
      </div>

      {/* KPI Cards - Single Row */}
      <div className="flex flex-wrap gap-4">
        <KPICard
          title="Total Vehicles Today"
          value={stats.totalVehicles}
          icon={FiTruck}
          trend="+12%"
          color="blue"
        />
        <KPICard
          title="In Workshop"
          value={stats.inWorkshop}
          icon={FiClock}
          trend="+5"
          color="orange"
        />
        <KPICard
          title="Completed"
          value={stats.completed}
          icon={FiCheckCircle}
          trend="+8%"
          color="green"
        />
        <KPICard
          title="Pending Alerts"
          value={stats.pending}
          icon={FiAlertCircle}
          trend="Critical"
          color="red"
        />
      </div>

      {/* Vehicle Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VehicleStatusCard />
        </div>
        <div>
          <LiveAlerts />
        </div>
      </div>

      {/* Vehicle Ticker */}
      <VehicleTicker />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <RecentActivity />
      </div>
    </div>
  )
}

