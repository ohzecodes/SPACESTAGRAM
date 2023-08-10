import { setDataArr,setProgress } from "./actions";
import { apikey } from "../../APIKEY.ts";

export const fetchData = () => async (dispatch) => {
    const daysback = 10;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - daysback);
    let loop = new Date(start);
  
    const pro = [];

  
    while (loop <= end) {
      const year = loop.getFullYear();
      const month = loop.getMonth() + 1;
      const date = loop.getDate();
  
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${year}-${month}-${date}`,
          { method: 'get' }
        );
        const data = await response.json();
  
        // Calculate progress percentage and dispatch
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const daysCompleted = Math.ceil((loop - start) / (1000 * 60 * 60 * 24)) + 1;
        const progressPercentage = (daysCompleted / totalDays) * 100;
        dispatch(setProgress(progressPercentage));
  
        pro.push(data);
        loop.setDate(loop.getDate() + 1);
      } catch (err) {
      throw err;
      }
    }
  
    dispatch(setDataArr(pro)); // Dispatch data array
  };
  