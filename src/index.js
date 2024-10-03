const fastify = require('fastify')({
    logger : true,
    // htt2 : true
}); // root application instance


// fastify.addHook('onReady', function listener(done){ // hook :- trigger or callback :- notes
//     console.log("server is ready to take request");
//     done();
// })

// fastify.addHook('onClose', function listener(){
//     console.log("server is Stoping");
    
// })

// fastify.get('/ping', ()=>{
//     fastify.log.info(`incoming ping ............`);

//     return "pong";
// })


// register a request : 1
fastify.get('/ping',(req, res)=>{
    console.log(req); //infromation of request object
    return  "pong";
})

// register a post req: 2
fastify.route({
    url: '/hello',
    method: 'POST',
    handler : function(req,res){
        console.log(req.body);
        console.log(fastify);
        return "world";
    }
}) // fastify only supports the JSON and Text by default and for others we have to use fastify multipart kind of plugins


// Plugin
function samplePlugin(fastify, options, done){
    console.log("executing my plugin");
    fastify.decorate('key', 'value'); //decarates function attaches a key and corresponding of that , a value
    console.log(fastify);

    done();

}

fastify.register(samplePlugin, {});


const PORT =  3000;
async function start() {
    try {
        // fastify.log.info(`Server is up on PORT : ${PORT}`);

        await fastify.listen({port: PORT});
        console.log(`Server is up on PORT : ${PORT}`);

        // fastify.close();
    } catch (error) {
     console.log(error)   
    }
}

start();