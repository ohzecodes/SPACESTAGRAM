import React, { useEffect, useState } from "react";

import Header from "./Header.tsx";
import Card from "./Card.tsx";
import { yellow } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";

import { connect } from "react-redux";
import { addFavorites, rmFavorites, setProgress } from "./store/actions/actions.js";
import { fetchData } from "./store/actions/fetchData.js";
const App = (props: any): JSX.Element => {
  const { fetchData, DataArr, progress, addFavorite,rmFavorite } = props;

  const [error, setError] = useState();
  useEffect(() => {
    try {
      fetchData();
    } catch (error: any) {
      setError(error);
    }
  }, []);

  if (DataArr.length !== 0) {
    const pics = DataArr?.filter((e: object) => (e as any).hdurl !== undefined)
      .map((e: object) => ({
        date: new Date((e as any).date),
        explanation: (e as any).explanation,
        hdurl: (e as any).hdurl,
        title: (e as any).title
      }))
      .sort(
        (
          a: { date: { getTime: () => number } },
          b: { date: { getTime: () => number } }
        ) => b.date.getTime() - a.date.getTime()
      )

      .map((e: {}, key: React.Key) => {
        return (
          <Card
            key={key}
            id={key as number}
            date={(e as any).date}
            title={(e as any).title}
            hdurl={(e as any).hdurl}
            explanation={(e as any).explanation}
            addFavorites={addFavorite}
            rmFavorite={rmFavorite}
          />
        );
      });

    return (
      <div id="loaded">
        <Header />
        <main id="wrapper">{pics}</main>
      </div>
    );
  } else {
    if (!error)
      return (
        <div
          id="notYetLoaded"
          style={{
            color: yellow[500],
            textAlign: "center",
            marginTop: "50vh"
          }}
        >
          <Header />
          <h2> {progress}%</h2>

          <CircularProgress
            sx={{ color: yellow[500] }}
            variant="determinate"
            value={progress}
          />
        </div>
      );
    else {
      return (
        <>
          <Header />
          <h2
            style={{
              textAlign: "center",
              background: "red",
              padding: 20
            }}
          >
            ERROR {error}
          </h2>
        </>
      );
    }
  }
};
const mapStateToProps = (state: any) => {

  return {
    DataArr: state.DataReducer?.DataArr,
    progress: state.DataReducer?.progress,
    Favorite: state.FavoriteReducer.favorites
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchData: () => dispatch(fetchData()), // Dispatching fetchData action
  setProgress: (progress: number) => dispatch(setProgress(progress)), // Dispatching setProgress action
  addFavorite: (Favorite: object) => dispatch(addFavorites(Favorite)),
  rmFavorite: (Favorite: object) => dispatch(rmFavorites(Favorite)),
});
// Connect the component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);
