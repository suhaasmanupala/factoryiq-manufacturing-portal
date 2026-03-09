import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Factory, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, User, Settings, Shield, Briefcase, Wrench, Package, BarChart3, CheckCircle, Sun, Moon } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const demoCredentials = [
    { 
      email: 'admin@factoryiq.com', 
      role: 'Admin', 
      icon: Shield, 
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
      iconBg: 'bg-blue-500',
      password: 'admin123',
      description: 'Full system access'
    },
    { 
      email: 'engineer@customer.com', 
      role: 'Engineering', 
      icon: Settings, 
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-700',
      iconBg: 'bg-green-500',
      password: 'password123',
      description: 'Programs & production'
    },
    { 
      email: 'pm@customer.com', 
      role: 'Program Manager', 
      icon: Briefcase, 
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-700',
      iconBg: 'bg-purple-500',
      password: 'password123',
      description: 'Program oversight'
    },
    { 
      email: 'production@factoryiq.com', 
      role: 'Production', 
      icon: Factory, 
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-700',
      iconBg: 'bg-orange-500',
      password: 'password123',
      description: 'Production monitoring'
    },
    { 
      email: 'qe@factoryiq.com', 
      role: 'Quality Engineer', 
      icon: CheckCircle, 
      bgColor: 'bg-teal-50 dark:bg-teal-900/30',
      borderColor: 'border-teal-200 dark:border-teal-700',
      iconBg: 'bg-teal-500',
      password: 'password123',
      description: 'Quality & compliance'
    },
    { 
      email: 'service@customer.com', 
      role: 'Service', 
      icon: Wrench, 
      bgColor: 'bg-pink-50 dark:bg-pink-900/30',
      borderColor: 'border-pink-200 dark:border-pink-700',
      iconBg: 'bg-pink-500',
      password: 'password123',
      description: 'RMA & repairs'
    },
    { 
      email: 'supplychain@customer.com', 
      role: 'Supply Chain', 
      icon: Package, 
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/30',
      borderColor: 'border-indigo-200 dark:border-indigo-700',
      iconBg: 'bg-indigo-500',
      password: 'password123',
      description: 'Logistics & suppliers'
    },
    { 
      email: 'quality@customer.com', 
      role: 'Quality', 
      icon: BarChart3, 
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-700',
      iconBg: 'bg-yellow-500',
      password: 'password123',
      description: 'Quality management'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 shadow-lg group"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-3"></div>

      <div className="relative w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left side - Demo Credentials (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Factory className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white">FactoryIQ</h1>
                  <p className="text-blue-200 dark:text-blue-300 text-base mt-1">Manufacturing Excellence Portal</p>
                </div>
              </div>
            </div>

            {/* Demo Credentials Card */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Quick Demo Access</h2>
                  <p className="text-blue-200 dark:text-blue-300 text-sm">Click any role to auto-fill credentials</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {demoCredentials.map((cred) => {
                  const IconComponent = cred.icon
                  return (
                    <button
                      key={cred.email}
                      onClick={() => {
                        setEmail(cred.email)
                        setPassword(cred.password)
                      }}
                      className={`group relative ${cred.bgColor} hover:bg-white/95 dark:hover:bg-white/20 rounded-xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 ${cred.borderColor} text-left`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 ${cred.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-bold text-gray-800 dark:text-white mb-1">{cred.role}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mb-1.5 truncate">{cred.email}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{cred.description}</div>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right side - Login Form (2 columns) */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-8 py-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-5 shadow-lg">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100 dark:text-blue-200">Sign in to access your dashboard</p>
              </div>

              {/* Form Body */}
              <div className="px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 outline-none placeholder-gray-400 dark:placeholder-gray-500 text-base"
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 outline-none placeholder-gray-400 dark:placeholder-gray-500 text-base"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-xl animate-shake">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white py-4 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 px-8 py-5 text-center border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  🔒 Secure access • End-to-end encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
