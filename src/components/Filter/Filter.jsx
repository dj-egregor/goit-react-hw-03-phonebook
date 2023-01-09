import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

class Filter extends React.Component {
  updateFilter = event => {
    this.props.onFilter(event.target.value);
  };

  render() {
    return (
      <div className={css.searchWrapper}>
        <label className={css.label} htmlFor="filter">
          Find contacts by name
        </label>
        <input
          className={css.filterInput}
          type="text"
          name="filter"
          onChange={this.updateFilter}
          value={this.props.filter}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Filter;
