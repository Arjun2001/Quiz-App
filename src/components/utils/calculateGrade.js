const calculateGrade = score => {
  const percentage = parseInt(score);

  let grade = null;
  let remarks = null;

  if (percentage >= 91) {
    grade = 'O';
  } else if (percentage >= 81 && percentage <= 90) {
    grade = 'A+';
  } else if (percentage >= 71 && percentage <= 80) {
    grade = 'A';
  } else if (percentage >= 61 && percentage <= 70) {
    grade = 'B+';
  } else if (percentage >= 51 && percentage <= 60) {
    grade = 'B';
  } else if (percentage >= 41 && percentage <= 50) {
    grade = 'C';
  } else if (percentage < 41) {
    grade = 'F';
  }

  if (score >= 40) {
    remarks = 'Congratulations, YOU PASSED!';
  } else {
    remarks = 'Sorry, YOU FAILED!';
  }

  return {
    grade,
    remarks
  };
};

export default calculateGrade;
