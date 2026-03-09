import { useEffect, useState } from 'react'
import { mockSuppliers, mockShipments } from '../services/mockData'
import Card from '../components/Card'
import { Star } from 'lucide-react'

export default function SupplyChain() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSuppliers(mockSuppliers)
      setShipments(mockShipments)
      setLoading(false)
    }, 300)
  }, [])

  const handleSupplierClick = (supplier: any) => {
    alert(`Supplier: ${supplier.name}\n\nCode: ${supplier.code}\nRating: ${supplier.rating}/5.0\nEmail: ${supplier.contact_email}\n\nClick to view supplier details, performance metrics, and purchase orders.`)
  }

  const handleShipmentClick = (shipment: any) => {
    alert(`Shipment: ${shipment.shipment_number}\n\nCarrier: ${shipment.carrier}\nTracking: ${shipment.tracking_number}\nStatus: ${shipment.status}\n\nClick to view detailed tracking information and delivery updates.`)
  }

  if (loading) {
    return <div className="text-center py-12">Loading supply chain data...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Supply Chain</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Supplier tracking, inventory, and logistics visibility</p>
      </div>

      {/* Suppliers */}
      <Card title="Suppliers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((supplier) => (
            <div 
              key={supplier.id} 
              onClick={() => handleSupplierClick(supplier)}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{supplier.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{supplier.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Code: {supplier.code}</p>
              <p className="text-sm text-gray-600">{supplier.contact_email}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Shipments */}
      <Card title="Shipments">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipment #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carrier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ship Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Delivery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shipments.map((shipment) => (
                <tr 
                  key={shipment.id} 
                  onClick={() => handleShipmentClick(shipment)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {shipment.shipment_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {shipment.carrier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {shipment.tracking_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {shipment.ship_date ? new Date(shipment.ship_date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {shipment.estimated_delivery_date ? new Date(shipment.estimated_delivery_date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shipment.status}
                    </span>
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
