// propTypes.js
import PropTypes from 'prop-types';

export const UserLoginDTO = PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.number.isRequired
});

export const UserRegisterDTO = PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    admin: PropTypes.bool
});

export const UserResponseDTO = PropTypes.shape({
    user_id: PropTypes.number,
    username: PropTypes.string,
    password: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    admin: PropTypes.bool
});
