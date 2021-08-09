const set = ({ uid, email, firstName, lastName, type }) => {
  localStorage.setItem('userId', uid);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('userType', type);
};

const get = () => ({
  userId: localStorage.getItem('userId'),
  userEmail: localStorage.getItem('userEmail'),
  firstName: localStorage.getItem('firstName'),
  lastName: localStorage.getItem('lastName'),
  userType: localStorage.getItem('userType')
});

const clear = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('userType');
};

export default { set, get, clear };
