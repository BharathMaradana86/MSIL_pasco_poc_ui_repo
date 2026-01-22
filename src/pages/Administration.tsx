import { useState } from 'react'
import { 
  FiSettings, 
  FiX, 
  FiClock, 
  FiAlertCircle, 
  FiUsers, 
  FiCamera, 
  FiEdit, 
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiSave,
  FiTrash2
} from 'react-icons/fi'

interface WorkingHours {
  day: string
  startTime: string
  endTime: string
  isActive: boolean
}

interface AlertThreshold {
  id: string
  alertType: string
  threshold: number
  unit: string
  severity: 'low' | 'medium' | 'high'
}

interface ManpowerAttendance {
  id: string
  name: string
  role: string
  date: string
  checkIn: string
  checkOut: string
  status: 'present' | 'absent' | 'late' | 'half-day'
}

interface Camera {
  id: string
  name: string
  ipAddress: string
  workshop: string
  location: string
  healthStatus: 'online' | 'offline' | 'maintenance'
  roiConfiguration: string
  lastUpdate: Date
}

interface VehicleRejection {
  id: string
  regNo: string
  customerName: string
  reason: string
  submittedBy: string
  submittedAt: Date
  status: 'pending' | 'approved' | 'rejected'
  verifiedBy?: string
  verifiedAt?: Date
  images: string[]
}

const mockWorkingHours: WorkingHours[] = [
  { day: 'Monday', startTime: '09:00', endTime: '18:00', isActive: true },
  { day: 'Tuesday', startTime: '09:00', endTime: '18:00', isActive: true },
  { day: 'Wednesday', startTime: '09:00', endTime: '18:00', isActive: true },
  { day: 'Thursday', startTime: '09:00', endTime: '18:00', isActive: true },
  { day: 'Friday', startTime: '09:00', endTime: '18:00', isActive: true },
  { day: 'Saturday', startTime: '09:00', endTime: '15:00', isActive: true },
  { day: 'Sunday', startTime: '00:00', endTime: '00:00', isActive: false },
]

const mockAlertThresholds: AlertThreshold[] = [
  { id: '1', alertType: 'JC Not Opened', threshold: 10, unit: 'minutes', severity: 'high' },
  { id: '2', alertType: 'Washing Delay', threshold: 30, unit: 'minutes', severity: 'medium' },
  { id: '3', alertType: 'Bay Allocation Delay', threshold: 15, unit: 'minutes', severity: 'high' },
  { id: '4', alertType: 'Service Completion Delay', threshold: 60, unit: 'minutes', severity: 'medium' },
  { id: '5', alertType: 'Vehicle Idle Time', threshold: 120, unit: 'minutes', severity: 'low' },
]

const mockManpowerAttendance: ManpowerAttendance[] = [
  { id: '1', name: 'Amit Patel', role: 'Senior Technician', date: '2024-01-15', checkIn: '08:55', checkOut: '18:10', status: 'present' },
  { id: '2', name: 'Rajesh Kumar', role: 'Technician', date: '2024-01-15', checkIn: '09:15', checkOut: '18:00', status: 'late' },
  { id: '3', name: 'Priya Sharma', role: 'Senior Technician', date: '2024-01-15', checkIn: '08:50', checkOut: '17:30', status: 'present' },
  { id: '4', name: 'Sneha Verma', role: 'Technician', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'absent' },
]

const mockCameras: Camera[] = [
  {
    id: '1',
    name: 'Main Gate Camera 1',
    ipAddress: '192.168.1.101',
    workshop: 'Workshop A',
    location: 'Main Entry Gate',
    healthStatus: 'online',
    roiConfiguration: 'Vehicle Detection Zone 1, 2',
    lastUpdate: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '2',
    name: 'Washing Bay Camera 1',
    ipAddress: '192.168.1.102',
    workshop: 'Workshop A',
    location: 'Washing Bay Entry',
    healthStatus: 'online',
    roiConfiguration: 'Vehicle Entry Zone',
    lastUpdate: new Date(Date.now() - 2 * 60000),
  },
  {
    id: '3',
    name: 'Shop Floor Camera 1',
    ipAddress: '192.168.1.103',
    workshop: 'Workshop A',
    location: 'Bay 1-3',
    healthStatus: 'offline',
    roiConfiguration: 'Bay Monitoring Zone',
    lastUpdate: new Date(Date.now() - 120 * 60000),
  },
  {
    id: '4',
    name: 'Main Gate Camera 2',
    ipAddress: '192.168.1.104',
    workshop: 'Workshop B',
    location: 'Main Entry Gate',
    healthStatus: 'maintenance',
    roiConfiguration: 'Vehicle Detection Zone 1',
    lastUpdate: new Date(Date.now() - 240 * 60000),
  },
]

const mockVehicleRejections: VehicleRejection[] = [
  {
    id: '1',
    regNo: 'DL-01-AB-1234',
    customerName: 'John Doe',
    reason: 'Vehicle condition not suitable for service',
    submittedBy: 'Rajesh Kumar',
    submittedAt: new Date(Date.now() - 60 * 60000),
    status: 'pending',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  },
  {
    id: '2',
    regNo: 'DL-02-CD-5678',
    customerName: 'Jane Smith',
    reason: 'Customer requested cancellation',
    submittedBy: 'Priya Sharma',
    submittedAt: new Date(Date.now() - 30 * 60000),
    status: 'pending',
    images: ['image4.jpg', 'image5.jpg'],
  },
  {
    id: '3',
    regNo: 'DL-03-EF-9012',
    customerName: 'Robert Johnson',
    reason: 'Incomplete documentation',
    submittedBy: 'Amit Patel',
    submittedAt: new Date(Date.now() - 120 * 60000),
    status: 'approved',
    verifiedBy: 'Admin User',
    verifiedAt: new Date(Date.now() - 90 * 60000),
    images: ['image6.jpg'],
  },
]

export default function Administration() {
  const [activeTab, setActiveTab] = useState<'settings' | 'vehicle-rejection'>('settings')
  const [settingsTab, setSettingsTab] = useState<'working-hours' | 'alerts' | 'manpower' | 'cameras'>('working-hours')
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>(mockWorkingHours)
  const [alertThresholds, setAlertThresholds] = useState<AlertThreshold[]>(mockAlertThresholds)
  const [manpowerAttendance] = useState<ManpowerAttendance[]>(mockManpowerAttendance)
  const [cameras] = useState<Camera[]>(mockCameras)
  const [vehicleRejections, setVehicleRejections] = useState<VehicleRejection[]>(mockVehicleRejections)
  const [editingWorkingHours, setEditingWorkingHours] = useState<string | null>(null)
  const [editingThreshold, setEditingThreshold] = useState<string | null>(null)
  const [selectedRejection, setSelectedRejection] = useState<string | null>(null)
  const [viewingImages, setViewingImages] = useState<string[] | null>(null)

  const handleSaveWorkingHours = (day: string, startTime: string, endTime: string, isActive: boolean) => {
    setWorkingHours(workingHours.map(wh =>
      wh.day === day ? { ...wh, startTime, endTime, isActive } : wh
    ))
    setEditingWorkingHours(null)
  }

  const handleSaveThreshold = (id: string, threshold: number) => {
    setAlertThresholds(alertThresholds.map(at =>
      at.id === id ? { ...at, threshold } : at
    ))
    setEditingThreshold(null)
  }

  const handleRejectVehicle = (id: string, action: 'approve' | 'reject') => {
    setVehicleRejections(vehicleRejections.map(vr =>
      vr.id === id
        ? {
            ...vr,
            status: action === 'approve' ? 'approved' : 'rejected',
            verifiedBy: 'Current User',
            verifiedAt: new Date(),
          }
        : vr
    ))
    setSelectedRejection(null)
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700'
      case 'offline':
        return 'bg-red-100 text-red-700'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700'
      case 'late':
        return 'bg-yellow-100 text-yellow-700'
      case 'absent':
        return 'bg-red-100 text-red-700'
      case 'half-day':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'vehicle-rejection', label: 'Vehicle Rejection' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-1">System settings and vehicle management</p>
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
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            {/* Settings Sub-Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setSettingsTab('working-hours')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    settingsTab === 'working-hours'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Working Hours
                </button>
                <button
                  onClick={() => setSettingsTab('alerts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    settingsTab === 'alerts'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Alerts Threshold
                </button>
                <button
                  onClick={() => setSettingsTab('manpower')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    settingsTab === 'manpower'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Manpower Attendance
                </button>
                <button
                  onClick={() => setSettingsTab('cameras')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    settingsTab === 'cameras'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Camera Management
                </button>
              </nav>
            </div>

            {/* Settings Tab Content */}
            <div>
              {/* Working Hours Management Tab */}
              {settingsTab === 'working-hours' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Hours Management</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {workingHours.map((wh) => (
                          <tr key={wh.day} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{wh.day}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {editingWorkingHours === wh.day ? (
                                <input
                                  type="time"
                                  defaultValue={wh.startTime}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  id={`start-${wh.day}`}
                                />
                              ) : (
                                wh.startTime
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {editingWorkingHours === wh.day ? (
                                <input
                                  type="time"
                                  defaultValue={wh.endTime}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  id={`end-${wh.day}`}
                                />
                              ) : (
                                wh.endTime
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {editingWorkingHours === wh.day ? (
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    defaultChecked={wh.isActive}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    id={`active-${wh.day}`}
                                  />
                                  <span className="text-sm text-gray-600">Active</span>
                                </label>
                              ) : (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  wh.isActive ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {wh.isActive ? 'Active' : 'Inactive'}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {editingWorkingHours === wh.day ? (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      const startInput = document.getElementById(`start-${wh.day}`) as HTMLInputElement
                                      const endInput = document.getElementById(`end-${wh.day}`) as HTMLInputElement
                                      const activeInput = document.getElementById(`active-${wh.day}`) as HTMLInputElement
                                      handleSaveWorkingHours(
                                        wh.day,
                                        startInput?.value || wh.startTime,
                                        endInput?.value || wh.endTime,
                                        activeInput?.checked ?? wh.isActive
                                      )
                                    }}
                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                    title="Save"
                                  >
                                    <FiSave className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingWorkingHours(null)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                                    title="Cancel"
                                  >
                                    <FiX className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditingWorkingHours(wh.day)}
                                  className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                  title="Edit"
                                >
                                  <FiEdit className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Alerts Threshold Configurations Tab */}
              {settingsTab === 'alerts' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts Threshold Configurations</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Threshold</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {alertThresholds.map((threshold) => (
                          <tr key={threshold.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{threshold.alertType}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {editingThreshold === threshold.id ? (
                                <input
                                  type="number"
                                  defaultValue={threshold.threshold}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm w-20 focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  id={`threshold-${threshold.id}`}
                                />
                              ) : (
                                threshold.threshold
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{threshold.unit}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                threshold.severity === 'high' ? 'bg-gray-200 text-gray-800' :
                                threshold.severity === 'medium' ? 'bg-gray-100 text-gray-700' :
                                'bg-gray-50 text-gray-600'
                              }`}>
                                {threshold.severity}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {editingThreshold === threshold.id ? (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      const input = document.getElementById(`threshold-${threshold.id}`) as HTMLInputElement
                                      handleSaveThreshold(threshold.id, parseInt(input?.value || '0'))
                                    }}
                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                    title="Save"
                                  >
                                    <FiSave className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingThreshold(null)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                                    title="Cancel"
                                  >
                                    <FiX className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditingThreshold(threshold.id)}
                                  className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                  title="Edit"
                                >
                                  <FiEdit className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Manpower Attendance Details Tab */}
              {settingsTab === 'manpower' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Manpower Attendance Details</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {manpowerAttendance.map((attendance) => (
                          <tr key={attendance.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{attendance.name}</td>
                            <td className="px-4 py-3 text-gray-600">{attendance.role}</td>
                            <td className="px-4 py-3 text-gray-600">{attendance.date}</td>
                            <td className="px-4 py-3 text-gray-600">{attendance.checkIn}</td>
                            <td className="px-4 py-3 text-gray-600">{attendance.checkOut}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(attendance.status)}`}>
                                {attendance.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Camera Management Tab */}
              {settingsTab === 'cameras' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Camera Management</h2>
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                      <FiPlus className="w-4 h-4" />
                      <span>Add Camera</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Camera Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workshop</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Health Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI Configuration</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Update</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cameras.map((camera) => (
                          <tr key={camera.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{camera.name}</td>
                            <td className="px-4 py-3 text-gray-600">{camera.ipAddress}</td>
                            <td className="px-4 py-3 text-gray-600">{camera.workshop}</td>
                            <td className="px-4 py-3 text-gray-600">{camera.location}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getHealthStatusColor(camera.healthStatus)}`}>
                                {camera.healthStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{camera.roiConfiguration}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {new Date(camera.lastUpdate).toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                title="Configure"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vehicle Rejection Tab */}
        {activeTab === 'vehicle-rejection' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Rejection Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reg No.</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified By</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vehicleRejections.map((rejection) => (
                    <tr key={rejection.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{rejection.regNo}</td>
                      <td className="px-4 py-3 text-gray-600">{rejection.customerName}</td>
                      <td className="px-4 py-3 text-gray-600">{rejection.reason}</td>
                      <td className="px-4 py-3">
                        {rejection.images && rejection.images.length > 0 ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              {rejection.images.slice(0, 3).map((img, idx) => (
                                <div
                                  key={idx}
                                  className="w-10 h-10 bg-gray-100 border-2 border-white rounded cursor-pointer hover:scale-110 transition-transform"
                                  onClick={() => setViewingImages(rejection.images)}
                                  title={img}
                                >
                                  <div className="w-full h-full flex items-center justify-center">
                                    <FiCamera className="w-5 h-5 text-gray-400" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            {rejection.images.length > 3 && (
                              <span className="text-xs text-gray-500">+{rejection.images.length - 3}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No images</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{rejection.submittedBy}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(rejection.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rejection.status === 'approved' ? 'bg-gray-100 text-gray-700' :
                          rejection.status === 'rejected' ? 'bg-gray-200 text-gray-800' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {rejection.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {rejection.verifiedBy || '-'}
                      </td>
                      <td className="px-4 py-3">
                        {rejection.status === 'pending' ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleRejectVehicle(rejection.id, 'approve')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                              title="Approve"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectVehicle(rejection.id, 'reject')}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Reject"
                            >
                              <FiXCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {rejection.verifiedAt ? new Date(rejection.verifiedAt).toLocaleString() : '-'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Image Viewer Modal */}
        {viewingImages && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Vehicle Images</h3>
                <button
                  onClick={() => setViewingImages(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {viewingImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-video bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-300 transition-colors"
                  >
                    <div className="text-center">
                      <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">{img}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
