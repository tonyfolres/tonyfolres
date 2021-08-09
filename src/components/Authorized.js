import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import localUser from 'src/utils/localUser';

const Authorized = ({ children, userTypes }) => {
  const { userId, firstName, lastName, userEmail, userType } = localUser.get();

  if (!userId || !firstName || !lastName || !userEmail || !userType) {
    return <Navigate to="/login" />;
  }

  if (!userTypes.includes(userType)) {
    return <Navigate to="/403" />;
  }

  return children;
};

Authorized.propTypes = {
  children: PropTypes.node.isRequired,
  userTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Authorized;
