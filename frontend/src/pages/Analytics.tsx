import { useEffect, useState } from 'react'
import { mockAnalytics } from '../services/mockData'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FileText, CheckCircle, AlertTriangle, Truck } from 'lucide-react'

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(mockAnalytics)
      setLoading(false)
    }, 300)
  }, [])

  const handleExport = (format: string) => {
    alert(`Exporting report to ${format.toUpperCase()}...\n\nIn a full implementation, this would:\n- Generate a ${format.toUpperCase()} file with all analytics data\n- Include charts and tables\n- Download the file to your computer`)
  }

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>
  }

  const programHealthData = [
    { name: 'Green', value: analytics?.program_health?.green || 0, color: '#10b981' },
    { name: 'Yellow', value: analytics?.program_health?.yellow || 0, color: '#f59e0b' },
    { name: 'Red', value: analytics?.program_health?.red || 0, color: '#ef4444' },
  ]

  const shipmentData = analytics?.delivery_performance?.shipment_status?.map((s: any) => ({
    name: s.status.replace('_', ' '),
    count: s.count
  })) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics & Reporting</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Executive dashboards and KPI tracking</p>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Programs"
          value={(analytics?.program_health?.green || 0) + (analytics?.program_health?.yellow || 0) + (analytics?.program_health?.red || 0)}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Production Yield"
          value={`${analytics?.production_summary?.yield_rate || 0}%`}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Open Quality Issues"
          value={analytics?.quality_summary?.open_ncrs || 0}
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard
          title="On-Time Delivery"
          value={`${analytics?.delivery_performance?.on_time_delivery_rate || 0}%`}
          icon={Truck}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Health */}
        <Card title="Program Health Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programHealthData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {programHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Shipment Status */}
        <Card title="Shipment Status Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Production Summary */}
        <Card title="Production Summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Total Produced</span>
              <span className="text-2xl font-bold text-blue-600">
                {analytics?.production_summary?.total_produced?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700">Total Passed</span>
              <span className="text-2xl font-bold text-green-600">
                {analytics?.production_summary?.total_passed?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Yield Rate</span>
              <span className="text-2xl font-bold text-purple-600">
                {analytics?.production_summary?.yield_rate || 0}%
              </span>
            </div>
          </div>
        </Card>

        {/* Delivery Performance */}
        <Card title="Delivery Performance">
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
              <div className="text-5xl font-bold mb-2">
                {analytics?.delivery_performance?.on_time_delivery_rate || 0}%
              </div>
              <div className="text-lg">On-Time Delivery Rate</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {shipmentData.map((item: any, idx: number) => (
                <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.count}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card title="Report Export">
        <div className="flex space-x-4">
          <button 
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export to PDF
          </button>
          <button 
            onClick={() => handleExport('excel')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export to Excel
          </button>
          <button 
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export to CSV
          </button>
        </div>
      </Card>
    </div>
  )
}
