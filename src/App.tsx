import React, { useEffect, useState } from "react";

import Header from "./Header.tsx";
import Card from "./Card.tsx";
import { CircularProgress, Typography } from "@mui/material";

import { connect } from "react-redux";
import {
  addFavorites,
  rmFavorites,
  setProgress
} from "./store/actions/actions.js";
import { fetchData } from "./store/actions/fetchData.js";

const App = (props: any): JSX.Element => {
  const { fetchData, DataArr, progress, addFavorite, rmFavorite, Favorite } =
    props;
  const [error, setError] = useState();

  useEffect(() => {
    try {
      fetchData();
    } catch (error: any) {
      setError(error);
    }
  }, []);
  const darkMode: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const NotYetLoaded = () => (
    <section id="notYetLoaded">
      <Header />
      <Typography variant="h2" className="yellowText">
        <Typography className="yellowText">
          {darkMode === true ? "Dark" : "Light"} Mode(Automatically Detected)
        </Typography>
        {progress}%
      </Typography>
      <CircularProgress
        value={progress}
        className="yellowText"
        variant="determinate"
      />
    </section>
  );

  const [showFavorite, setShowFavorite] = useState(false);
  if (DataArr.length !== 0) {
    const showingArray = showFavorite ? Favorite :DataArr;
    const pics = showingArray
      .filter((e: object) => (e as any)?.hdurl !== undefined)
      .map((e: {}) => ({
        date: new Date((e as any)?.date),
        explanation: (e as any)?.explanation,
        hdurl: (e as any)?.hdurl,
        title: (e as any)?.title
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
const cardPerLine=4;
    return (
      <section id="loaded">
        <Header />
        {props.Favorite.length !== 0 ? (
          <div className="filter">
            <label>
              <input
                type="checkbox"
                onChange={() => setShowFavorite(!showFavorite)}
                value="1"
              />
              <span>{!showFavorite ? "Show Favorite" : "Show All"}</span>
            </label>
          </div>
        ) : null}

        <main
          id="wrapper"
          style={{
            height: showingArray.length <cardPerLine? "100vh" : "fit-content"
          }}
        >
          {pics}
        </main>
      </section>
    );
  } else if (!error) {
    return <NotYetLoaded />;
  } else {
    return (
      <>
        <Header />
        <Typography variant="h2" id="error">
          ERROR {error}
        </Typography>
      </>
    );
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
  rmFavorite: (Favorite: object) => dispatch(rmFavorites(Favorite))
});
// Connect the component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);
