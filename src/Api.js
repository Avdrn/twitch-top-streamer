import axios from "axios"

let api = axios.create({

  headers : {
    "Accept" : "application/vnd.twitchtv.v5+json",
    "Client-ID" : "v4v8t7mmqhjesq1inclpemhamp9idg"
  }
})

export default api;