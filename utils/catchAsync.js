//middleware function to catch any errors (try and catch) for a function
module.exports = fn => {
    return( req , res, next ) => {
        fn(req , res , next).catch(next);
    }
}