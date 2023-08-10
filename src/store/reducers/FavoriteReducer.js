
const initialState = {
favorites:[]
};
  const FavoriteReducer = (state=initialState , action) => {
 
    switch (action.type) {
      case 'add_Favorites'.toUpperCase():
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
        case 'rm_Favorites'.toUpperCase():
          return {
            ...state,
            favorites: state.favorites.filter(e=>e.id!==action.payload.id),
          }
      default:
        return state;
    }
  };
  
  
  export default FavoriteReducer;
  