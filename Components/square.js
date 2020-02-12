import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native'
import GameContext from '../Context/gameContext'
import Circle from '../Components/circle'
import Cross from '../Components/cross'

const Square = (props) => {
  // const [squareValue, setSquareValue] = useState()

  const { pos, shape } = props
  // console.log('shape is: ',shape)

  const gameContext = useContext(GameContext)

  const { width, height } = Dimensions.get('window')

  const styles = StyleSheet.create({
    tile: {
      width: width/10*3,
      height: width/10*3,
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  const handleClick = () => {
    // if(gameContext.gameState === 0){ //if game continues
    //   if(gameContext.player===0){
    //     console.log('p1 places')
    //     // setSquareValue(1)
    //     // gameContext.gameBoard[pos]=1
    //     // console.log(gameContext.gameBoard)
    //   }else{
    //     console.log('p2 places')
    //     // setSquareValue(-1)
    //     // gameContext.gameBoard[pos]=-1
    //     // console.log(gameContext.gameBoard)
    //   }
    //   gameContext.didWin()
    //   gameContext.togglePlay()
    // }
    gameContext.dispatch({
      type: gameContext.player ? 'P2_PLACES' :'P1_PLACES',
      payload: {
        pos,
      }
    })
  }

  if(shape===1){
    return(
      <View style={styles.tile}>
        <Cross />
      </View>
    )
  }else if(shape===-1){
    return(
      <View style={styles.tile}>
        <Circle />
      </View>
    )
  }else{
    return(
      <TouchableOpacity
        style = {styles.tile}
        onClick={handleClick}>
      </TouchableOpacity>
    )
  }
}

export default Square