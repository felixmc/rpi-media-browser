import React from 'react'
const { object, bool, func } = React.PropTypes

import 'styles/media-item.scss'

export default class MediaItem extends React.Component {
  static get propTypes () {
    return {
      actions: object.isRequired,
      item: object.isRequired,
      handleFocus: func.isRequired,
      isSelected: bool,
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
