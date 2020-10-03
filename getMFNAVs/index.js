/*
 * Client
 */

const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);
    var orchestratorInput = {
        clientId: req.query.id,
        fundIds: []
    }
    const mf = context.bindings.mf
    if(mf) {
        orchestratorInput.fundIds = mf.fundIds
    }
    const instanceId = await client.startNew(req.params.functionName, undefined, orchestratorInput);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};