import { useState } from 'react'
import MainEntryReports from '../components/Reports/MainEntryReports'
import JobCardReports from '../components/Reports/JobCardReports'
import BayEfficiencyReports from '../components/Reports/BayEfficiencyReports'
import VehicleTrackingReports from '../components/Reports/VehicleTrackingReports'

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'main-entry' | 'job-card' | 'bay-efficiency' | 'vehicle-tracking'>('main-entry')

  const tabs = [
    { id: 'main-entry', label: 'Main Entry Reports' },
    { id: 'job-card', label: 'Job Card Reports' },
    { id: 'bay-efficiency', label: 'Bay Efficiency' },
    { id: 'vehicle-tracking', label: 'Vehicle Tracking' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive reports and KPIs for workshop operations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'main-entry' && <MainEntryReports />}
        {activeTab === 'job-card' && <JobCardReports />}
        {activeTab === 'bay-efficiency' && <BayEfficiencyReports />}
        {activeTab === 'vehicle-tracking' && <VehicleTrackingReports />}
      </div>
    </div>
  )
}

