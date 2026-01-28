import { useEffect, useState } from 'react'
import { FiFileText, FiDroplet, FiTool, FiNavigation, FiCheckCircle, FiBook, FiTruck } from 'react-icons/fi'
import KPICard from '../components/Dashboard/KPICard'
import VehicleTicker from '../components/Dashboard/VehicleTicker'

export default function Dashboard() {
  const [stats, setStats] = useState({
    gateInButJcNotOpen: 0,
    washing: 0,
    shopFloor: 0,
    roadTest: 0,
    jcClosedButNotBilled: 0,
    billedButNotDelivered: 0,
    delivered: 0,
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats({
        gateInButJcNotOpen: 5,
        washing: 8,
        shopFloor: 12,
        roadTest: 3,
        jcClosedButNotBilled: 4,
        billedButNotDelivered: 6,
        delivered: 15,
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
          title="Gate In but JC not opened"
          value={stats.gateInButJcNotOpen}
          icon={FiFileText}
          trend=""
          color="orange"
        />
        <KPICard
          title="Washing"
          value={stats.washing}
          icon={FiDroplet}
          trend=""
          color="blue"
        />
        <KPICard
          title="Shop Floor"
          value={stats.shopFloor}
          icon={FiTool}
          trend=""
          color="purple"
        />
        <KPICard
          title="Road Test"
          value={stats.roadTest}
          icon={FiNavigation}
          trend=""
          color="indigo"
        />
        <KPICard
          title="JC closed but not billed"
          value={stats.jcClosedButNotBilled}
          icon={FiFileText}
          trend=""
          color="yellow"
        />
        <KPICard
          title="Billed but not delivered"
          value={stats.billedButNotDelivered}
          icon={FiBook}
          trend=""
          color="orange"
        />
        <KPICard
          title="Delivered"
          value={stats.delivered}
          icon={FiCheckCircle}
          trend=""
          color="green"
        />
      </div>

      {/* Vehicle Ticker - show stage times */}
      <VehicleTicker mode="time" />
    </div>
  )
}

