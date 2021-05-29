import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar';
import axios from 'axios'
import Swal from 'sweetalert2'
import he from 'he';
import { TextArea } from 'semantic-ui-react'

import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header
} from 'semantic-ui-react';
import Offline from '../Quiz Host/Offline'
import Countdown from '../Quiz Host/Countdown';
import { getLetter } from '../utils';
import Loader from '../Quiz Host/Loader'

import { shuffle } from '../utils';

function StudentJoin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [np, setNp] = useState(false); 
  const [offline, setOffline] = useState(false);
  
  // const [ansType, setAnsType] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  var arraysMatch = function (arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
  
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
  
    return true;
  
  };

  const tandf = ["True","False"]


  const arrRemove = (arr,value) => {
    return arr.filter((ele) => {
      return ele != value;
    })
  }

  const handleItemClick = (e, { name }) => {
    const ansType = name.split(',')
    if (ansType[0] === "MulAns") {
      var arr = userSlectedAns
      if (arr.includes(ansType[1])) {
        arr = arrRemove(arr,ansType[1])
      } else {
        arr.push(ansType[1])
      }
      console.log(arr)
      setUserSlectedAns(arr)
    } else {
      setUserSlectedAns([ansType[1]]);
    }
  };

  const handleNext = (text) => {
    let point = 0;
    if (text === "Descriptive") {
      setNp(true)
      point = 0
      const qna = questionsAndAnswers;
      qna.push({
        question: he.decode(data[questionIndex].question),
        user_answer: document.getElementById("textareavalue").value,
        correct_answer: data[questionIndex].answer,
        point
      });
      setQuestionsAndAnswers(qna);
      
    } else {
      var correct_answer = data[questionIndex].answer
      correct_answer = correct_answer.split(',')
      if (arraysMatch(userSlectedAns,correct_answer)) {
        point = parseInt(data[questionIndex].mark);
      }
      const qna = questionsAndAnswers;
      qna.push({
        question: he.decode(data[questionIndex].question),
        user_answer: userSlectedAns,
        correct_answer: correct_answer,
        point
      });
      setQuestionsAndAnswers(qna);
      
      
    }
    if (questionIndex === data.length - 1) {
      try {
            axios ({
                method:'post',
                url: `http://localhost:5000/api/add_result`,
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data: {
                    roll_no:localStorage.getItem('Roll_no'),
                    contest_id:window.location.pathname.substring(6),
                    answer:(questionsAndAnswers),
                    publised:np
                }
            })
            .then(data => {
              console.log(data)
              window.history.back();
            })
        }catch (err) {
            console.log(err);
        }
    }


    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns([]);
    
  };

  const timeOver = timeTaken => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Time's up",
    }).then((res) => {
      window.history.back();
    })
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setLoading(false)
    },100)
    
  },[1])

  const difference = (a,b) => {
    let hours = 0,minutes = 0,seconds = 0;
    var d1 = new Date(a),
        d2 = new Date(b);
    var diff = d2 - d1;
    if (diff > 3600e3) {
      hours = Math.floor(diff / 1e3)
      diff = diff % 3600e3
    }
    if (diff > 60e3) {
      minutes = Math.floor(diff / 1e3)
      diff = diff % 60e3
    }
    if (diff > 1e3) {
      seconds = Math.floor(diff / 1e3)
    }
    return {hours,minutes,seconds}
  }

  const startQuiz = (data, countdownTime) => {
    // setLoading(true);
    setCountdownTime(countdownTime);
    setData(data);
  };

    const fetchData = () => {
        const id = window.location.pathname.substring(6)
        try {
            axios ({
                method:'get',
                url: `http://localhost:5000/api/get_questions/${id}`,
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data: {
                    code:id
                }
            })
          .then(data => {
            setTimeout(() => {
              const { results } = data.data.output;
              // results.forEach(element => {
              //   element.options = shuffle([
              //     element.options
              //   ]);
              // });
              let {hours,minutes,seconds} = difference(data.data.details[0].START,data.data.details[0].END)
              startQuiz(
                results,
                hours + minutes + seconds
              );
            }, 1000)
        })
          .catch(error =>
            setTimeout(() => {
              if (!navigator.onLine) {
                setOffline(true);
              }
            }, 1000)
          );
      }catch (err) {
        console.log(err);
    }
  }

  if (offline) return <Offline />;

    return (
        <div>
          {loading && <Loader />}
          {!loading && data &&<>
            
            <Navbar />
            <Item.Header>
            <Container>
              <Segment>
                <Item.Group divided>
                  <Item>
                    <Item.Content>
                      <Item.Extra>
                        <Header as="h1" block floated="left">
                          <Icon name="info circle" />
                          <Header.Content>
                            {`Question No.${questionIndex + 1} of ${data.length}`}
                          </Header.Content>
                        </Header>
                        <Countdown
                          countdownTime={countdownTime}
                          timeOver={timeOver}
                          setTimeTaken={setTimeTaken}
                        />
                      </Item.Extra>
                      <br />
                      <Item.Meta>
                        <Message size="huge" floating>
                          <b>{`Q${questionIndex+1}. ${he.decode(data[questionIndex].question)}`}</b>
                        </Message>
                        <br />
                        <Item.Description>
                          
                        {data[questionIndex].choice === 'Descriptive'  && <h3>Enter your answer below:</h3>}
                        {data[questionIndex].choice === 'MCQ' && data[questionIndex].ans_type === 'MulAns' && <h3>Please choose MULTIPLE ANSWERS from the following:</h3>}
                        {data[questionIndex].choice === 'MCQ' && data[questionIndex].ans_type === 'SingleAns' && <h3>Please choose ONE of the following answers:</h3>}
                        {data[questionIndex].choice === 'TandF' && <h3>Please select TRUE or FALSE:</h3>}
                        
                        </Item.Description>
                        <Divider />
                        {data[questionIndex].choice === 'MCQ' &&
                        <Menu vertical fluid size="massive">
                          {data[questionIndex].options.map((option, i) => {
                            const letter = getLetter(i);
                            const decodedOption = option;
                            const type = he.decode(data[questionIndex].ans_type)
                            return (
                              <Menu.Item
                                key={decodedOption}
                                name={type+","+decodedOption}
                                active={userSlectedAns.length > 0 ?userSlectedAns.includes(decodedOption): false}
                                onClick={handleItemClick}
                              >
                                <b style={{ marginRight: '8px' }}>{letter}</b>
                                {decodedOption}
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                        } 
                        {data[questionIndex].choice === 'TandF' &&
                        <Menu vertical fluid size="massive">
                          {tandf.map((option, i) => {
                            const letter = getLetter(i);
                            const decodedOption = option;
                            const type = "SingleAns"
                            return (  
                              <Menu.Item
                                key={decodedOption}
                                name={type+","+decodedOption}
                                active={userSlectedAns.length > 0 ?userSlectedAns.includes(decodedOption): false}
                                onClick={handleItemClick}
                              >
                                <b style={{ marginRight: '8px' }}>{letter}</b>
                                {decodedOption}
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                        } 
                        {data[questionIndex].choice === 'Descriptive' &&
                        <Menu vertical fluid size="massive">
                          <TextArea placeholder='Brief your answer here' id="textareavalue" style={{ minHeight: "100",width:"inherit" }}/>
                        </Menu>
                        }
                      </Item.Meta>
                      <Divider />
                      <Item.Extra>
                        { data.length !== questionIndex+1 ?
                          <Button
                          primary
                          content="Next"
                          onClick={()=> handleNext(data[questionIndex].choice)}
                          floated="right"
                          size="big"
                          icon="right chevron"
                          labelPosition="right"
                        /> :
                        <Button negative 
                        onClick={()=> handleNext(data[questionIndex].choice)}
                        size="big"
                        floated="right"
                        >SUBMIT</Button>
                        }
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <br />
            </Container>
          </Item.Header>
            </>}
        </div>
    )

}

export default StudentJoin
