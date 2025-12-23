import { useState } from 'react'
import UserManagement from '../components/Administration/UserManagement'
import ComponentManagement from '../components/Administration/ComponentManagement'
import MastersManagement from '../components/Administration/MastersManagement'
import WorkflowManagement from '../components/Administration/WorkflowManagement'

export default function Administration() {
  const [activeTab, setActiveTab] = useState<'users' | 'components' | 'masters' | 'workflows'>('users')

  const tabs = [
    { id: 'users', label: 'User Management' },
    { id: 'components', label: 'Component Management' },
    { id: 'masters', label: 'Masters' },
    { id: 'workflows', label: 'Workflows' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-1">Manage users, components, masters, and workflows</p>
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
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'components' && <ComponentManagement />}
        {activeTab === 'masters' && <MastersManagement />}
        {activeTab === 'workflows' && <WorkflowManagement />}
      </div>
    </div>
  )
}

