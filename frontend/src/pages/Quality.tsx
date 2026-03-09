import { useEffect, useState } from 'react'
import { mockQualityDashboard, mockNCRs } from '../services/mockData'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export default function Quality() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [ncrs, setNcrs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboard(mockQualityDashboard)
      setNcrs(mockNCRs)
      setLoading(false)
    }, 300)
  }, [])

  const handleNCRClick = (ncr: any) => {
    alert(`NCR: ${ncr.ncr_number}\n\nDescription: ${ncr.description}\nSeverity: ${ncr.severity}\nStatus: ${ncr.status}\nReported by: ${ncr.reported_by}\n\nClick to view root cause analysis, containment actions, and corrective actions.`)
  }

  if (loading) {
    return <div className="text-center py-12">Loading quality data...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Quality Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Compliance, certifications, and CAPA workflows</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Open NCRs"
          value={dashboard?.open_ncrs || 0}
          icon={AlertTriangle}
          color="orange"
        />
        {dashboard?.inspections_summary?.map((insp: any, idx: number) => (
          <StatCard
            key={idx}
            title={`${insp.type} Pass Rate`}
            value={`${insp.pass_rate}%`}
            icon={CheckCircle}
            color="green"
          />
        ))}
      </div>

      {/* NCR by Severity */}
      <Card title="NCR by Severity">
        <div className="grid grid-cols-3 gap-4">
          {dashboard?.ncr_by_severity?.map((item: any, idx: number) => (
            <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold ${
                item.severity === 'critical' ? 'text-red-600' :
                item.severity === 'major' ? 'text-orange-600' :
                'text-yellow-600'
              }`}>
                {item.count}
              </div>
              <div className="text-sm text-gray-600 mt-1 capitalize">{item.severity}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* NCR Table */}
      <Card title="Non-Conformance Reports">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NCR Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ncrs.map((ncr) => (
                <tr 
                  key={ncr.id} 
                  onClick={() => handleNCRClick(ncr)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {ncr.ncr_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                    {ncr.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      ncr.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      ncr.severity === 'major' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ncr.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      ncr.status === 'open' ? 'bg-red-100 text-red-800' :
                      ncr.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                      ncr.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ncr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ncr.reported_by}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(ncr.reported_date).toLocaleDateString()}
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
