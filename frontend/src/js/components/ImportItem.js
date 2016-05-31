import React, { Component } from 'react'
const { object, func } = React.PropTypes

import 'styles/import-item.scss'

export default class ImportItem extends Component {
  static get propTypes () {
    return {
      item: object.isRequired,
      handleFocus: func.isRequired,
      handleImport: func.isRequired,
    }
  }

  constructor () {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (event) {
    if (event.which === 13) {
      this.props.handleImport()
    }
  }

  render () {
    const { item } = this.props

    return (
      <div
        className='import-item'
        tabIndex='0'
        ref='item'
        onFocus={this.props.handleFocus}
        onKeyDown={this.handleKeyDown}
      >
        <p className='import-item__filename'>
          {item.get('filename')}
          <span className='import-item__size'>{item.get('size')}</span>
        </p>
      </div>
    )
  }
}
