import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import classNames from 'classnames'
import Mousetrap from 'mousetrap'

import ImportModal from '../components/ImportModal'
import ImportItem from '../components/ImportItem'
import * as importsHelper from '../helpers/imports'
import actions from '../actions'
import 'styles/importer.scss'

class Importer extends Component {
  static get propTypes () {
    return {
      state: object.isRequired,
      actions: object.isRequired,
    }
  }

  constructor () {
    super()
    this.state = {
      focusIndex: -1,
      selectedImport: null,
      openImport: false,
    }

    this.handleFocusItem = this.handleFocusItem.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.focusPrevItem = this.focusPrevItem.bind(this)
    this.focusNextItem = this.focusNextItem.bind(this)
  }

  componentWillMount () {
    this.props.actions.loadImports()
  }

  componentDidMount () {
    Mousetrap.bind(['up'], this.focusPrevItem)
    Mousetrap.bind(['down'], this.focusNextItem)
    this.focusFirstItem()
  }

  componentWillUnmount () {
    Mousetrap.unbind(['up', 'down'])
  }

  componentWillUpdate (nextProps, nextState) {
    const oldImportState = this.props.state.get('importStatus').get('status')
    const newImportState = nextProps.state.get('importStatus').get('status')

    if (oldImportState === 'started' && newImportState === 'finished') {
      this.setState({ openImport: false })
      this.props.actions.clearImport()
    } else if (!this.state.openImport && nextState.openImport) {
      Mousetrap.unbind(['up', 'down'])
    } else if (this.state.openImport && !nextState.openImport) {
      Mousetrap.bind(['up'], this.focusPrevItem)
      Mousetrap.bind(['down'], this.focusNextItem)
      this.focusFirstItem()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.state.get('imports').size) {
      this.focusFirstItem()
    }
  }

  focusFirstItem () {
    if (this.props.state.get('imports').size) {
      this.refs['item-0'].refs.item.focus()
    }
  }

  focusNextItem () {
    const items = this.props.state.get('imports')
    const index = (this.state.focusIndex + 1) % items.size
    this.refs[`item-${index}`].refs.item.focus()
  }

  focusPrevItem () {
    const items = this.props.state.get('imports')
    const index = (this.state.focusIndex + items.size - 1) % items.size
    this.refs[`item-${index}`].refs.item.focus()
  }

  handleFocusItem (i) {
    this.setState({
      focusIndex: i,
      selectedImport: this.props.state.getIn(['imports', i]),
    })
  }

  handleResultSelect (result) {
    const media = importsHelper.tmdbToMedia(result)
    media.mediaFiles.push(this.state.selectedImport.get('filepath'))
    this.props.actions.processImport(this.state.selectedImport, media)
  }

  renderItems () {
    const imports = this.props.state.get('imports')

    return imports.map((item, i) => {
      return (
        <ImportItem
          key={item.hashCode()}
          ref={`item-${i}`}
          item={item}
          handleFocus={() => this.handleFocusItem(i)}
          handleImport={() => this.setState({ openImport: true })}
        />
      )
    })
  }

  renderContent () {
    const imports = this.props.state.get('imports')

    if (imports.size) {
      return this.renderItems()
    } else {
      return (
        <p>No items found</p>
      )
    }
  }

  render () {
    const { state, actions } = this.props

    const importerClasses = classNames({
      'import-item-container': true,
      'import-item-container__faded': this.state.openImport,
    })

    return (
      <div className={importerClasses}>
        <ImportModal
          actions={actions}
          item={state.getIn(['imports', this.state.focusIndex], Map())}
          results={state.get('movieResults')}
          handleResultSelect={this.handleResultSelect}
          isOpen={this.state.openImport}
          onRequestClose={() => this.setState({ openImport: false })}
          importStatus={state.get('importStatus')}
        />
        <h2>Importable Media Files</h2>
        <div className='import-item-list'>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Importer)
