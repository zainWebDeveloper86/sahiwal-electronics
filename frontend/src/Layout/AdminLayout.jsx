import React from 'react'
import AdminDashboardHeader from '../components/Admin/AdminDashboardHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <AdminDashboardHeader />
      <Outlet />
    </>
  )
}

export default AdminLayout