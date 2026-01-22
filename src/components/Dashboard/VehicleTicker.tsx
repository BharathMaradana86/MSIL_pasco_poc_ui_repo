import { useState, useMemo } from 'react'
import { FiTruck, FiClock, FiCheckCircle, FiSearch, FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi'
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
  inTime: string
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
    inTime: '08:45',
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
    inTime: '09:15',
  },
  {
    regNo: 'DL-03-EF-9012',
    advisor: 'Amit Patel',
    model: 'Dzire',
    serviceType: 'Periodic Service',
    jcOpening: '10:00',
    washing: '10:15',
    shopFloor: '10:30',
    roadTest: '12:00',
    delivery: '13:00',
    inTime: '09:50',
  },
  {
    regNo: 'DL-04-GH-3456',
    advisor: 'Sneha Verma',
    model: 'Vitara',
    serviceType: 'Repair',
    jcOpening: '10:30',
    washing: '10:45',
    shopFloor: '11:00',
    roadTest: '-',
    delivery: 'Pending',
    inTime: '10:20',
  },
  {
    regNo: 'DL-05-IJ-7890',
    advisor: 'Rajesh Kumar',
    model: 'Swift',
    serviceType: 'Periodic Service',
    jcOpening: '11:00',
    washing: '11:15',
    shopFloor: '11:30',
    roadTest: '13:00',
    delivery: '14:00',
    inTime: '10:50',
  },
  {
    regNo: 'DL-06-KL-2345',
    advisor: 'Priya Sharma',
    model: 'Baleno',
    serviceType: 'Repair',
    jcOpening: '11:30',
    washing: '11:45',
    shopFloor: '12:00',
    roadTest: '-',
    delivery: 'Pending',
    inTime: '11:20',
  },
  {
    regNo: 'DL-07-MN-6789',
    advisor: 'Amit Patel',
    model: 'Dzire',
    serviceType: 'Periodic Service',
    jcOpening: '12:00',
    washing: '12:15',
    shopFloor: '12:30',
    roadTest: '14:00',
    delivery: '15:00',
    inTime: '11:50',
  },
  {
    regNo: 'DL-08-OP-0123',
    advisor: 'Sneha Verma',
    model: 'Vitara',
    serviceType: 'Repair',
    jcOpening: '12:30',
    washing: '12:45',
    shopFloor: '13:00',
    roadTest: '-',
    delivery: 'Pending',
    inTime: '12:20',
  },
  {
    regNo: 'DL-09-QR-4567',
    advisor: 'Rajesh Kumar',
    model: 'Swift',
    serviceType: 'Periodic Service',
    jcOpening: '13:00',
    washing: '13:15',
    shopFloor: '13:30',
    roadTest: '15:00',
    delivery: '16:00',
    inTime: '12:50',
  },
  {
    regNo: 'DL-10-ST-8901',
    advisor: 'Priya Sharma',
    model: 'Baleno',
    serviceType: 'Repair',
    jcOpening: '13:30',
    washing: '13:45',
    shopFloor: '14:00',
    roadTest: '-',
    delivery: 'Pending',
    inTime: '13:20',
  },
]

export default function VehicleTicker() {
  const [vehicles] = useState<VehicleStatus[]>(mockVehicles)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [timeFrom, setTimeFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [timeTo, setTimeTo] = useState('')
  const navigate = useNavigate()

  const itemsPerPage = 5

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (v) =>
          v.regNo.toLowerCase().includes(query) ||
          v.advisor.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.serviceType.toLowerCase().includes(query)
      )
    }

    // Apply date/time filter
    if (dateFrom || timeFrom || dateTo || timeTo) {
      filtered = filtered.filter((v) => {
        // Get today's date for comparison (assuming vehicles are from today)
        const today = new Date()
        const [hours, minutes] = v.inTime.split(':').map(Number)
        const vehicleDateTime = new Date(today)
        vehicleDateTime.setHours(hours, minutes, 0, 0)

        let matchesFrom = true
        let matchesTo = true

        if (dateFrom && timeFrom) {
          const fromDateTime = new Date(`${dateFrom}T${timeFrom}`)
          matchesFrom = vehicleDateTime >= fromDateTime
        } else if (dateFrom) {
          const fromDate = new Date(dateFrom)
          fromDate.setHours(0, 0, 0, 0)
          const vehicleDate = new Date(vehicleDateTime)
          vehicleDate.setHours(0, 0, 0, 0)
          matchesFrom = vehicleDate >= fromDate
        } else if (timeFrom) {
          const fromTime = new Date(today)
          const [fromHours, fromMinutes] = timeFrom.split(':').map(Number)
          fromTime.setHours(fromHours, fromMinutes, 0, 0)
          matchesFrom = vehicleDateTime >= fromTime
        }

        if (dateTo && timeTo) {
          const toDateTime = new Date(`${dateTo}T${timeTo}`)
          matchesTo = vehicleDateTime <= toDateTime
        } else if (dateTo) {
          const toDate = new Date(dateTo)
          toDate.setHours(23, 59, 59, 999)
          const vehicleDate = new Date(vehicleDateTime)
          vehicleDate.setHours(0, 0, 0, 0)
          matchesTo = vehicleDate <= toDate
        } else if (timeTo) {
          const toTime = new Date(today)
          const [toHours, toMinutes] = timeTo.split(':').map(Number)
          toTime.setHours(toHours, toMinutes, 0, 0)
          matchesTo = vehicleDateTime <= toTime
        }

        return matchesFrom && matchesTo
      })
    }

    return filtered
  }, [vehicles, searchQuery, dateFrom, timeFrom, dateTo, timeTo])

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleDateFilterChange = () => {
    setCurrentPage(1)
  }

  const clearDateFilter = () => {
    setDateFrom('')
    setTimeFrom('')
    setDateTo('')
    setTimeTo('')
    setCurrentPage(1)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Vehicle Tracking Ticker</h2>
        <div className="flex items-center space-x-3">
          {/* Date and Time Filter */}
          <div className="flex items-center space-x-2 bg-gray-50 border border-gray-300 rounded-lg p-2">
            <FiCalendar className="w-4 h-4 text-gray-500" />
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <label className="text-xs text-gray-600">From:</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    handleDateFilterChange()
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => {
                    setTimeFrom(e.target.value)
                    handleDateFilterChange()
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-1">
                <label className="text-xs text-gray-600">To:</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value)
                    handleDateFilterChange()
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={timeTo}
                  onChange={(e) => {
                    setTimeTo(e.target.value)
                    handleDateFilterChange()
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {(dateFrom || timeFrom || dateTo || timeTo) && (
                <button
                  onClick={clearDateFilter}
                  className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                  title="Clear date filter"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

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
            {paginatedVehicles.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              paginatedVehicles.map((vehicle, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} vehicles
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

