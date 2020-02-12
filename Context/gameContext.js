import { createContext } from 'react'

export const defaultContext = {
  //0 for circle 1 for cross
  gameBoard: 
  [0, 0, 0,
  0, 0, 0,
  0, 0, 0,],

  ticTacAI:true,
  AIMoves: 0,

  player:0,
  togglePlay : () =>{
    // console.log(defaultContext.player)
    if(defaultContext.player==0){
      defaultContext.player = 1
    }else{
      defaultContext.player = 0
    }
    // defaultContext.dispatch({
    //   type: 'toggle player'
    // })
  },
  //0 is playing, 1 is a p1 win, -1 is a p2 win, 2 is a draw
  gameState:0,
  toggleGameState: (newState)=>{
    defaultContext.gameState = newState
  },
  dispatch: ()=>{console.log('dummy')},
  reducer:(state, action)=>{
    console.log(action)
    // if(defaultContext.gameState===0){
      switch(action.type){
        case 'P1_PLACES':
          if(defaultContext.ticTacAI===false){
            //updateGameBoard
            defaultContext.gameBoard[action.payload.pos]=1
            //updateGameState
            defaultContext.didWin()
            defaultContext.togglePlay()
            //return Gameboard
            console.log(defaultContext.gameBoard)
            return defaultContext.gameBoard.map((item)=>item)
          }else if(defaultContext.ticTacAI===true){
            defaultContext.gameBoard[action.payload.pos]=1
            defaultContext.didWin()
            defaultContext.AIMoves=1
            if(!defaultContext.gameState){
              defaultContext.ticTacTerminator()
              defaultContext.didWin()
            }
            return defaultContext.gameBoard.map((item)=>item)
          }

        case 'P2_PLACES':
          //updateGameBoard
          defaultContext.gameBoard[action.payload.pos]=-1
          //updateGameState
          defaultContext.didWin()
          defaultContext.togglePlay()
          //return Gameboard
          return defaultContext.gameBoard.map((item)=>item)
  
        default:
          return state //do nothing
      }
    // }  
  },
  didWin: () => {
    const winLines = [
      [defaultContext.gameBoard[0],defaultContext.gameBoard[1],defaultContext.gameBoard[2]],
      [defaultContext.gameBoard[3],defaultContext.gameBoard[4],defaultContext.gameBoard[5]],
      [defaultContext.gameBoard[6],defaultContext.gameBoard[7],defaultContext.gameBoard[8]],
      [defaultContext.gameBoard[0],defaultContext.gameBoard[3],defaultContext.gameBoard[6]],
      [defaultContext.gameBoard[1],defaultContext.gameBoard[4],defaultContext.gameBoard[7]],
      [defaultContext.gameBoard[2],defaultContext.gameBoard[5],defaultContext.gameBoard[8]],
      [defaultContext.gameBoard[0],defaultContext.gameBoard[4],defaultContext.gameBoard[8]],
      [defaultContext.gameBoard[2],defaultContext.gameBoard[4],defaultContext.gameBoard[6]],
    ]
    //check all possible wins
    winLines.map((winLine)=>{
      if(winLine[0]+winLine[1]+winLine[2]===3){
        console.log('p1 WIN')
        defaultContext.toggleGameState(1)
      }else if(winLine[0]+winLine[1]+winLine[2]===-3){
        if(defaultContext.ticTacAI){
          console.log('COMPUTER WIN')
          defaultContext.toggleGameState(-2)
        }else{
          console.log('p2 WIN')
          defaultContext.toggleGameState(-1)
        }
      }
    })
    if(defaultContext.gameState===0 && !defaultContext.gameBoard.includes(0)){
      console.log('DRAW')
      defaultContext.toggleGameState(2)
    }
  },
  //all ai logic here
  ticTacTerminator: ()=>{
    console.log('AI TURN')

    const winLines = [
      [defaultContext.gameBoard[0],defaultContext.gameBoard[4],defaultContext.gameBoard[8]],
      [defaultContext.gameBoard[2],defaultContext.gameBoard[4],defaultContext.gameBoard[6]],
      [defaultContext.gameBoard[0],defaultContext.gameBoard[1],defaultContext.gameBoard[2]],
      [defaultContext.gameBoard[3],defaultContext.gameBoard[4],defaultContext.gameBoard[5]],
      [defaultContext.gameBoard[6],defaultContext.gameBoard[7],defaultContext.gameBoard[8]],
      [defaultContext.gameBoard[0],defaultContext.gameBoard[3],defaultContext.gameBoard[6]],
      [defaultContext.gameBoard[1],defaultContext.gameBoard[4],defaultContext.gameBoard[7]],
      [defaultContext.gameBoard[2],defaultContext.gameBoard[5],defaultContext.gameBoard[8]],

    ]

    const winLineTileID = [
      [0,4,8],
      [2,4,6],
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
    ]

    //check for possible wins for ai
    winLines.map((line,index)=>{
      if(line[0]+line[1]+line[2]===-2){
        console.log('TIC TAC TERMINATOR: WINNING MOVE DETECTED ON WINLINE '+index)
        //calculate winning move
        const [winmove] = line.map((square, index)=>{
          if(square===0){
            console.log('LINE POSITION '+ index)
            return index
          }
        }).filter((value)=>{
          return value !== undefined
        })
        console.log('winmoveid ', winLineTileID[index[winmove]])
        if(defaultContext.AIMoves){
          console.log('i will win now')
          defaultContext.gameBoard[winLineTileID[index][winmove]]=-1
          defaultContext.AIMoves = 0
        }
      }
    })

    winLines.map((line,index)=>{
      if(line[0]+line[1]+line[2]===2){
        // check if ai can block player from winning
        const [winmove] = line.map((square, index)=>{
          if(square===0){
            // console.log('LINE POSITION '+ index)
            return index
          }
        }).filter((value)=>{
          return value !== undefined
        })
        console.log('enemy wintile ', winLineTileID[index][winmove])
        if(defaultContext.AIMoves){
          console.log('i will block enemy now')
          defaultContext.gameBoard[winLineTileID[index][winmove]]=-1
          defaultContext.AIMoves = 0
        }else{
          console.log('only 1 move allowed')
        }
      }
    })

    // console.log(defaultContext.gameBoard[0],defaultContext.gameBoard[8])
  // check for 3 move tricks
    if( ( defaultContext.gameBoard[0]===1 && defaultContext.gameBoard[8]===1 )
    || ( defaultContext.gameBoard[2]===1 && defaultContext.gameBoard[6]===1) ){
      if(!defaultContext.gameBoard[1] && 
          !defaultContext.gameBoard[3] &&
          !defaultContext.gameBoard[5] &&
          !defaultContext.gameBoard[7] &&
          defaultContext.AIMoves){
            console.log('this is a trick!')
            defaultContext.gameBoard[1]=-1
            defaultContext.AIMoves = 0
        }
    }

    if( (defaultContext.gameBoard[4]===1)&&(defaultContext.gameBoard[8]===1) ){
      if(!defaultContext.gameBoard[1] &&
        !defaultContext.gameBoard[2] &&
        !defaultContext.gameBoard[3] &&
        !defaultContext.gameBoard[5] &&
        !defaultContext.gameBoard[6] &&
        !defaultContext.gameBoard[7] &&
        defaultContext.AIMoves){
          console.log('this is a trick!')
          defaultContext.gameBoard[2]=-1
          defaultContext.AIMoves = 0
      }
    }


    winLines.map((line,index)=>{
      if(!defaultContext.gameBoard[4]){
        //try to play center
        if(defaultContext.AIMoves){
          console.log('i will play center now')
          defaultContext.gameBoard[4]=-1
          defaultContext.AIMoves=0
        }
      }
    })

    winLines.map((line,index)=>{
      // console.log('current line: ',index)
      if(line[0]+line[1]+line[2]===-1){
        //try to make lines
        const nextmove = line.map((square,index)=>{
          if(!square){
            // console.log('possible moves are: ', index)
            return index
          }
        }).filter(value=>{
          return value !== undefined
        })
        // console.log('nextmove l is ',nextmove.length)
        if(nextmove.length > 0 && defaultContext.AIMoves){
          // console.log('i will make a line now at ',nextmove)
          defaultContext.gameBoard[winLineTileID[index][nextmove[0]]]=-1
          defaultContext.AIMoves = 0
        }
      }
    })

    winLines.map((line,index)=>{
      if(line[0]+line[1]+line[2]===1){
        const nextmove = line.map((square, index)=>{
          if(!square){
            return index
          }
        }).filter(value=>{
          return value !== undefined
        })
        if(nextmove.length > 0 && defaultContext.AIMoves){
          console.log('i will block an opponent line now')
          defaultContext.gameBoard[winLineTileID[index][nextmove[0]]]=-1
          defaultContext.AIMoves=0
        }
      }
    })

    const throwawaymove = defaultContext.gameBoard.map((square,index)=>{
      // console.log('throwaway run')
      if(!square){
        return index
      }
    }).filter(value=>{
      return value !== undefined
    })
      if(defaultContext.AIMoves){
        console.log('throw away confirmed at ',throwawaymove)
        defaultContext.gameBoard[winLineTileID[throwawaymove[0]]]=-1
        defaultContext.AIMoves=0
    }
  }
}

export default createContext(defaultContext)