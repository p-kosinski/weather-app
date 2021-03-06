import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassLocation, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchButton.module.scss';

const SearchButton = ({ onClickFunc, loading, error }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClickFunc();
  };

  return (
    <button
      className={error ? styles.error : styles.component}
      onClick={(event) => handleClick(event)}
      role='search'
      aria-label='search button'
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} spin />
              : <FontAwesomeIcon icon={faMagnifyingGlassLocation} />}
    </button>
  );
};

SearchButton.propTypes = {
  onClickFunc: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default SearchButton;