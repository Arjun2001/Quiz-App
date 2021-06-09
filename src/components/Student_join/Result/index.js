import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';
import axios from 'axios'

import Navbar from '../../Navbar/Navbar';
import Loader from '../../Quiz Host/Loader'
import Stats from './Stats';
import QNA from './QNA';

const Result = () => {
  const [activeTab, setActiveTab] = useState('Stats');
  const [loading, setLoading] = useState(true);
  const [totalQuestions,settotalQuestions] = useState(0);
  const [correctAnswers,setcorrectAnswers] = useState(0);
  const [timeTaken,settimeTaken] = useState(0);
  const [questionsAndAnswers,setquestionsAndAnswers] = useState(0);

  const fetchData = () => {
    const roll_no = localStorage.getItem("Roll_no")
    console.log(window.location.pathname)
    axios ({
        method:'POST',
        url: `http://localhost:5000/api/get_result`,
        headers: {
            "Authorization":`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        data: {
            roll:roll_no,id:window.location.pathname.substring(7)
        }
    })
    .then(data => {
        if (data.data.length === 0) {
            console.log("no data")
        }
        let ans = JSON.parse(data.data[0].answer)
        setquestionsAndAnswers(ans)
        console.log(data.data[0].max_mark)
        settotalQuestions(ans.length)
        let correct = 0;
        ans.map(item => {
            if (item.point === item.max_point) {
                correct += 1
            }
        })
        setcorrectAnswers(correct)
        settimeTaken(data.data[0].time)
    })
    .catch(error =>
    console.log(error)
    );
}

  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setLoading(false)
    },1000)
  },[1])

  return (
    <div>
    {loading && <Loader />}
    {!loading && <> <Navbar />
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === 'Stats'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === 'QNA'}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === 'Stats' && (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
        />
      )}
      {activeTab === 'QNA' && <QNA questionsAndAnswers={questionsAndAnswers} />}
      <br />
    </Container></>}
    </div>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired
};

export default Result;
