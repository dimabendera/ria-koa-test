/**
 * Goods Controller
 * @module controllers/goodsController
 */

const Goods = require('../managers/goodsManager'),
      co   = require('co');
      getBody = require('../helpers/getBody');
module.exports = {

    /** Get good info by id */
    getId: async function (ctx, next) {
        try{
            ctx.body = await Goods.findById(ctx.params.id);
            if(ctx.body  === undefined){
                throw new Error("Not exist");
            }
            ctx.status=200;

            await next();
        }catch(err){  
            ctx.throw(404, err);
        }
    },

    /** Post good */
    post: async function (ctx, next) {
        try{  
            let id;
            do{//Generate key
                id = Math.floor(Math.random() * 100000);
            }while(await Goods.findById(id));
            ctx.body = await Goods.set(id, await getBody(ctx.req));
            ctx.status=201;

            await next();
        }catch(err){   
            ctx.throw(400, err);
        }
    },

    /** Delete good by id */
    del: async function (ctx, next) {
        try{
            ctx.body = await Goods.del(ctx.params.id);
            if(!ctx.body){
                throw new Error("Not exist for delete");
            }
            ctx.status=204;

            await next();
        }catch(err){  
            ctx.throw(400, err);
        }
    }
};
