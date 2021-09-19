import jwtDecode from 'jwt-decode';

// Setup config/headers and token
/**
 * 
 * @param {*} getState 
 * @param {string} ContentType 
 */
const tokenConfig = (ContentType) => {
  // Headers
  const headers = {
    'Content-type': ContentType
  };

  // If token, add to headers
  const token = localStorage.getItem('token');
  if (token) {
    let tokenExpiration = jwtDecode(token).exp;
    let dateNow = new Date();
    if (tokenExpiration > dateNow.getTime() / 1000) {
      headers['x-auth-token'] = token;
    }
  }
  return headers;
};

export default tokenConfig;