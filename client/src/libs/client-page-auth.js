import jwtDecode from 'jwt-decode';

export const isAdmin = (superOnly = false) => {
  const token = localStorage.getItem('token');
  if (token) {
    let decodedJWT = jwtDecode(token);
    const tokenExpiration = decodedJWT.exp
    let dateNow = new Date();
    if (tokenExpiration > dateNow.getTime() / 1000) {
      const {roles} = decodedJWT.user;
      if(superOnly){
        if(roles.includes('super-admin')){
          return true;
        }
      }else if(roles.includes('admin') || roles.includes('super-admin')){
        return true;
      }
    }
  }
  return false;
}