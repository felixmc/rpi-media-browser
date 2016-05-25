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
    this.state = { search: '', category: 'all' }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  onSearch (query) {
    this.setState({ search: query }, () => {
      this.props.handleFilter(this.state)
    })
  }

  onCategoryFilter (category) {
    this.setState({ category: category.value }, () => {
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
    const categories = this.props.categories.insert(0, 'all')

    return (
      <div className='items-filter'>
        <div className='items-filter__search'>
          <input ref='search' defaultValue={this.state.search} type='text' placeholder='Search..' onChange={(e) => this.onSearch(e.target.value)} onKeyDown={this.handleKeyDown} />
        </div>
        <Dropdown
          placeholder='Category'
          value={this.state.category}
          options={categories.toJS()}
          onChange={(e) => this.onCategoryFilter(e)}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}
