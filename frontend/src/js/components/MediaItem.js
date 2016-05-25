import React from 'react'
const { object, bool, func } = React.PropTypes

import 'styles/media-item.scss'

export default class MediaItem extends React.Component {
  static get propTypes () {
    return {
      item: object.isRequired,
      handleFocus: func.isRequired,
      handlePlay: func.isRequired,
      isSelected: bool,
    }
  }

  constructor () {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (event) {
    if (event.which === 13) {
      this.props.handlePlay()
    }
  }

  render () {
    const item = this.props.item.toJS()

    return (
      <div className='media-item'>
        <div
          className='media-item__cover'
          tabIndex='0'
          ref='cover'
          onFocus={this.props.handleFocus}
          onKeyDown={this.handleKeyDown}
          style={{
            backgroundImage: `url(${item.coverImage})`,
          }}
        ></div>
        <p className='media-item__title'>{item.title}</p>
        <p className='media-item__categories'>{item.categories.join(', ')}</p>
        <div className='media-item__rating'>{item.rating}</div>
      </div>
    )
  }
}
