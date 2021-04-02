import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user =  localStorage.getItem("Token")!== null;  
  return (
    <Route
      {...rest}
      render={
        (props) => {
          if (user) {
            return <Component {...rest} {...props} />;
          }
          return (
            <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location,
                },
              }
            }
            />
          );
        }
      }
    />
  );
};

export default ProtectedRoute;