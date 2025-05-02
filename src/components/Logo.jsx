import React from 'react'

function Logo({ width = '200px', className = '' }) {
  return (
    <div
      className={`font-bold text-xl tracking-tight ${className}`}
      style={{ width, textAlign: 'center' }}
    >
      CodeCracker
    </div>
  )
}

export default Logo