import React, { Component } from 'react'
import api from "../Api"
import '../Stylesheets/Streams.css';


export default class Streams extends Component {
  

  constructor(){
    super()
      this.state = {  
        streams : [], 
        searchedArray : [], 
    }
  }


  componentDidMount() {
    api.get("https://api.twitch.tv/kraken/streams/")
    .then(response => {
      this.setState({
        streams: response.data.streams,
        searchedArray : response.data.streams,
      })
    })

  }

      
  sortByViews = () => {
    const copiedDisplay = [].concat(this.state.searchedArray)
    
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
      searchedArray: copiedDisplay
    })
  }

  sortByFollowers = () => {
    const copiedDisplay = [].concat(this.state.searchedArray)
    
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
      searchedArray: copiedDisplay
    })
  }

  sortByGameName = () => {
    const copiedDisplay = [].concat(this.state.searchedArray)
    
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
      searchedArray: copiedDisplay
    })
  }

  search = (event)=> {
    let searchTerm = event.target.value.toUpperCase();
    let searchedGame = this.state.streams.filter((streams)=> (
      streams.channel.game.toUpperCase().indexOf(searchTerm) >= 0
    ))  
    this.setState({searchedArray: searchedGame})
  }

  render() {
    return (
      <div>
        <div className="Header">
          <h1>LIST OF TWITCH STREAMS</h1>
          <input onChange={this.search} placeholder="Search for a Game" type="text"/>
          <div className="Button-box">  
            <button className="Button" onClick={this.sortByGameName}>sort by Game</button>
            <button className="Button" onClick={this.sortByViews}>sort by views</button>
            <button className="Button" onClick={this.sortByFollowers}>sort by followers</button>
          </div>
        </div>
          
        <div className="Stream-container">
          {this.state.searchedArray ?
          <>
          {this.state.searchedArray.map((streamsArray, key) => {
            return (
              <div key={key} className="Stream-box">
                  <h2>{streamsArray.game}</h2>
                  <table>
                    <thead>
                        <tr>
                            <th colSpan="2">{streamsArray.channel.display_name}</th>
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
