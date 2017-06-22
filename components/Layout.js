import React, { Component } from 'react'
import Head from './Head'

export default class Layout extends Component {
  render () {
    const { title, description, children } = this.props

    return (
      <div>
        <Head title={title} description={description} />

        {children}

      </div>
    )
  }
}
