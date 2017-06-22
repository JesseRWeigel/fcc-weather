import React from 'react'
import Layout from '../components/Layout'
import { getJSON } from '../utils/fetch'

export default class extends React.Component {
  state = {
    data: [],
    userLat: null,
    userLong: null
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLat: position.coords.latitude,
        userLon: position.coords.longitude
      })
      this.getWeather()
    })
    console.log('click!!!!')
  }

  getWeather = () => {
    console.log(this.state)
    const apiUrl =
      'https://api.darksky.net/forecast/a11ea556c96a39cda2299f14f1b9a94b/'
    const params = `${this.state.userLat},${this.state
      .userLon}?exclude=minutely,hourly,daily,alerts,flags`
    getJSON(apiUrl + params).then(data => this.setState({ data }))
  }

  render () {
    return (
      <Layout
        title="Jesse's React Weather App"
        description='Get the weather in your location!'
      >
        <div>
          <h1>Jesse's React Weather App</h1>
          <h3>
            {this.state.data.hasOwnProperty('currently')
              ? this.state.data.currently.summary
              : 'Press the button'}
          </h3>
          <button onClick={this.getLocation}>What's the Weather?</button>
        </div>
      </Layout>
    )
  }
}
