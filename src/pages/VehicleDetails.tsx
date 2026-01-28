import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  FiTruck, 
  FiClock, 
  FiUser, 
  FiCamera, 
  FiFileText, 
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiDownload,
  FiEdit
} from 'react-icons/fi'
import { format } from 'date-fns'

interface VehicleTrackingStage {
  id: string
  stage: string
  direction: 'In' | 'Out'
  timestamp: Date
  image?: string
  location: string
}

interface JobCardDetail {
  jcNumber: string
  openTime: Date
  promisedTime: Date
  estimatedDelivery: Date
  serviceType: string
  serviceAdvisor: string
  model: string
  demandedRepairs: string[]
  status: string
}

interface TechnicianDetail {
  id: string
  name: string
  role: string
  assignedBay: string
  contact: string
  currentTasks: string[]
}

interface AssessmentImage {
  id: string
  area: string
  type: 'outer' | 'underbody'
  url: string
  damageDetected: boolean
  severity?: 'minor' | 'moderate' | 'severe'
}

export default function VehicleDetails() {
  const { vehicleReg } = useParams<{ vehicleReg: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'tracking' | 'jobcard' | 'technician' | 'assessment'>('tracking')

  // Mock data - replace with API calls
  const vehicleRegNumber = vehicleReg || 'DL-01-AB-1234'

  const trackingStages: VehicleTrackingStage[] = [
    {
      id: '1',
      stage: 'Main Entry',
      direction: 'In',
      timestamp: new Date(Date.now() - 120 * 60000),
      image: 'main-entry.jpg',
      location: 'Main Gate',
    },
    {
      id: '2',
      stage: 'Washing Entry',
      direction: 'In',
      timestamp: new Date(Date.now() - 110 * 60000),
      image: 'washing-entry.jpg',
      location: 'Washing Bay',
    },
    {
      id: '3',
      stage: 'Washing Exit',
      direction: 'Out',
      timestamp: new Date(Date.now() - 95 * 60000),
      image: 'washing-exit.jpg',
      location: 'Washing Bay',
    },
    {
      id: '4',
      stage: 'Floor Entry',
      direction: 'In',
      timestamp: new Date(Date.now() - 90 * 60000),
      image: undefined,
      location: 'Service Floor',
    },
    {
      id: '5',
      stage: 'Bay Allocation',
      direction: 'In',
      timestamp: new Date(Date.now() - 85 * 60000),
      image: undefined,
      location: 'Bay 2',
    },
  ]

  const jobCardDetails: JobCardDetail = {
    jcNumber: 'JC-2024-001',
    openTime: new Date(Date.now() - 120 * 60000),
    promisedTime: new Date(Date.now() + 60 * 60000),
    estimatedDelivery: new Date(Date.now() + 45 * 60000),
    serviceType: 'Periodic Service',
    serviceAdvisor: 'Rajesh Kumar',
    model: 'Swift VDI',
    demandedRepairs: [
      'Engine Oil Change',
      'Air Filter Replacement',
      'Brake Pad Inspection',
      'Tire Rotation',
    ],
    status: 'In Progress',
  }

  const technicianDetails: TechnicianDetail = {
    id: 'TECH-001',
    name: 'Amit Patel',
    role: 'Senior Technician',
    assignedBay: 'Bay 2',
    contact: '+91 98765 43210',
    currentTasks: [
      'Engine Oil Change',
      'Air Filter Replacement',
    ],
  }

  const assessmentImages: AssessmentImage[] = [
    {
      id: '1',
      area: 'Front Bumper',
      type: 'outer',
      url: '',
      damageDetected: true,
      severity: 'minor',
    },
    {
      id: '2',
      area: 'Rear Door',
      type: 'outer',
      url: '',
      damageDetected: true,
      severity: 'moderate',
    },
    {
      id: '3',
      area: 'Underbody - Front',
      type: 'underbody',
      url: '',
      damageDetected: false,
    },
    {
      id: '4',
      area: 'Underbody - Rear',
      type: 'underbody',
      url: '',
      damageDetected: false,
    },
  ]

  const tabs = [
    { id: 'tracking', label: 'Vehicle Tracking', icon: FiTruck },
    { id: 'jobcard', label: 'Job Card Details', icon: FiFileText },
    { id: 'technician', label: 'Technician Details', icon: FiUser },
    { id: 'assessment', label: '360° Assessment', icon: FiCamera },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{vehicleRegNumber}</h1>
            <p className="text-gray-600 mt-1">Complete vehicle tracking and service details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <FiDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
            <FiEdit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Vehicle Status Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
              <FiTruck className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{jobCardDetails.model}</h2>
              <p className="text-sm text-gray-600">Job Card: {jobCardDetails.jcNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Current Status</p>
            <p className="text-lg font-semibold text-blue-600">{jobCardDetails.status}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* Vehicle Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracking Stages</h2>
            <div className="space-y-4">
              {trackingStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stage.direction === 'In' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {stage.direction === 'In' ? '✓' : '→'}
                    </div>
                    {index < trackingStages.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{stage.stage}</h3>
                            <p className="text-sm text-gray-600">{stage.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {format(stage.timestamp, 'dd-MM-yyyy HH:mm:ss')}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              stage.direction === 'In' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {stage.direction}
                            </span>
                          </div>
                        </div>
                        {stage.image && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <div 
                              className="relative w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden hover:border-primary-300 cursor-pointer group"
                            >
                              <FiCamera className="w-6 h-6 text-gray-400 group-hover:text-primary-600" />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity"></div>
                              <span className="absolute bottom-1 left-1 right-1 text-[8px] text-gray-500 bg-white bg-opacity-80 px-1 py-0.5 rounded truncate">
                                {stage.image}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Card Details Tab */}
        {activeTab === 'jobcard' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Card Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Job Card Number</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{jobCardDetails.jcNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Service Type</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{jobCardDetails.serviceType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Service Advisor</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{jobCardDetails.serviceAdvisor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Vehicle Model</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{jobCardDetails.model}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">JC Open Time</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {format(jobCardDetails.openTime, 'dd-MM-yyyy HH:mm:ss')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Promised Delivery Time</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {format(jobCardDetails.promisedTime, 'dd-MM-yyyy HH:mm:ss')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Estimated Delivery</label>
                <p className="text-lg font-semibold text-blue-600 mt-1">
                  {format(jobCardDetails.estimatedDelivery, 'dd-MM-yyyy HH:mm:ss')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-lg font-semibold text-green-600 mt-1">{jobCardDetails.status}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="text-sm font-medium text-gray-500 mb-2 block">Demanded Repairs</label>
              <ul className="space-y-2">
                {jobCardDetails.demandedRepairs.map((repair, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900">{repair}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Technician Details Tab */}
        {activeTab === 'technician' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Technician Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Technician Name</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{technicianDetails.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{technicianDetails.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Assigned Bay</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{technicianDetails.assignedBay}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Contact</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{technicianDetails.contact}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="text-sm font-medium text-gray-500 mb-2 block">Current Tasks</label>
              <ul className="space-y-2">
                {technicianDetails.currentTasks.map((task, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FiClock className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-900">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 360° Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">360° Vehicle Assessment</h2>
              
              {/* Assessment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Images</p>
                  <p className="text-2xl font-bold text-blue-600">{assessmentImages.length}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Damages Detected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {assessmentImages.filter(img => img.damageDetected).length}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Overall Condition</p>
                  <p className="text-2xl font-bold text-green-600">Good</p>
                </div>
              </div>

              {/* Outer Body Images */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Outer Body Assessment</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {assessmentImages
                    .filter(img => img.type === 'outer')
                    .map((image) => (
                      <div key={image.id} className="space-y-2">
                        <div className="aspect-video bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center relative">
                          <FiCamera className="w-8 h-8 text-gray-400" />
                          {image.damageDetected && (
                            <div className="absolute top-2 right-2">
                              <FiAlertCircle className={`w-5 h-5 ${
                                image.severity === 'severe' ? 'text-red-600' :
                                image.severity === 'moderate' ? 'text-orange-600' :
                                'text-yellow-600'
                              }`} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{image.area}</p>
                          {image.damageDetected && (
                            <p className={`text-xs ${
                              image.severity === 'severe' ? 'text-red-600' :
                              image.severity === 'moderate' ? 'text-orange-600' :
                              'text-yellow-600'
                            }`}>
                              {image.severity} damage
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Underbody Images */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Underbody Assessment</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {assessmentImages
                    .filter(img => img.type === 'underbody')
                    .map((image) => (
                      <div key={image.id} className="space-y-2">
                        <div className="aspect-video bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                          <FiCamera className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{image.area}</p>
                          {!image.damageDetected && (
                            <p className="text-xs text-green-600">No damage</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Damage Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Detected Damages</h2>
              <div className="space-y-4">
                {assessmentImages
                  .filter(img => img.damageDetected)
                  .map((image) => (
                    <div key={image.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{image.area}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Type: {image.type === 'outer' ? 'Outer Body' : 'Underbody'}
                          </p>
                          {image.severity && (
                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                              image.severity === 'severe' ? 'bg-red-100 text-red-700' :
                              image.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {image.severity} severity
                            </span>
                          )}
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Full Image
                        </button>
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

