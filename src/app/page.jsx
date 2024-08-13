'use client'

import { getRecentOrders } from '@/data'
import { useEffect, useState } from 'react'
import { ApplicationLayout } from './application-layout'
import TableData from '@/components/home/TableData'


export default function Home() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      let fetchedOrders = await getRecentOrders()
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [])

  return (
    <ApplicationLayout>
      <TableData />
    </ApplicationLayout>
  )
}
