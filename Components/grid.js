import React, { useContext, useReducer } from 'react'
import { StyleSheet, View } from 'react-native';

import Square from './square'
import GameContext, {defaultContext} from '../Context/gameContext'

function Grid(){
  console.log('grid rerender')
  const gameContext = useContext(GameContext)

  const [boardState, dispatch] = useReducer(gameContext.reducer,defaultContext.gameBoard)
 // [state, update state according to reducer function] = useReducer(reducer function, the starting state)

  gameContext.dispatch = dispatch;
  //what is the purpose of this?
  // console.log('dispatch: ',gameContext.dispatch)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: '50%',
      padding: '5%',
    },
    // tictacwrapper: {
    //   width: ''
    // },
  })

  if(gameContext.gameState===0){
    return(
      <GameContext.Provider value={defaultContext}>
        <View style={styles.container}>
          {defaultContext.gameBoard.map((item,index) => <Square key={ index } pos={ index } shape={boardState[index]}/>)}
        </View>
      </GameContext.Provider>
    )
  }else if(gameContext.gameState===1){
    return(
      <GameContext.Provider value={defaultContext}>
        <View>
          <p>PLAYER 1 WINS</p>
        </View>
      </GameContext.Provider>
    )
  }else if(gameContext.gameState===-1){
    return(
      <GameContext.Provider value={defaultContext}>
        <View>
          <p>PLAYER 2 WINS</p>
        </View>
      </GameContext.Provider>
    )
  }else if(gameContext.gameState===2){
    return(
      <GameContext.Provider value={defaultContext}>
        <View>
          <p>DRAW</p>
        </View>
      </GameContext.Provider>
    )
  }else if(defaultContext.gameState===-2){
    return(
      <GameContext.Provider value={defaultContext}>
      <View>
        <p>COMPUTER WINS</p>
      </View>
    </GameContext.Provider>
    )
  }
  
}

export default Grid
