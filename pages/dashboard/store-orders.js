import StoreOrders from '@/src/components/StoreOrders'
import DashboardLayout from '@/src/components/layout/DashboardLayout'
import React from 'react'

export default function StoreOrdersPage() {
  return (
    <DashboardLayout>
        <StoreOrders></StoreOrders>
    </DashboardLayout>
  )
}
