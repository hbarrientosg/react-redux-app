import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link to={filter === 'all' ? "/" : filter }
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}>
    {children}
  </Link>
)

export default FilterLink;
