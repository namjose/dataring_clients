import React from 'react'
import { Line, Circle } from 'rc-progress'
import { CircularProgress } from '@material-ui/core'
import palletes from '../../constants/palletes'

export default function ProgressBar({ percent = 10 }) {
  return (
    <div style={{ width: '30%' }}>
      {/* <CircularProgress size={60} variant="static" value={5} /> */}
      {/* {/* <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /> */}
      <Circle
        percent={percent}
        strokeWidth="2"
        strokeColor={palletes.BLUE}
        trailWidth={2}
        trailColor="rgb(167, 202, 237)"
      />
    </div>
  )
}
