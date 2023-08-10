import { yellow } from "@mui/material/colors";
import React from "react";
import { connect } from "react-redux";

const Header = (props:any): JSX.Element => {

  return(<>
  <header
    className="title"
    id="head"
   
  >
    <h1>SPACESTAGRAM</h1>
    <h4 style={{ textTransform: "capitalize" }}>
      Based on NASA's astronomy photo of the day
    </h4>
    <p style={{color:yellow[500],textAlign:"center"}}>Favorite:{props.Favorite.length}</p>
  </header>

  </>
)};

const mapStateToProps = (state: any) =>  ({
    Favorite: state.FavoriteReducer.favorites
  });
export default connect(mapStateToProps,null)(Header);
