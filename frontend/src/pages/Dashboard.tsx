import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockAnalytics } from '../services/mockData'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Factory, CheckCircle, AlertTriangle, Truck, FileText, AlertCircle, Wrench } from 'lucide-react'

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics(mockAnalytics)
      setLoading(false)
    }, 300)
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  const programHealthData = [
    { name: 'Green', value: analytics?.program_health?.green || 0, color: '#10b981' },
    { name: 'Yellow', value: analytics?.program_health?.yellow || 0, color: '#f59e0b' },
    { name: 'Red', value: analytics?.program_health?.red || 0, color: '#ef4444' },
  ]

  const shipmentData = analytics?.delivery_performance?.shipment_status?.map((s: any) => ({
    name: s.status,
    count: s.count
  })) || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Executive Dashboard</h1>
        <p className="text-blue-100">Real-time overview of manufacturing operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Production"
          value={analytics?.production_summary?.total_produced?.toLocaleString() || '0'}
          icon={Factory}
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Yield Rate"
          value={`${analytics?.production_summary?.yield_rate || 0}%`}
          icon={CheckCircle}
          color="green"
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Open NCRs"
          value={analytics?.quality_summary?.open_ncrs || 0}
          icon={AlertTriangle}
          color="orange"
          trend={{ value: 5.1, isPositive: false }}
        />
        <StatCard
          title="On-Time Delivery"
          value={`${analytics?.delivery_performance?.on_time_delivery_rate || 0}%`}
          icon={Truck}
          color="purple"
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Program Health Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programHealthData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
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

        <Card title="Shipment Status">
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
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/programs')}
            className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-blue-200"
          >
            <FileText className="w-10 h-10 mx-auto mb-3 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">View Programs</div>
          </button>
          <button 
            onClick={() => navigate('/production')}
            className="group p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 dark:from-green-900/30 dark:to-green-800/30 dark:hover:from-green-800/40 dark:hover:to-green-700/40 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-green-200 dark:border-green-700"
          >
            <Factory className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-green-400 transform group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Production</div>
          </button>
          <button 
            onClick={() => navigate('/quality')}
            className="group p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 dark:hover:from-yellow-800/40 dark:hover:to-yellow-700/40 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-yellow-200 dark:border-yellow-700"
          >
            <AlertCircle className="w-10 h-10 mx-auto mb-3 text-yellow-600 dark:text-yellow-400 transform group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Quality</div>
          </button>
          <button 
            onClick={() => navigate('/service')}
            className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-700"
          >
            <Wrench className="w-10 h-10 mx-auto mb-3 text-purple-600 dark:text-purple-400 transform group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Service</div>
          </button>
        </div>
      </Card>
    </div>
  )
}
