import React from 'react'
import { Image, Dimensions } from 'react-native'
import crossSvg from '../assets/times-solid.svg'

const Cross = () => {
  const {width} = Dimensions.get('window')

  return(
    <Image 
      source = { crossSvg }
      style = { { width: width/5, height: width/5 } }/>
  )
}

export default Cross