import React, { Component } from 'react'
const { object, bool, func } = React.PropTypes
import classNames from 'classnames'
import Modal from 'react-modal'
import MouseTrap from 'mousetrap'

import * as importsHelper from '../helpers/imports'
import SearchResult from './SearchResult'
import 'styles/import-modal.scss'

export default class ImportModal extends Component {
  static get propTypes () {
    return {
      actions: object.isRequired,
      item: object.isRequired,
      results: object.isRequired,
      isOpen: bool.isRequired,
      onRequestClose: func.isRequired,
      handleResultSelect: func.isRequired,
      importStatus: object,
    }
  }

  constructor () {
    super()
    this.state = {
      focusIndex: -1,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidUpdate () {
    setTimeout(() => {
      if (!this.props.results.size && this.refs.search) {
        this.refs.search.focus()
      }
    }, 1)
  }

  componentDidMount () {
    MouseTrap.bind(['up'], this.focusPrevItem)
    MouseTrap.bind(['down'], this.focusNextItem)
  }

  componentWillUnmount () {
    MouseTrap.unbind(['up', 'down'])
  }

  focusNextItem () {
    const items = this.props.results
    const index = (this.state.focusIndex + 1) % items.size
    this.refs[`result-${index}`].refs.item.focus()
  }

  focusPrevItem () {
    const items = this.props.results
    const index = (this.state.focusIndex + items.size - 1) % items.size
    this.refs[`result-${index}`].refs.item.focus()
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      const value = e.target.value
      if (value.startsWith('id:')) {
        const id = value.split('id:')[1]
        this.props.actions.searchMovieById(id)
      } else {
        this.props.actions.searchMovieByTitle(value)
      }
    }
  }

  renderResults () {
    return this.props.results.map((result, i) => {
      return (
        <SearchResult
          key={result.hashCode()}
          ref={`result-${i}`}
          result={result}
          handleFocus={() => this.setState({ focusIndex: i })}
          handleSelect={() => this.props.handleResultSelect(result)}
        />
      )
    })
  }

  renderContent (item) {
    if (this.props.importStatus.get('status') === 'none') {
      const title = importsHelper.parseFileName(item.get('filename'))

      return (
        <div>
          <div className='import-modal__search'>
            <input
              ref='search'
              type='text'
              placeholder='search'
              defaultValue={title}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className='import-modal__results'>
            {this.renderResults()}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderError () {
    if (this.props.importStatus.get('status') === 'error') {
      <div className='import-modal__error'>
        <p>{this.props.importStatus.get('data')}</p>
      </div>
    } else {
      return null
    }
  }

  render () {
    const { item } = this.props

    const isImporting = this.props.importStatus.get('status') === 'started'

    const modalClasses = classNames({
      'import-modal': true,
      'import-modal__expanded': !!this.props.results.size && !isImporting,
      'import-modal__loading': isImporting,
    })

    return (
      <Modal
        className={modalClasses}
        overlayClassName='import-modal__overlay'
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        closeTimeoutMS={500}
      >
        <header className='import-modal__header'>
          <h2>{item.get('filename')}</h2>
        </header>
        {this.renderError()}
        {this.renderContent(item)}
      </Modal>
    )
  }
}
