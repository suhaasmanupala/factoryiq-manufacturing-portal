import { useEffect, useState } from 'react'
import { getRMAs, saveRMAs } from '../services/mockData'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface RMA {
  id: string
  rma_number: string
  product_name: string
  serial_number: string
  issue_category: string
  issue_description: string
  status: string
  priority: string
  request_date: string
  created_by: string
}

export default function Service() {
  const { user } = useAuth()
  const [rmas, setRmas] = useState<RMA[]>([])
  const [filteredRMAs, setFilteredRMAs] = useState<RMA[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingRMA, setEditingRMA] = useState<RMA | null>(null)
  const [formData, setFormData] = useState({
    product_name: '',
    serial_number: '',
    issue_category: 'Hardware Failure',
    issue_description: '',
    status: 'submitted',
    priority: 'normal'
  })

  useEffect(() => {
    loadRMAs()
  }, [user])

  const loadRMAs = () => {
    setTimeout(() => {
      const allRMAs = getRMAs()
      setRmas(allRMAs)
      
      // Filter RMAs based on role
      if (user?.role === 'admin' || user?.role === 'service') {
        setFilteredRMAs(allRMAs)
      } else {
        // Other roles see only their own RMAs
        setFilteredRMAs(allRMAs.filter((r: RMA) => r.created_by === user?.id))
      }
      setLoading(false)
    }, 300)
  }

  const handleCreateRMA = () => {
    setEditingRMA(null)
    setFormData({
      product_name: '',
      serial_number: '',
      issue_category: 'Hardware Failure',
      issue_description: '',
      status: 'submitted',
      priority: 'normal'
    })
    setShowModal(true)
  }

  const handleEditRMA = (rma: RMA) => {
    setEditingRMA(rma)
    setFormData({
      product_name: rma.product_name,
      serial_number: rma.serial_number,
      issue_category: rma.issue_category,
      issue_description: rma.issue_description,
      status: rma.status,
      priority: rma.priority
    })
    setShowModal(true)
  }

  const handleDeleteRMA = (rmaId: string) => {
    if (window.confirm('Are you sure you want to delete this RMA? This action cannot be undone.')) {
      const updatedRMAs = rmas.filter(r => r.id !== rmaId)
      saveRMAs(updatedRMAs)
      loadRMAs()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingRMA) {
      // Update existing RMA
      const updatedRMAs = rmas.map(r => 
        r.id === editingRMA.id 
          ? { ...r, ...formData }
          : r
      )
      saveRMAs(updatedRMAs)
    } else {
      // Create new RMA
      const newRMA: RMA = {
        id: Date.now().toString(),
        rma_number: `RMA-${new Date().getFullYear()}-${String(rmas.length + 1).padStart(3, '0')}`,
        ...formData,
        request_date: new Date().toISOString(),
        created_by: user?.id || '1'
      }
      saveRMAs([...rmas, newRMA])
    }
    
    setShowModal(false)
    loadRMAs()
  }

  if (loading) {
    return <div className="text-center py-12">Loading service data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">After-Sales Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">RMA management, repairs, and warranty tracking</p>
        </div>
        <button 
          onClick={handleCreateRMA}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create RMA
        </button>
      </div>

      {/* RMA Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingRMA ? 'Edit RMA Request' : 'Create RMA Request'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.product_name}
                    onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.serial_number}
                    onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category *</label>
                <select
                  value={formData.issue_category}
                  onChange={(e) => setFormData({...formData, issue_category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Hardware Failure">Hardware Failure</option>
                  <option value="Software Issue">Software Issue</option>
                  <option value="Performance Issue">Performance Issue</option>
                  <option value="Cosmetic Damage">Cosmetic Damage</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description *</label>
                <textarea
                  required
                  value={formData.issue_description}
                  onChange={(e) => setFormData({...formData, issue_description: e.target.value})}
                  rows={4}
                  placeholder="Please describe the issue in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="received">Received</option>
                    <option value="in_repair">In Repair</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRMA ? 'Update RMA' : 'Create RMA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RMA Table */}
      <Card title="Return Material Authorizations">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RMA Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRMAs.map((rma) => (
                <tr key={rma.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {rma.rma_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {rma.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {rma.serial_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {rma.issue_category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      rma.status === 'completed' ? 'bg-green-100 text-green-800' :
                      rma.status === 'in_repair' ? 'bg-blue-100 text-blue-800' :
                      rma.status === 'received' ? 'bg-yellow-100 text-yellow-800' :
                      rma.status === 'approved' ? 'bg-purple-100 text-purple-800' :
                      rma.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rma.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      rma.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      rma.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      rma.priority === 'normal' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rma.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(rma.request_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditRMA(rma)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit RMA"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteRMA(rma.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete RMA"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredRMAs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No RMAs found. Create a new RMA to get started.
        </div>
      )}
    </div>
  )
}
