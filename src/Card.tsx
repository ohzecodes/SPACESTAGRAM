import React, { useState } from "react";
// import {FavoriteIcon,FavoriteBorderOutlinedIcon} from '@mui/icons-material';
import { red } from "@mui/material/colors";
import Explain from "./Explanation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Props {
  id: number;
  hdurl: string;
  title: string;
  explanation: string;
  date: Date;
  addFavorites:any,
  rmFavorite:any
}

const Card = (props: Props): JSX.Element => {
  const { id, hdurl, date, explanation, title,addFavorites,rmFavorite } = props;
  const [like, setLike] = useState(false);
  // white heart false
  // red heart true
  const size = [30, 150];

  const heartClick = (id: string) => {
    let Heart = document.getElementById(id);
    

    if (!like) {
    
      Heart?.classList.remove("heartOff")
      Heart?.classList.add("heartOn")
      addFavorites({...props,date:props.date.toDateString(),addFavorites:null,rmFavorite:null});
  
    } else {

      Heart?.classList.remove("heartOn")
      Heart?.classList.add("heartOff")
      rmFavorite({...props,date:props.date.toDateString(),addFavorites:null,rmFavorite:null});
    }

    setLike(!like);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dateAsString: string =date.getUTCDate() +
    " " +
    monthNames[date.getUTCMonth()] +
    " " +
    date.getUTCFullYear();

  return (
    <div
      className="photo"
      id={
        id + 1 + "-" + title.substring(0, 6).trim().replace(" ", "-") + "-" + dateAsString
      }
    >
      <div className="img-wrap">
        <img src={hdurl} alt={title} />
      </div>
      <div className="caption-content">
        <Explain txt={explanation} words={15} />
        <p className="date">{dateAsString}</p>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              heartClick("btn" + id)}}
            id={"btn" + id}
            style={{ fontSize: size[0], textAlign: "center" }}
          >
            {!like ? (
              <FavoriteBorderIcon id="whiteheart" />
            ) : (
              <FavoriteIcon
                id="redheart"
                style={{ fillOpacity: 1, fill: red[800] }}
                
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


export default Card;

