import React from 'react'
import { CSpinner } from '@coreui/react'

export const SpinnerComp = (props) => {
  return (
     <CSpinner size = {props.size} color = {props.color} />
  )
}
