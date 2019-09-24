import React, { Component } from 'react'
import api from "../Api"
import {Link} from "react-router-dom"
import '../Stylesheets/Streams.css';


export default class Streams extends Component {
  

    constructor(){
      super()
        this.state = {  
          streams : [], 
          search : [],
        }
      }
    

    componentDidMount() {
      api.get("https://api.twitch.tv/kraken/streams/")
      .then(response => {
        this.setState({streams: response.data.streams})
      })

    }

       
    sortByViews = () => {
      const copiedDisplay = [].concat(this.state.streams)
      
      copiedDisplay.sort(function(a, b) {
        var streamA = a.channel.views
        var streamB = b.channel.views
        if (streamA < streamB) {
          return 1;
        }
        if (streamA > streamB) {
          return -1;
        }
      
        return 0;
      });
      this.setState({
        streams: copiedDisplay
      })
    }

    sortByFollowers = () => {
      const copiedDisplay = [].concat(this.state.streams)
      
      copiedDisplay.sort(function(a, b) {
        var streamA = a.channel.followers
        var streamB = b.channel.followers
        if (streamA < streamB) {
          return 1;
        }
        if (streamA > streamB) {
          return -1;
        }
      
        return 0;
      });
      this.setState({
        streams: copiedDisplay
      })
    }

    sortByGameName = () => {
      const copiedDisplay = [].concat(this.state.streams)
      
      copiedDisplay.sort(function(a, b) {
        var streamA = a.game
        var streamB = b.game
        if (streamA < streamB) {
          return -1;
        }
        if (streamA > streamB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      this.setState({
        streams: copiedDisplay
      })
    }

    search = (event)=> {
      let searchTerm = event.target.value.toUpperCase();
      let searchedGame = this.state.streams.filter((streams)=> (
        streams.channel.game.toUpperCase().indexOf(searchTerm) >= 0
      ))  
      this.setState({streams: searchedGame})
    }

    render() {
      return (
        <div>
          <div>
            <h1>List of streams</h1>
              <input onChange={this.search} placeholder="Search for a Game" type="text"/>

                <div className="Button-box">  
                  <button className="Button" onClick={this.sortByGameName}>sort by Game</button>
                  <button className="Button" onClick={this.sortByViews}>sort by views</button>
                  <button className="Button" onClick={this.sortByFollowers}>sort by followers</button>
                </div>
          </div>
           
          <div className="Stream-container">
            {this.state.streams ?
            <>
            {this.state.streams.map((streamsArray) => {
              return (
                <div className="Stream-box">
                  <Link to={`/game/${streamsArray._id}`} >
                    <h2>{streamsArray.game}</h2>
                    <table>
                      <thead>
                          <tr>
                              <th colspan="2">{streamsArray.channel.display_name}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Views</td>
                              <td>{streamsArray.channel.views}</td>
                          </tr>
                          
                          <tr>
                              <td>Followers</td>
                              <td>{streamsArray.channel.followers}</td>
                          </tr>
                      </tbody>
                      
                   </table>
                   <img className="Stream-image" src={streamsArray.preview.medium} alt="SreamImage"/>

          
                  </Link> 
                </div>
              )
            })}
            </>
            : null}
          </div>
        </div>
      )
  }
}
