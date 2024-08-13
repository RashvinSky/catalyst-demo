'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { database, onValue, ref } from '@/firebase'
import { useEffect, useState } from 'react'

function TableData() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dataRef = ref(database, '/')
    const unsubscribe = onValue(dataRef, (snapshot) => {
      setData(snapshot.val())
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  if (!data) return <div className='h-screen flex justify-center items-center'>Loading...</div>

  return (
    <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
      <TableHead>
        <TableRow>
          <TableHeader>Idex</TableHeader>
          <TableHeader>Customer</TableHeader>
          <TableHeader>Language</TableHeader>
          <TableHeader className="text-right">Version</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((order) => (
          <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
            <TableCell>{order?.id}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{order?.language}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">US{order?.version}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default TableData
