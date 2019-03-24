import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, NavLink, withRouter } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

import styles from './Model.module.scss'
import ModelIndex from './ModelIndex'
import ModelNew from './ModelNew'
import ModelShow from './ModelShow'
import Toolbar from './Toolbar'
import Searchbar from './Searchbar'
import { ArrayByChunks } from './Helpers'

const Model = props => {
  const [indexMode, setIndexMode] = useState(true)
  const [newMode, setNewMode] = useState(false)
  const [showSearchbar, setShowSearchbar] = useState(false)

  const isIndexMode = pathname => {
    return pathname === props.parentPath
  }

  const isNewMode = pathname => {
    return pathname === (props.parentPath + '/new')
  }

  useEffect(() => {
    setIndexMode(isIndexMode(props.history.location.pathname))
    setNewMode(isNewMode(props.history.location.pathname))
    const unlisten = props.history.listen((location) => {
      setIndexMode(isIndexMode(location.pathname))
      setNewMode(isNewMode(location.pathname))
    })

    return () => unlisten()
  }, [])

  const getTableColumns = () => {
    return props.fields.filter(field => !field.hideInTable).map(field => (
      {
        key: field.key,
        type: field.type,
        path: field.path,
        label: field.tableLabel || field.label
      }
    ))
  }
  const getFormRows = () => {
    const formFields = props.fields.filter(field => !field.hideInForm).map(field => (
      {
        ...field,
        label: field.formLabel || field.label,
        span: 6
      }
    ))
    return ArrayByChunks(formFields, 2)
  }
  const tableColumns = getTableColumns()
  const formRows = getFormRows()

  const goToNew = () => {
    props.history.push(props.parentPath + '/new')
  }

  const toggleSearch = () => {
    setShowSearchbar(!showSearchbar)
  }

  const onRowClicked = record => {
    props.history.push(props.parentPath + '/' + record.id)
  }

  const homeBreadcrumbItem = () => {
    return (
      <BreadcrumbItem>
        <NavLink to='/'>Home</NavLink>
      </BreadcrumbItem>
    )
  }

  const mainBreadcrumbItem = () => {
    if (indexMode) {
      return <BreadcrumbItem active>{ props.title }</BreadcrumbItem>
    } else {
      return (
        <BreadcrumbItem>
          <NavLink to={ props.parentPath }>{ props.title }</NavLink>
        </BreadcrumbItem>
      )
    }
  }

  const getIdParam = () => {
    return props.history.location.pathname.split('/').slice(-1)[0]
  }

  const subBreadcrumbItem = () => {
    if (indexMode) {
      return null
    } else {
      const label = newMode ? 'New' : getIdParam()
      return <BreadcrumbItem active>{ label }</BreadcrumbItem>
    }
  }

  const onDelete = id => {
    props.onDelete(id)
    setIndexMode(true)
  }

  // rows={ formRows } onQuery={ props.onQueryOne } onUpdate={ props.onUpdate } onDelete={ onDelete } record={ props.currentRecord }
  const showProps = {
    rows: formRows,
    onQuery: props.onQueryOne,
    onUpdate: props.onUpdate,
    onDelete: onDelete,
    record: props.currentRecord
  }

  return (
    <div className={ styles.Model }>
      <Row className='small-gutters'>
        <Col md={ newMode ? '12' : '9'}>
          <Breadcrumb tag='nav' listTag='div'>
            { homeBreadcrumbItem() }
            { mainBreadcrumbItem() }
            { subBreadcrumbItem() }
          </Breadcrumb>
        </Col>
        { !newMode && <Col md='3'><Toolbar onAddClicked={ goToNew } onSearchClicked= { toggleSearch } /></Col> }
      </Row>
      {showSearchbar && <Searchbar fields={ props.fields } />}
      <Row className='small-gutters'>
        <Col md={indexMode ? '12' : '3'}>
          <Card>
            <ModelIndex
              collapsed={ !indexMode }
              columns={ tableColumns }
              records={ props.records }
              onQuery={ props.onQuery }
              onRowClicked={ onRowClicked } />
          </Card>
        </Col>
        { !indexMode && <Col md='9'>
          <Card>
            <Switch>
              <Route
                path={ props.parentPath + '/new' }
                component={ routeProps => <ModelNew { ...routeProps } rows={ formRows } onCreate={ props.onCreate } />} />
              <Route
                path={ props.parentPath + '/:id' }
                component={ routeProps => <ModelShow { ...routeProps } { ... showProps} />} />
            </Switch>
          </Card>
        </Col> }
      </Row>
    </div>
  )
}

Model.propTypes = {
  title: PropTypes.string.isRequired,
  parentPath: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  currentRecord: PropTypes.object,
  disableCreate: PropTypes.bool,
  disableUpdate: PropTypes.bool,
  disableDelete: PropTypes.bool,
  onQuery: PropTypes.func.isRequired,
  onQueryOne: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

Model.defaultProps = {
  disableCreate: false,
  disableUpdate: false,
  disableDelete: false
}

export default withRouter(Model)
