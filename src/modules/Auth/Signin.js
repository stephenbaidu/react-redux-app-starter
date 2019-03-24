import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'

import styles from './Auth.module.scss'
import logo from '../../assets/images/logo.png'
import * as actionTypes from '../../store/actions/actionTypes'

const Signin = props => {
  if (props.signedIn) {
    return <Redirect to={ props.authRedirectPath }/>
  }

  const [data, setData] = useState({ email: '', password: '' })

  const handleOnChange = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onSignin(data)
  }

  const activeButton = <Button color="primary" size="lg" type="submit" block>Sign in</Button>
  const loadingButton = <Button color="primary" size="lg" type="submit" outline block disabled>Signing in...</Button>

  return (
    <div className={ styles.Signin }>
      <Form className="form-signin" onSubmit={ onSubmit }>
        <div className="text-center mb-4">
          <img className="rounded mb-4" src={ logo } alt="" width="90" height="90" />
          <h1 className="h3 mb-3 font-weight-normal">Login credentials</h1>
        </div>

        <div className="form-label-group">
          <Input type="email" name="email" className="form-control" value={ data.email } onChange={ handleOnChange } placeholder="Email address" required />
          <Label for="email">Email address</Label>
        </div>

        <div className="form-label-group">
          <Input type="password" name="password" className="form-control" value={ data.password } onChange={ handleOnChange } placeholder="Password" required />
          <Label for="password">Password</Label>
        </div>

        <FormGroup check>
          <Label>
            <Input type="checkbox" value="remember-me" /> Remember me
          </Label>
        </FormGroup>
        { props.loading ? loadingButton : activeButton }
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2019</p>
      </Form>
    </div>
  )
}

Signin.propTypes = {
  authRedirectPath: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    csrf: state.auth.csrf,
    error: state.auth.error,
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (params) => dispatch({ type: actionTypes.LOGIN_START, payload: params })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)