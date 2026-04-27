import InfiniteWork from '@/components/UI/InfiniteWork'
import React from 'react'

const index = () => {
  return (
    <div>
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden bg-black">
        <InfiniteWork />
      </div>
    </div >
  )
}

export default index