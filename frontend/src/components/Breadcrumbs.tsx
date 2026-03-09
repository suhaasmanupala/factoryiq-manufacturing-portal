import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const getLabel = (path: string) => {
    const labels: Record<string, string> = {
      'programs': 'Programs',
      'production': 'Production',
      'quality': 'Quality',
      'supply-chain': 'Supply Chain',
      'service': 'Service',
      'analytics': 'Analytics'
    }
    return labels[path] || path.charAt(0).toUpperCase() + path.slice(1)
  }

  if (pathnames.length === 0) return null

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 animate-fadeIn">
      <Link
        to="/"
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1

        return (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-semibold">
                {getLabel(path)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {getLabel(path)}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
