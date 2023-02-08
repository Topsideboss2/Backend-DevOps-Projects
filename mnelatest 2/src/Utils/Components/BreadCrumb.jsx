import { Breadcrumbs, Link } from '@mui/material'
import React from 'react'

export default function BreadCrumb({companyName,projectId,projectName,milestoneName,milestoneId}) {
  return (
    <div>
        <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    {companyName}
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href={`/project-details/${projectId}`}
  >
    {projectName}
  </Link>
{milestoneId &&(
 <Link
 underline="hover"
 color="inherit"
 href={`/milestone-details/${projectId}/${milestoneId}`}
>
 {projectName}
</Link>
)}
 
  {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
</Breadcrumbs>
    </div>
  )
}
