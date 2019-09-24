import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li> 
            <Link to="/">Streams List</Link>
          </li>
          <li>
            <Link to="/top-game-streams">Top Game Streams</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
