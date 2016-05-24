import React from 'react'
const { object, func } = React.PropTypes
import Dropdown from 'react-dropdown'

import 'styles/items-filter.scss'

export default class ItemsFilter extends React.Component {
  static get propTypes () {
    return {
      categories: object.isRequired,
      handleFilter: func.isRequired,
      handleDone: func.isRequired,
    }
  }

  constructor () {
    super()
    this.state = { search: '', category: { value: 'all', label: 'All' } }
  }

  onSearch (query) {
    this.setState({ search: query }, () => {
      this.props.handleFilter(this.state)
    })
  }

  onCategoryFilter (category) {
    this.setState({ category }, () => {
      this.props.handleFilter(this.state)
    })
  }

  handleKeyDown (event) {
    if (event.which === 13) {
      this.props.handleDone()
      return false
    }
  }

  render () {
    return (
      <div className='items-filter'>
        <div className='items-filter__search'>
          <input ref='search' defaultValue={this.state.search} type='text' placeholder='Search..' onChange={(e) => this.onSearch(e.target.value)} onKeyDown={this.handleKeyDown.bind(this)} />
        </div>
        <Dropdown
          placeholder='Category'
          value={this.state.category}
          options={this.props.categories.toJS()}
          onChange={(e) => this.onCategoryFilter(e)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </div>
    )
  }
}
