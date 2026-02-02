import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

// Sample orders data (replace with API or props)
const ordersData = [
  {
    id: 'ORD12345',
    date: '2026-02-01',
    status: 'Delivered',
    total: 15800,
    items: 3,
  },
  {
    id: 'ORD12346',
    date: '2026-01-28',
    status: 'Processing',
    total: 6200,
    items: 1,
  },
  {
    id: 'ORD12347',
    date: '2026-01-25',
    status: 'Shipped',
    total: 12500,
    items: 2,
  },
]

const Orders = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">My Orders</h1>

        {ordersData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              You have no orders yet.
            </p>
            <Button className="mt-4" onClick={() => navigate('/shop')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-border rounded-xl">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
               
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order) => (
                  <tr key={order.id} className="border-t border-border hover:bg-accent/10">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-semibold">${order.total}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
