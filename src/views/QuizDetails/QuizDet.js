import useFetch from "./useFetch";
// import Summa from "./Summa";
import QuizDetails from "./QuizDetails";
const QuizDet = ({c}) => {

    const { error, isPending, data: stud } = useFetch('http://localhost:5000/api/'+c)

    console.log(stud)
    return (  
        <div>
            { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }    
            { stud && <QuizDetails stud={stud} /> }

        </div>
    );
}
 
export default QuizDet
