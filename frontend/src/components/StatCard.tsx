import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

export default function StatCard({ title, value, icon: Icon, trend, className = '', color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-105 ${className}`}>
      <div className={`h-2 bg-gradient-to-r ${colorClasses[color]}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{title}</p>
          {Icon && (
            <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-md`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{value}</p>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">vs last period</span>
          </div>
        )}
      </div>
    </div>
  )
}
