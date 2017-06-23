import React from 'react'
import Layout from '../components/Layout'
import { getJSON } from '../utils/fetch'

export default class extends React.Component {
  state = {
    data: [],
    temp: null,
    tempF: null,
    tempC: null,
    userLat: null,
    userLong: null,
    bgImage: 'https://unsplash.it/2000/1500?image=1069'
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLat: position.coords.latitude,
        userLon: position.coords.longitude
      })
      this.getWeather()
    })
  }

  getWeather = () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl =
      'https://api.darksky.net/forecast/a11ea556c96a39cda2299f14f1b9a94b/'
    const params = `${this.state.userLat},${this.state
      .userLon}?exclude=minutely,hourly,daily,alerts,flags`
    getJSON(proxy + apiUrl + params)
      .then(data => this.setState({ data }))
      .then(data =>
        this.setState({
          temp: Math.round(this.state.data.currently.temperature),
          bgImage: this.getBgImage()
        })
      )
  }

  getBgImage = () => {
    const images = {
      'clear-day': 'https://unsplash.it/2000/1500?image=215',
      'clear-night': 'https://unsplash.it/2000/1500?image=974',
      rain: 'https://unsplash.it/2000/1500?image=680',
      snow: 'https://unsplash.it/2000/1500?image=726',
      sleet: 'https://unsplash.it/2000/1500?image=1069',
      wind: 'https://unsplash.it/2000/1500?image=525',
      fog: 'https://unsplash.it/2000/1500?image=1068',
      cloudy: 'https://unsplash.it/2000/1500?image=1055',
      'partly-cloudy-day': 'https://unsplash.it/2000/1500?image=1056',
      'partly-cloudy-night': 'https://unsplash.it/2000/1500?image=857'
    }

    return images[this.state.data.currently.icon]
  }

  celsius = () => {
    const temp = Math.round(this.state.data.currently.temperature)
    const tempC = Math.round((temp - 32) / 1.8)
    this.setState({ temp: tempC, tempF: temp })
  }

  fahrenheit = () => {
    this.setState({ temp: this.state.tempF })
  }

  render () {
    return (
      <Layout
        title="Jesse's React Weather App"
        description='Get the weather in your location!'
      >
        <div
          style={{
            backgroundImage: `url(${this.state.bgImage ||
              'https://unsplash.it/2000/1500?image=1069'})`,
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            backgroundSize: 'cover',
            color: '#fff',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ maxWidth: '50%', margin: '0 auto' }}>
            <h1>Jesse's React Weather App</h1>
            <h3>
              {this.state.data.hasOwnProperty('currently')
                ? this.state.data.currently.summary
                : 'Press the button'}
            </h3>
            <div id='temp'>
              {this.state.data.hasOwnProperty('currently')
                ? 'Current temp: ' + this.state.temp
                : ''}
            </div>
            <div onClick={this.celsius}>Celsius</div>
            <div onClick={this.fahrenheit}>Fahrenheit</div>
            <button onClick={this.getLocation}>What's the Weather?</button>
          </div>

        </div>
      </Layout>
    )
  }
}
