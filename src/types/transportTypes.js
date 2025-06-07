import PropTypes from "prop-types";

export const TransportRegisterDTO = PropTypes.shape({
    transport_name: PropTypes.string.isRequired,
    fuel_factor: PropTypes.number.isRequired,
    emission_factor: PropTypes.number.isRequired,
});