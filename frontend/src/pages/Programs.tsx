import { useEffect, useState, useMemo } from 'react'
import { getPrograms, savePrograms } from '../services/mockData'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import { CardSkeleton } from '../components/Skeleton'
import { Plus, Edit2, Trash2, X, FolderKanban, Download, ArrowUpDown } from 'lucide-react'

interface Program {
  id: string
  name: string
  code: string
  description: string
  status: string
  health_indicator: string
  start_date: string
  target_completion_date: string
  customer_name: string
  program_manager_name: string
  project_count: number
  created_by: string
}

export default function Programs() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [programs, setPrograms] = useState<Program[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [healthFilter, setHealthFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'active',
    health_indicator: 'green',
    start_date: '',
    target_completion_date: '',
    customer_name: '',
    program_manager_name: '',
    project_count: 0
  })

  useEffect(() => {
    loadPrograms()
  }, [user])

  const loadPrograms = () => {
    setLoading(true)
    setTimeout(() => {
      const allPrograms = getPrograms()
      setPrograms(allPrograms)
      
      // Filter programs based on role
      if (user?.role === 'admin' || user?.role === 'program_manager') {
        setFilteredPrograms(allPrograms)
      } else {
        setFilteredPrograms(allPrograms.filter((p: Program) => p.created_by === user?.id))
      }
      setLoading(false)
    }, 800)
  }

  // Search and filter logic
  const displayedPrograms = useMemo(() => {
    let result = filteredPrograms

    // Search
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter)
    }

    // Health filter
    if (healthFilter !== 'all') {
      result = result.filter(p => p.health_indicator === healthFilter)
    }

    // Sort
    result = [...result].sort((a, b) => {
      let comparison = 0
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'date') {
        comparison = new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status)
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [filteredPrograms, searchQuery, statusFilter, healthFilter, sortBy, sortOrder])

  const handleNewProgram = () => {
    setEditingProgram(null)
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'active',
      health_indicator: 'green',
      start_date: '',
      target_completion_date: '',
      customer_name: '',
      program_manager_name: user?.firstName + ' ' + user?.lastName || '',
      project_count: 0
    })
    setShowModal(true)
  }

  const handleEditProgram = (program: Program) => {
    setEditingProgram(program)
    setFormData({
      name: program.name,
      code: program.code,
      description: program.description,
      status: program.status,
      health_indicator: program.health_indicator,
      start_date: program.start_date,
      target_completion_date: program.target_completion_date,
      customer_name: program.customer_name,
      program_manager_name: program.program_manager_name,
      project_count: program.project_count
    })
    setShowModal(true)
  }

  const handleDeleteProgram = (programId: string, programName: string) => {
    if (window.confirm(`Are you sure you want to delete "${programName}"? This action cannot be undone.`)) {
      const updatedPrograms = programs.filter(p => p.id !== programId)
      savePrograms(updatedPrograms)
      loadPrograms()
      showToast('success', `Program "${programName}" deleted successfully`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProgram) {
      const updatedPrograms = programs.map(p => 
        p.id === editingProgram.id 
          ? { ...p, ...formData }
          : p
      )
      savePrograms(updatedPrograms)
      showToast('success', `Program "${formData.name}" updated successfully`)
    } else {
      const newProgram: Program = {
        id: Date.now().toString(),
        ...formData,
        created_by: user?.id || '1'
      }
      savePrograms([...programs, newProgram])
      showToast('success', `Program "${formData.name}" created successfully`)
    }
    
    setShowModal(false)
    loadPrograms()
  }

  const handleExport = () => {
    const csv = [
      ['Name', 'Code', 'Status', 'Health', 'Customer', 'Manager', 'Projects', 'Start Date', 'Target Date'],
      ...displayedPrograms.map(p => [
        p.name, p.code, p.status, p.health_indicator, p.customer_name,
        p.program_manager_name, p.project_count, p.start_date, p.target_completion_date
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `programs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    showToast('success', 'Programs exported successfully')
  }

  const toggleSort = (field: 'name' | 'date' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getHealthColor = (indicator: string) => {
    switch (indicator) {
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Programs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage product lifecycle from R&D to production</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-gray-600 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
          <button 
            onClick={handleNewProgram}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Program
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <SearchBar
            placeholder="Search programs..."
            onSearch={setSearchQuery}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={healthFilter}
          onChange={(e) => setHealthFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
        >
          <option value="all">All Health</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => toggleSort('name')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            sortBy === 'name' 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Name <ArrowUpDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => toggleSort('date')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            sortBy === 'date' 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Date <ArrowUpDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => toggleSort('status')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            sortBy === 'status' 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Status <ArrowUpDown className="w-3 h-3" />
        </button>
      </div>

      {/* Program Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Manager *</label>
                  <input
                    type="text"
                    required
                    value={formData.program_manager_name}
                    onChange={(e) => setFormData({...formData, program_manager_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Completion *</label>
                  <input
                    type="date"
                    required
                    value={formData.target_completion_date}
                    onChange={(e) => setFormData({...formData, target_completion_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Health Indicator</label>
                  <select
                    value={formData.health_indicator}
                    onChange={(e) => setFormData({...formData, health_indicator: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.project_count}
                    onChange={(e) => setFormData({...formData, project_count: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProgram ? 'Update Program' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Programs List */}
      {displayedPrograms.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={searchQuery || statusFilter !== 'all' || healthFilter !== 'all' ? 'No programs found' : 'No programs yet'}
          description={searchQuery || statusFilter !== 'all' || healthFilter !== 'all' ? 'Try adjusting your search or filters' : 'Create your first program to get started'}
          action={!searchQuery && statusFilter === 'all' && healthFilter === 'all' ? {
            label: 'Create Program',
            onClick: handleNewProgram
          } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {displayedPrograms.map((program) => (
            <Card key={program.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{program.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getHealthColor(program.health_indicator)}`}>
                      {program.health_indicator.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Code: {program.code}</p>
                  {program.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{program.description}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Customer:</span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{program.customer_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Program Manager:</span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{program.program_manager_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{program.project_count}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Target Date:</span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(program.target_completion_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEditProgram(program)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    title="Edit Program"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProgram(program.id, program.name)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete Program"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
