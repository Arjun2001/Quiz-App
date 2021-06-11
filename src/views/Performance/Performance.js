import Navbar from '../../components/Navbar/Navbar'
import React from 'react';
import { Line ,Bar} from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import ReactFontLoader from "react-font-loader";


const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Mark obtained',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Average Mark',
      data: [20, 20, 20, 20, 20, 20],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: 'Highest Mark',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const Performance = () => {

    return (
        <div >
            <Navbar/>
            {/* <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Mate+SC&display=swap" /> */}

            <Container maxWidth="md">
            <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />
      <div style={{fontStyle:"Roboto Slab",fontSize:"40px",color:"brown",marginTop:"3%",marginBottom:"5%"}}>
        CONTEST:  
      </div>
    <Bar data={data} options={options} />
    </Container>
        </div>
      
      );
}
 
export default Performance;