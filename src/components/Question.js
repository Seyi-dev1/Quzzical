import React from "react"
import {decode} from 'html-entities';
import correct from './images/icons8-ok-35.png'
import wrong from './images/icons8-cancel-35.png'
const Question = (props)=>{
  
 
   
  const styles = {
    selected:{
      backgroundColor:'#d6dbf5',
      border:'none'
    },
    notSelected:{
      backgroundColor:'transparent'
    },
    notSelected2:{
      backgroundColor:'transparent',
      pointerEvents:'none'
    },
    wrongOption:{
      backgroundColor:'#F8BCBC',
      border:'none',
      opacity:`60%`,
      pointerEvents:'none'
    },
    correctOption:{
      backgroundColor:'#94D7A2',
      border:'none',
      pointerEvents:'none'
    },
    show:{
      display:'block'
    },
    hide:{
      display:'none'
    }
  }
  const correctOption = ()=>{
    return props.options.filter((option)=>{
    return option.isSelected===true && option.value === props.correctAnswer
   })}
    return(
      <div className="questions">
        <div className="question">
        <div className="image">
        <img src={ correctOption().length > 0?correct:wrong} alt='check-mark'
        style={props.checkAnswers?styles.show:styles.hide}>
        </img>
        </div>
        <div className="header">
        <h3>{decode(props.question)}</h3>
        </div>
        <div className="options">
        {props.checkAnswers === false?
          props.options.map((option)=>{
          return(
            <span onClick={()=>{ props.selectOption(option.question,option.id)}}
            style={option.isSelected?styles.selected:styles.notSelected}
            key={option.id}>
            {decode(option.value)}
            </span>
          )
        })
        :props.options.map((option)=>{
          const stylefunc = ()=>
          {
              if(option.value===props.correctAnswer){
              return styles.correctOption }
               else if(option.isSelected===true && option.value!==props.correctAnswer){
                return styles.wrongOption
              } 
              else if(option.isSelected===false && option.value!==props.correctAnswer){
                return styles.notSelected2
              }
            }
          return(
            <span onClick={()=>{ props.selectOption(option.question,option.id)}}
            style={stylefunc()}
            key={option.id}>
            {decode(option.value)}
            </span>
          )
        })}
         </div>
         <div className="line"></div>
         </div>
         </div>
    )
}
export default Question