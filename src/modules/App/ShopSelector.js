import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

import styles from './App.module.scss'

const ShopSelector = props => {
  return (
    <ListGroup flush className={ styles.ShopSelector }>
      {props.shops && props.shops.map(shop => {
        return (
          <ListGroupItem key={ shop.id } tag={ NavLink } to={ `s/${shop.id}` } action>
            { shop.name }
          </ListGroupItem>
        )
      })}
      <ListGroupItem action tag={ NavLink } to="#">Dapibus ac facilisis in</ListGroupItem>
      <ListGroupItem action tag={ NavLink } to="#">Morbi leo risus</ListGroupItem>
    </ListGroup>
  )
}

ShopSelector.propTypes = {
  shops: PropTypes.array.isRequired
}

export default ShopSelector
