import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import { LayoutDashboard, FolderKanban, Factory, CheckCircle, Truck, Wrench, BarChart3, Bell, Menu, X, LogOut, Sun, Moon } from 'lucide-react'
import { hasAccess } from '../services/mockData'
import Breadcrumbs from './Breadcrumbs'

export default function Layout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const allNavigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, module: 'dashboard' },
    { name: 'Programs', path: '/programs', icon: FolderKanban, module: 'programs' },
    { name: 'Production', path: '/production', icon: Factory, module: 'production' },
    { name: 'Quality', path: '/quality', icon: CheckCircle, module: 'quality' },
    { name: 'Supply Chain', path: '/supply-chain', icon: Truck, module: 'supply_chain' },
    { name: 'Service', path: '/service', icon: Wrench, module: 'service' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, module: 'analytics' },
  ]

  // Filter navigation based on user role
  const navigation = allNavigation.filter(item => hasAccess(user?.role || '', item.module))

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // Check if user has access to current route
  const currentModule = allNavigation.find(item => isActive(item.path))?.module
  if (currentModule && !hasAccess(user?.role || '', currentModule)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-2xl`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
              <Factory className="w-6 h-6 text-blue-600 dark:text-blue-700" />
            </div>
            <h1 className="text-xl font-bold">FactoryIQ</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {navigation.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mb-2 text-sm rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 shadow-lg transform scale-105'
                    : 'hover:bg-gray-700 dark:hover:bg-gray-800 hover:translate-x-1'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-lg transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-gray-800 dark:text-gray-200" /> : <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />}
            </button>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Manufacturing Excellence Portal
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 transition-colors" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu - desktop */}
              <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-8 animate-fadeIn">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
