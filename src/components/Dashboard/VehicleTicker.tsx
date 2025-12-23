import { useState } from 'react'
import { FiTruck, FiClock, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

interface VehicleStatus {
  regNo: string
  advisor: string
  model: string
  serviceType: string
  jcOpening: string
  washing: string
  shopFloor: string
  roadTest: string
  delivery: string
}

const mockVehicles: VehicleStatus[] = [
  {
    regNo: 'DL-01-AB-1234',
    advisor: 'Rajesh Kumar',
    model: 'Swift',
    serviceType: 'Periodic Service',
    jcOpening: '09:00',
    washing: '09:15',
    shopFloor: '09:30',
    roadTest: '11:00',
    delivery: '12:00',
  },
  {
    regNo: 'DL-02-CD-5678',
    advisor: 'Priya Sharma',
    model: 'Baleno',
    serviceType: 'Repair',
    jcOpening: '09:30',
    washing: '09:45',
    shopFloor: '10:00',
    roadTest: '-',
    delivery: 'Pending',
  },
]

export default function VehicleTicker() {
  const [vehicles, setVehicles] = useState<VehicleStatus[]>(mockVehicles)
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Tracking Ticker</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Reg No.</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Advisor</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Service Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">JC Opening</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Washing</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Shop Floor</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Road Test</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <FiTruck className="w-4 h-4 text-primary-600" />
                    <button
                      onClick={() => navigate(`/vehicle/${vehicle.regNo}`)}
                      className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {vehicle.regNo}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">{vehicle.advisor}</td>
                <td className="py-3 px-4">{vehicle.model}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {vehicle.serviceType}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center space-x-1">
                    <FiClock className="w-3 h-3 text-green-600" />
                    <span>{vehicle.jcOpening}</span>
                  </span>
                </td>
                <td className="py-3 px-4">{vehicle.washing}</td>
                <td className="py-3 px-4">{vehicle.shopFloor}</td>
                <td className="py-3 px-4">{vehicle.roadTest}</td>
                <td className="py-3 px-4">
                  {vehicle.delivery === 'Pending' ? (
                    <span className="text-orange-600 font-medium">Pending</span>
                  ) : (
                    <span className="flex items-center space-x-1 text-green-600">
                      <FiCheckCircle className="w-4 h-4" />
                      <span>{vehicle.delivery}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

