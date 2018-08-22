
const OLDEST_CARS = 30;

const countYears = () => {
  let years = [];
  const currYear = new Date();
  for ( let i = currYear.getFullYear() - OLDEST_CARS; i <= currYear.getFullYear() ; i++ ){
    years.push({ value: i, label: i });
  }
  return years;
};

export default countYears;