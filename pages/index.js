import React from 'react'
import Layout from '../components/Layout'
import 'isomorphic-fetch'

export default class extends React.Component {
  render () {
    return (
      <Layout
        title="Jesse's React Weather App"
        description='Get the weather in your location!'
      />
    )
  }
}
