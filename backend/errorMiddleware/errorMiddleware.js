const errorHandler = (err ,req ,res , next) =>{
    let statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message : err.message ,
        stack : (process.env.NODE_ENV === 'Development') ? err.stack : null
    })
};

module.exports = errorHandler;