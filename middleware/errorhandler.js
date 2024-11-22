const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  
  //validate for incorrect email
  if(err.message === 'incorrect email') {
    errors.email = 'The email is incorrect';
  }
  
  //validate for incorrect email
  if(err.message === 'incorrect password') {
    errors.password = 'The password is incorrect';
  }
  
  //duplicate error code
  if(err.code === 11000){
    errors.email = 'That email already registered';
    return errors;
  };
  
  //validate error message
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  };
  return errors;
}

module.exports = handleError;