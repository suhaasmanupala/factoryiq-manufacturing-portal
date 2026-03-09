import { useEffect, useState } from 'react'
import { mockProductionData, mockWorkOrders } from '../services/mockData'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FileText, Factory, CheckCircle, BarChart3 } from 'lucide-react'

export default function Production() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [workOrders, setWorkOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboard(mockProductionData)
      setWorkOrders(mockWorkOrders)
      setLoading(false)
    }, 300)
  }, [])

  const handleWorkOrderClick = (wo: any) => {
    alert(`Work Order: ${wo.wo_number}\n\nProduct: ${wo.product_name}\nStatus: ${wo.status}\nProgress: ${wo.completion_percentage}%\nPlanned: ${wo.quantity_planned}\nCompleted: ${wo.quantity_completed}\n\nClick to view detailed production history, quality inspections, and operations.`)
  }

  if (loading) {
    return <div className="text-center py-12">Loading production data...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Production Visibility</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time production monitoring and work order tracking</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Work Orders"
          value={dashboard?.active_work_orders || 0}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Today's Production"
          value={dashboard?.today_production?.units_produced?.toLocaleString() || '0'}
          icon={Factory}
          color="green"
        />
        <StatCard
          title="Units Passed"
          value={dashboard?.today_production?.units_passed?.toLocaleString() || '0'}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          title="Yield Rate"
          value={`${dashboard?.today_production?.yield_rate || 0}%`}
          icon={BarChart3}
          color="orange"
        />
      </div>

      {/* Production by Line */}
      <Card title="Production by Line (Last 7 Days)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboard?.production_by_line || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="line_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="units_produced" fill="#3b82f6" name="Produced" />
            <Bar dataKey="units_passed" fill="#10b981" name="Passed" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Work Orders Table */}
      <Card title="Work Orders">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">WO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workOrders.map((wo) => (
                <tr 
                  key={wo.id} 
                  onClick={() => handleWorkOrderClick(wo)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {wo.wo_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {wo.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {wo.site_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${wo.completion_percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600">{wo.completion_percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      wo.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      wo.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {wo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      wo.priority === 'high' ? 'bg-red-100 text-red-800' :
                      wo.priority === 'normal' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {wo.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
