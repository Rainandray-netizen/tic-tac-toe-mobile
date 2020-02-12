import React from 'react'

const GameLogic = () =>{

  //player 1 puts down 1's
  //player 2 puts down 4's

  let a = 1
  let b = 1
  let c = 0
  let d = 0
  let e = 0
  let f = 0
  let g = 0
  let h = 0
  let i = 0

  const ticTacArray = [a,b,c,d,e,f,g,h,i]

  const inARow = [
    [a,b,c],
    [d,e,f],
    [g,h,i],
    [a,d,g],
    [b,e,h],
    [c,f,i],
    [a,e,i],
    [c,e,g],
  ]

  inARow.map((row)=>{
    const rowTotal = row[0]+row[1]+row[2]
    if (rowTotal===3){
      console.log('player 1 win')
    }else if(rowTotal===12){
      console.log('player 2 win')
    }else{
      //nested if to detect winning moves
      if(rowTotal===2){
        console.log('player 1 can win next turn')
        row.map((square)=>{
          if(square===0){
            return this
          }else{
            console.log('not this item')
          }
        })
      }else if(rowTotal===8){
        console.log('player 2 can win next turn')
      }
    }

  })

  ticTacArray.map((squareVal)=>{
    console.log('endof: ',squareVal)
  })

  return(
    <h1>
      Hellobruce.co.uk
    </h1>
  )
}

export default GameLogic
