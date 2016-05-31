import React from 'react'
const { object, func } = React.PropTypes

import 'styles/search-result.scss'

export default class SearchResult extends React.Component {
  static get propTypes () {
    return {
      result: object.isRequired,
      handleFocus: func.isRequired,
      handleSelect: func.isRequired,
    }
  }

  constructor () {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (event) {
    if (event.which === 13) {
      this.props.handleSelect()
    }
  }

  render () {
    const result = this.props.result.toJS()

    const style = result.backdrop_path
                ? { backgroundImage: `url(${result.backdrop_path})` }
                : {}

    return (
      <div
        tabIndex='0'
        ref='item'
        className='search-result'
        onFocus={this.props.handleFocus}
        onKeyDown={this.handleKeyDown}
        style={style}
      >
        <p className='search-result__title'>{result.title} <span className='search-result__year'>[{result.year}]</span></p>
        <p className='search-result__description'>{result.overview}</p>
        <div className='search-result__rating'>{result.vote_average}</div>
      </div>
    )
  }
}
