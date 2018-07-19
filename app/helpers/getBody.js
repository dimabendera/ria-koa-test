/**
 * Get body from request
 * @module GetBody
 * @param {Object} req
 * @returns {Promise}
 */
module.exports = (req)=>{
    return new Promise((resolve, reject) => {
        try{
            let data = "";//Parse req
            req.on('data', function(chunk) {
                data += chunk.toString();
            });
            req.on('end', function() {
                resolve(data);
            });
        }catch(err){
            reject(err);
        }
    });
};