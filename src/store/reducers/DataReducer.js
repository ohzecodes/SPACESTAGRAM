// reducers.js
const initialState = {
    DataArr: [],
    progress: 0,
  };
  
  const DataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DATA_ARR':
        return { ...state, DataArr: action.payload };
      case 'SET_PROGRESS':
        return { ...state, progress: action.payload };
      default:
        return state;
    }
  };
  
  
  export default DataReducer;
  