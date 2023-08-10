

export const setDataArr = (data) => ({
    type: 'SET_DATA_ARR',
    payload: data,
  });
  
export const setProgress = (progress) =>   ({
    type: 'SET_PROGRESS',
    payload: progress,
  });
export const  addFavorites=(favoriteObj) => ({
  type: 'add_Favorites'.toUpperCase(),
  payload: favoriteObj,
})
export const  rmFavorites=(favoriteObj) => ({
  type: 'rm_Favorites'.toUpperCase(),
  payload: favoriteObj,
})


