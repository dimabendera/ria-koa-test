var Memcached = require('memcached');
/**
 * App Good Manager
 * @module managers/goodManager
 */
(function () {
    var memcached = new Memcached('localhost:11211');

    module.exports = {
        /** 
         * Get from memcached
         * @param {String} key
         * @returns {Promise}
         **/
        findById: function (key) {
            return new Promise((resolve, reject) => {
                memcached.get( key, function( err, result ){
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                    memcached.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it
                });
            });
        },
        /** 
         * Post to memcached
         * @param {String} key
         * @param {String} value
         * @returns {Promise}
         **/
        set: function(key, value){
            return new Promise((resolve, reject) => {
                memcached.set( key, value, 10000, function( err, result ){
                    if(err){
                        reject(err);
                    }
                    resolve(key);
                    memcached.end();
            })});
        },
        /** 
         * Delete from memcached
         * @param {String} key
         * @returns {Promise}
         **/
        del: function(key){
            return new Promise((resolve, reject) => {
                memcached.del( key, function( err, result ){
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                    memcached.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it
                });
            });
        }
    }
}());