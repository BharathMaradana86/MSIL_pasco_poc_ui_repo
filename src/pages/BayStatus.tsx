import { useState } from 'react'
import { FiTool, FiCheckCircle, FiClock } from 'react-icons/fi'

interface Bay {
  id: string
  name: string
  type: '2-Tech Bay' | 'Express Bay' | 'Smart Bay'
  status: 'occupied' | 'vacant' | 'maintenance'
  vehicleReg?: string
  technician?: string
  utilization: number
}

const mockBays: Bay[] = [
  {
    id: '1',
    name: 'Bay 1',
    type: '2-Tech Bay',
    status: 'occupied',
    vehicleReg: 'DL-01-AB-1234',
    technician: 'Tech A & Tech B',
    utilization: 85,
  },
  {
    id: '2',
    name: 'Bay 2',
    type: 'Express Bay',
    status: 'occupied',
    vehicleReg: 'DL-02-CD-5678',
    technician: 'Tech C',
    utilization: 72,
  },
  {
    id: '3',
    name: 'Bay 3',
    type: 'Smart Bay',
    status: 'vacant',
    utilization: 65,
  },
  {
    id: '4',
    name: 'Bay 4',
    type: '2-Tech Bay',
    status: 'occupied',
    vehicleReg: 'DL-03-EF-9012',
    technician: 'Tech D & Tech E',
    utilization: 90,
  },
  {
    id: '5',
    name: 'Bay 5',
    type: 'Express Bay',
    status: 'vacant',
    utilization: 58,
  },
  {
    id: '6',
    name: 'Bay 6',
    type: 'Smart Bay',
    status: 'maintenance',
    utilization: 0,
  },
  {
    id: '7',
    name: 'Bay 7',
    type: '2-Tech Bay',
    status: 'vacant',
    utilization: 45,
  },
  {
    id: '8',
    name: 'Bay 8',
    type: 'Express Bay',
    status: 'occupied',
    vehicleReg: 'DL-04-GH-3456',
    technician: 'Tech F',
    utilization: 78,
  },
]

export default function BayStatus() {
  const [bays] = useState<Bay[]>(mockBays)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-50 border-red-300 text-red-900'
      case 'vacant':
        return 'bg-green-50 border-green-300 text-green-900'
      case 'maintenance':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900'
      default:
        return 'bg-gray-50 border-gray-300 text-gray-900'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied':
        return <FiTool className="w-5 h-5 text-red-600" />
      case 'vacant':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />
      case 'maintenance':
        return <FiClock className="w-5 h-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'Occupied'
      case 'vacant':
        return 'Vacant'
      case 'maintenance':
        return 'Maintenance'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bay Status</h1>
        <p className="text-gray-600 mt-1">Complete overview of all service bays</p>
      </div>

      {/* All Bays Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {bays.map((bay) => (
          <div
            key={bay.id}
            className={`rounded-lg border-2 p-4 ${getStatusColor(bay.status)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold">{bay.name}</h3>
                <p className="text-xs mt-0.5 opacity-75">{bay.type}</p>
              </div>
              <div className="ml-2">
                {getStatusIcon(bay.status)}
              </div>
            </div>

            <div className="mb-2">
              <span className="text-xs font-medium opacity-75">
                {getStatusLabel(bay.status)}
              </span>
            </div>

            {bay.status === 'occupied' && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p className="text-xs font-medium truncate">{bay.vehicleReg}</p>
                <p className="text-xs opacity-75 truncate mt-1">{bay.technician}</p>
              </div>
            )}

            {bay.status === 'vacant' && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p className="text-xs opacity-75">Available</p>
              </div>
            )}

            {bay.status === 'maintenance' && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p className="text-xs opacity-75">Under Maintenance</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
