// Mock data for FactoryIQ - Frontend Only Version

export const mockUsers = [
  { id: '1', email: 'engineer@customer.com', password: 'password123', firstName: 'John', lastName: 'Engineer', role: 'engineering', organizationType: 'customer' },
  { id: '2', email: 'supplychain@customer.com', password: 'password123', firstName: 'Sarah', lastName: 'Chain', role: 'supply_chain', organizationType: 'customer' },
  { id: '3', email: 'quality@customer.com', password: 'password123', firstName: 'Mike', lastName: 'Quality', role: 'quality', organizationType: 'customer' },
  { id: '4', email: 'pm@customer.com', password: 'password123', firstName: 'Lisa', lastName: 'Manager', role: 'program_manager', organizationType: 'customer' },
  { id: '5', email: 'service@customer.com', password: 'password123', firstName: 'Tom', lastName: 'Service', role: 'service', organizationType: 'customer' },
  { id: '6', email: 'admin@factoryiq.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin', organizationType: 'internal' },
  { id: '7', email: 'production@factoryiq.com', password: 'password123', firstName: 'Bob', lastName: 'Production', role: 'production', organizationType: 'internal' },
  { id: '8', email: 'qe@factoryiq.com', password: 'password123', firstName: 'Alice', lastName: 'QE', role: 'quality_engineer', organizationType: 'internal' },
]

// Store programs in localStorage for persistence
export const getPrograms = () => {
  const stored = localStorage.getItem('factoryiq_programs')
  if (stored) {
    return JSON.parse(stored)
  }
  const defaultPrograms = [
    {
      id: '1',
      name: 'Smart Sensor Platform',
      code: 'SSP-2024',
      description: 'Next-generation IoT sensor platform with advanced analytics',
      status: 'active',
      health_indicator: 'green',
      start_date: '2024-01-15',
      target_completion_date: '2025-12-31',
      customer_name: 'TechCorp Industries',
      program_manager_name: 'Lisa Manager',
      project_count: 3,
      created_by: '4'
    },
    {
      id: '2',
      name: 'EV Battery Controller',
      code: 'EV-BC-2024',
      description: 'Electric vehicle battery management system',
      status: 'active',
      health_indicator: 'yellow',
      start_date: '2024-03-01',
      target_completion_date: '2025-06-30',
      customer_name: 'AutoMotive Systems',
      program_manager_name: 'Lisa Manager',
      project_count: 2,
      created_by: '4'
    },
    {
      id: '3',
      name: 'Industrial Automation System',
      code: 'IAS-2024',
      description: 'Advanced robotics control system for manufacturing automation',
      status: 'active',
      health_indicator: 'green',
      start_date: '2024-02-01',
      target_completion_date: '2025-08-31',
      customer_name: 'RoboTech Manufacturing',
      program_manager_name: 'John Engineer',
      project_count: 4,
      created_by: '1'
    },
    {
      id: '4',
      name: 'Medical Device Platform',
      code: 'MDP-2024',
      description: 'FDA-compliant medical monitoring device with cloud connectivity',
      status: 'active',
      health_indicator: 'green',
      start_date: '2024-01-10',
      target_completion_date: '2025-12-15',
      customer_name: 'MedTech Solutions',
      program_manager_name: 'John Engineer',
      project_count: 5,
      created_by: '1'
    },
    {
      id: '5',
      name: '5G Network Module',
      code: '5G-NM-2024',
      description: 'High-speed 5G communication module for IoT applications',
      status: 'active',
      health_indicator: 'yellow',
      start_date: '2024-04-01',
      target_completion_date: '2025-10-31',
      customer_name: 'Telecom Innovations',
      program_manager_name: 'Sarah Chain',
      project_count: 2,
      created_by: '2'
    },
    {
      id: '6',
      name: 'Smart Home Hub',
      code: 'SHH-2024',
      description: 'Central control unit for smart home ecosystem',
      status: 'active',
      health_indicator: 'green',
      start_date: '2024-03-15',
      target_completion_date: '2025-09-30',
      customer_name: 'HomeAuto Inc',
      program_manager_name: 'Mike Quality',
      project_count: 3,
      created_by: '3'
    },
    {
      id: '7',
      name: 'Aerospace Sensor Array',
      code: 'ASA-2024',
      description: 'High-precision sensor array for aerospace applications',
      status: 'on_hold',
      health_indicator: 'red',
      start_date: '2024-05-01',
      target_completion_date: '2026-03-31',
      customer_name: 'AeroSpace Dynamics',
      program_manager_name: 'Lisa Manager',
      project_count: 1,
      created_by: '4'
    },
    {
      id: '8',
      name: 'Renewable Energy Controller',
      code: 'REC-2024',
      description: 'Smart grid controller for solar and wind energy systems',
      status: 'active',
      health_indicator: 'green',
      start_date: '2024-02-20',
      target_completion_date: '2025-11-30',
      customer_name: 'GreenPower Systems',
      program_manager_name: 'Tom Service',
      project_count: 4,
      created_by: '5'
    },
    {
      id: '9',
      name: 'Warehouse Automation',
      code: 'WA-2024',
      description: 'Automated inventory management and robotics system',
      status: 'active',
      health_indicator: 'yellow',
      start_date: '2024-06-01',
      target_completion_date: '2025-12-31',
      customer_name: 'LogiTech Warehousing',
      program_manager_name: 'Bob Production',
      project_count: 3,
      created_by: '7'
    },
    {
      id: '10',
      name: 'Agricultural IoT Platform',
      code: 'AIP-2024',
      description: 'Smart farming sensors and data analytics platform',
      status: 'completed',
      health_indicator: 'green',
      start_date: '2023-08-01',
      target_completion_date: '2024-10-31',
      customer_name: 'AgriTech Innovations',
      program_manager_name: 'Alice QE',
      project_count: 2,
      created_by: '8'
    }
  ]
  localStorage.setItem('factoryiq_programs', JSON.stringify(defaultPrograms))
  return defaultPrograms
}

export const savePrograms = (programs: any[]) => {
  localStorage.setItem('factoryiq_programs', JSON.stringify(programs))
}

// Store RMAs in localStorage for persistence
export const getRMAs = () => {
  const stored = localStorage.getItem('factoryiq_rmas')
  if (stored) {
    return JSON.parse(stored)
  }
  const defaultRMAs = [
    {
      id: '1',
      rma_number: 'RMA-2024-001',
      product_name: 'Smart Sensor v1.0',
      serial_number: 'SSP-001234',
      issue_category: 'Hardware Failure',
      issue_description: 'Device not powering on after firmware update',
      status: 'in_repair',
      priority: 'normal',
      request_date: '2024-11-15T10:00:00',
      created_by: '5'
    },
    {
      id: '2',
      rma_number: 'RMA-2024-002',
      product_name: 'EV Battery Controller',
      serial_number: 'EV-BC-005678',
      issue_category: 'Software Issue',
      issue_description: 'Firmware update failed, device stuck in boot loop',
      status: 'approved',
      priority: 'high',
      request_date: '2024-11-20T14:30:00',
      created_by: '5'
    },
    {
      id: '3',
      rma_number: 'RMA-2024-003',
      product_name: 'Industrial Automation System',
      serial_number: 'IAS-002345',
      issue_category: 'Performance Issue',
      issue_description: 'System response time degraded, causing production delays',
      status: 'received',
      priority: 'urgent',
      request_date: '2024-11-22T09:15:00',
      created_by: '1'
    },
    {
      id: '4',
      rma_number: 'RMA-2024-004',
      product_name: 'Medical Device Platform',
      serial_number: 'MDP-003456',
      issue_category: 'Hardware Failure',
      issue_description: 'Display screen flickering intermittently',
      status: 'in_repair',
      priority: 'high',
      request_date: '2024-11-18T11:45:00',
      created_by: '1'
    },
    {
      id: '5',
      rma_number: 'RMA-2024-005',
      product_name: '5G Network Module',
      serial_number: '5G-NM-004567',
      issue_category: 'Software Issue',
      issue_description: 'Connection drops frequently, signal strength unstable',
      status: 'submitted',
      priority: 'normal',
      request_date: '2024-11-25T13:20:00',
      created_by: '2'
    },
    {
      id: '6',
      rma_number: 'RMA-2024-006',
      product_name: 'Smart Home Hub',
      serial_number: 'SHH-005678',
      issue_category: 'Hardware Failure',
      issue_description: 'WiFi module not detected, unable to connect to network',
      status: 'completed',
      priority: 'normal',
      request_date: '2024-11-10T08:30:00',
      created_by: '3'
    },
    {
      id: '7',
      rma_number: 'RMA-2024-007',
      product_name: 'Aerospace Sensor Array',
      serial_number: 'ASA-006789',
      issue_category: 'Performance Issue',
      issue_description: 'Sensor readings showing inconsistent values under high temperature',
      status: 'approved',
      priority: 'urgent',
      request_date: '2024-11-23T15:00:00',
      created_by: '4'
    },
    {
      id: '8',
      rma_number: 'RMA-2024-008',
      product_name: 'Renewable Energy Controller',
      serial_number: 'REC-007890',
      issue_category: 'Software Issue',
      issue_description: 'Data logging feature not recording values correctly',
      status: 'in_repair',
      priority: 'normal',
      request_date: '2024-11-21T10:45:00',
      created_by: '5'
    },
    {
      id: '9',
      rma_number: 'RMA-2024-009',
      product_name: 'Warehouse Automation',
      serial_number: 'WA-008901',
      issue_category: 'Hardware Failure',
      issue_description: 'Motor controller overheating, causing system shutdown',
      status: 'received',
      priority: 'high',
      request_date: '2024-11-24T12:00:00',
      created_by: '7'
    },
    {
      id: '10',
      rma_number: 'RMA-2024-010',
      product_name: 'Agricultural IoT Platform',
      serial_number: 'AIP-009012',
      issue_category: 'Cosmetic Damage',
      issue_description: 'Enclosure cracked during shipping, needs replacement',
      status: 'completed',
      priority: 'low',
      request_date: '2024-11-12T14:30:00',
      created_by: '8'
    }
  ]
  localStorage.setItem('factoryiq_rmas', JSON.stringify(defaultRMAs))
  return defaultRMAs
}

export const saveRMAs = (rmas: any[]) => {
  localStorage.setItem('factoryiq_rmas', JSON.stringify(rmas))
}

export const mockPrograms = getPrograms()

export const mockWorkOrders = [
  {
    id: '1',
    wo_number: 'WO-2024-001',
    product_name: 'Smart Sensor v1.0',
    quantity_planned: 5000,
    quantity_completed: 3200,
    completion_percentage: 64.0,
    status: 'in_progress',
    priority: 'normal',
    site_name: 'Austin Manufacturing',
    start_date: '2024-11-01'
  },
  {
    id: '2',
    wo_number: 'WO-2024-002',
    product_name: 'Smart Sensor v1.0',
    quantity_planned: 10000,
    quantity_completed: 0,
    completion_percentage: 0,
    status: 'planned',
    priority: 'normal',
    site_name: 'Austin Manufacturing',
    start_date: '2025-01-15'
  },
  {
    id: '3',
    wo_number: 'WO-2024-003',
    product_name: 'EV Battery Controller',
    quantity_planned: 500,
    quantity_completed: 450,
    completion_percentage: 90.0,
    status: 'in_progress',
    priority: 'high',
    site_name: 'Shanghai Production',
    start_date: '2024-10-01'
  }
]

export const mockProductionData = {
  active_work_orders: 2,
  today_production: {
    units_produced: 480,
    units_passed: 473,
    units_failed: 5,
    yield_rate: 98.54
  },
  production_by_line: [
    { line_name: 'Line A', units_produced: 1750, units_passed: 1720, yield_rate: 98.29 },
    { line_name: 'Line B', units_produced: 1200, units_passed: 1185, yield_rate: 98.75 },
    { line_name: 'Line C', units_produced: 730, units_passed: 716, yield_rate: 98.08 }
  ]
}

export const mockNCRs = [
  {
    id: '1',
    ncr_number: 'NCR-2024-001',
    description: 'Solder joint defect on connector J1',
    severity: 'minor',
    status: 'investigating',
    reported_by: 'Alice QE',
    reported_date: '2024-12-01T08:30:00'
  },
  {
    id: '2',
    ncr_number: 'NCR-2024-002',
    description: 'Component placement offset exceeds tolerance',
    severity: 'major',
    status: 'open',
    reported_by: 'Alice QE',
    reported_date: '2024-11-28T14:15:00'
  }
]

export const mockQualityDashboard = {
  open_ncrs: 2,
  inspections_summary: [
    { type: 'AOI', total: 50, passed: 48, pass_rate: 96.0 },
    { type: 'X-ray', total: 45, passed: 45, pass_rate: 100.0 },
    { type: 'Functional', total: 40, passed: 38, pass_rate: 95.0 }
  ],
  ncr_by_severity: [
    { severity: 'minor', count: 1 },
    { severity: 'major', count: 1 }
  ]
}

export const mockSuppliers = [
  { id: '1', name: 'ChipTech Components', code: 'CHIP001', rating: 4.5, contact_email: 'sales@chiptech.com', status: 'active' },
  { id: '2', name: 'PCB Masters Inc', code: 'PCB001', rating: 4.8, contact_email: 'orders@pcbmasters.com', status: 'active' },
  { id: '3', name: 'ConnectorPro Ltd', code: 'CONN001', rating: 4.2, contact_email: 'info@connectorpro.com', status: 'active' }
]

export const mockShipments = [
  {
    id: '1',
    shipment_number: 'SHIP-2024-001',
    carrier: 'FedEx',
    tracking_number: 'FX123456789',
    ship_date: '2024-11-25',
    estimated_delivery_date: '2024-11-30',
    status: 'in_transit'
  },
  {
    id: '2',
    shipment_number: 'SHIP-2024-002',
    carrier: 'DHL',
    tracking_number: 'DH987654321',
    ship_date: '2024-11-28',
    estimated_delivery_date: '2024-12-05',
    status: 'shipped'
  }
]

export const mockRMAs = getRMAs()

export const mockAnalytics = {
  program_health: {
    green: 1,
    yellow: 1,
    red: 0
  },
  production_summary: {
    total_produced: 3680,
    total_passed: 3621,
    yield_rate: 98.40
  },
  quality_summary: {
    open_ncrs: 2
  },
  delivery_performance: {
    on_time_delivery_rate: 95.5,
    shipment_status: [
      { status: 'in_transit', count: 1 },
      { status: 'shipped', count: 1 },
      { status: 'delivered', count: 3 }
    ]
  }
}

// Role-based access control
export const hasAccess = (userRole: string, module: string): boolean => {
  const accessMatrix: Record<string, string[]> = {
    'admin': ['dashboard', 'programs', 'production', 'quality', 'supply_chain', 'service', 'analytics'],
    'program_manager': ['dashboard', 'programs', 'production', 'quality', 'analytics'],
    'engineering': ['dashboard', 'programs', 'production', 'quality'],
    'production': ['dashboard', 'production', 'quality'],
    'quality': ['dashboard', 'quality', 'production'],
    'quality_engineer': ['dashboard', 'quality', 'production', 'analytics'],
    'supply_chain': ['dashboard', 'supply_chain', 'production'],
    'service': ['dashboard', 'service', 'quality']
  }
  
  return accessMatrix[userRole]?.includes(module) || false
}
