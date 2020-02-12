import React from 'react'
import { Image, Dimensions } from 'react-native'
import circleSvg from '../assets/circle-regular.svg'

const circle = () => {
  const {width} = Dimensions.get('window')

  return(
    <Image 
      source = { circleSvg }
      style = { { width: width/5, height: width/5 } }/>
  )
}

export default circle