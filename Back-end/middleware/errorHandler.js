const AppError = require('../utils/errorUtil');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {  
  if (err instanceof AppError) {    
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Algo deu errado, por favor tente novamente mais tarde.',
  });
};

module.exports = errorHandler;
