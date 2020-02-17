import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, redirectTo = '/', ...props }) => {
  const { auth } = props
  return (
    <Route
      {...props}
      render={innerProps =>
        auth ? <Component {...innerProps} /> : <Redirect to={redirectTo} />
      }
    />
  )
}

export default PrivateRoute
