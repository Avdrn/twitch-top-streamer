import React, { Component } from 'react'
import api from "../Api"
import {Link} from "react-router-dom"


export default class GamesStreams extends Component {
  

    constructor(){
      super()
        this.state = {  
          games: [], 
        }
      }
    

    componentDidMount() {
      debugger
      api.get("https://api.twitch.tv/kraken/games/top?client_id=v4v8t7mmqhjesq1inclpemhamp9idg&Accept=application/vnd.twitchtv.v5+json")
      .then(response => {
        this.setState({games: response.data.top})
      })

    }

    render() {
      return (
        <div>
          {this.state.games ?
          <>
          {this.state.games.map((gamesArray) => {
            console.log(gamesArray)
            return (
            <div>
              <Link to={`/game/${gamesArray.game._id}`} >
                <div>
                  <h3>{gamesArray.game.name}</h3>
                  <img src={gamesArray.game.box.medium} alt="gameImg"/>
                </div>
              </Link> 
            </div>
            )
          })}
          </>
          : null}

        </div>
      )
  }
}
