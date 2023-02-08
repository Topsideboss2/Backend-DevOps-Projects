import React from 'react'
import Currentbalance from './currentbalance'
import Projectstatistics from './projectstatistics'

export default function Column1() {
  return (
    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div class="row">								
            <Currentbalance />
            <Projectstatistics />
        </div>
    </div>
  )
}
