import './App.css';
import blobb1 from "./components/images/graph (4).png"
import blobb2 from "./components/images/graph (5).png"
import React from 'react';
import Question from './components/Question';
import { nanoid } from 'nanoid';
const App = ()=>{
  const [homepage, setHomePage] = React.useState(true)
const[selections, setSelections] = React.useState({
  amount:5,
  category:'',
  difficulty:'',
  type: '',
})
const changePage = ()=>{
  setHomePage(false)
}
const changeSelections = (event)=>{
  const{value, name} = event.target
  setSelections((prevselections)=>{
    return {...prevselections, [name]:value}
  })
}
const [questions, setQuestions] = React.useState([])
React.useEffect(
   ()=>{
     const getData = async()=>{
       const resp = await fetch(
         `https://opentdb.com/api.php?amount=${selections.amount}&category=${selections.category}&difficulty=${selections.difficulty}&type=${selections.type}`)
         const data = await resp.json()
         const questionsArray = data.results
         const getQuestions = ()=>{
           return questionsArray.map((question)=>{
            const optionsArray = [...question.incorrect_answers, question.correct_answer]
            for (let i = optionsArray.length -1; i > 0; i--) {
              let j = Math.floor(Math.random() * i)
              let k = optionsArray[i]
              optionsArray[i] = optionsArray[j]
              optionsArray[j] = k
            }
            const getoptions =() =>{return optionsArray.map((option)=>{
              return{value:option, id:nanoid(), question:question.question, isSelected:false, rightOption:question.correct_answer}
            })}
             return {...question, isAnswered:false, id:nanoid(),options:getoptions()}
           })
         }
           setQuestions(getQuestions())
     }
     getData()
   },[selections]
 )

 const selectOption = (quest, id)=>{
  setQuestions((prev)=>{
    return prev.map((question)=>{
      return quest === question.question?{...question, isAnswered:true, 
        options:question.options.map((option)=>{
          return id===option.id?{...option, isSelected:true}:{...option,isSelected:false}
      })
    }
    :question
    })
  })
 }
 const [quizzical, setQuizzical]= React.useState(false)
 React.useEffect(
 ()=>{
  questions.every((question)=>{
    return question.isAnswered === true
  })? setQuizzical(true):setQuizzical(false)
 },[questions]
 )
 const [checkAnswers, setCheckAnswers] = React.useState(false)
 const markQuiz = ()=>{
  setCheckAnswers(true)
 }
 const [scoreQuiz, setScoreQuiz] = React.useState([])
 React.useEffect(
  ()=>{
   const checkOptions =()=>{
    return questions.map((question)=>{
      return question.options
    }).flat().filter((option)=>{
      return option.isSelected=== true && option.value ===option.rightOption
    })
   }
    setScoreQuiz(checkOptions())
  },[questions]
 )
 const refresh = ()=>{
  setHomePage(true)
  setCheckAnswers(false)
  setQuizzical(false)
  setSelections((prev)=>{
    return {...prev}
  })
 }
 

 

  return(
    <div className="container">
    {homepage?
      <div className="home">
            <h1>Quizzical</h1>
            <p>Answer the questions and test your knowledge</p>
            <div className="form">
            <div className="form-element">
            <label htmlFor="category">Category:</label>
            <select name="category" id="category" value={selections.category} onChange={changeSelections}>
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
            </div>
            <div className="form-element">
                <label htmlFor="difficulty">Difficulty:</label>
                <select name="difficulty" id="difficulty" value={selections.difficulty} onChange={changeSelections}>
                    <option value=''>Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>
                <div className="form-element">
                <label htmlFor="type">Type of questions:</label>
                <select name="type" id="type" value={selections.type} onChange={changeSelections}>
                    <option value =''>Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value='boolean'>True/False</option>
                </select>
                </div>
            </div>
            <button onClick={changePage}>Start Quiz</button>
        </div>:
        <div className='app'>
        {questions.map((question)=>{
          return(
            <div className="question">
            <Question
              question={question.question}
              correctAnswer={question.correct_answer}
              incorrectAnswers={question.incorrect_answers}
              key={question.id}
              id={question.id}
              isAnswered={question.isAnswered}
              options={question.options}
              selectOption={selectOption}
              quizzical={quizzical}
              checkAnswers={checkAnswers}
              scoreQuiz={scoreQuiz}
            />
            </div>
          )
        })}
        {
          checkAnswers===false?
          <button className='check-answer'
        style={quizzical===true?{opacity:`100%`, pointerEvents:'all'}:{opacity:`40%`}}
        onClick={markQuiz}>
        Check answers
        </button>:
        <div className='table'>
          <h3>You scored {scoreQuiz.length}/5 correct answers </h3>
          <button className='play-again' onClick={refresh}>Play again</button>
        </div>
        }
         
        
        </div>
    }
            <img src={blobb1} alt="blobb" className="blobb1"></img>
             <img src={blobb2} alt="blobb2" className="blobb2"></img>
    </div>
  )
}
export default App;
