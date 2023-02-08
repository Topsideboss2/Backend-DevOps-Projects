import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TableLoaders() {
  return (
    <div>
        <Skeleton  />
        <Skeleton count={5} width={"100%"} height={"2.43rem"}/>
    </div>
  )
}
