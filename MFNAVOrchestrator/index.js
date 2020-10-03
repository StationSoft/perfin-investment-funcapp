/*
 * Orchestrator
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];

    const input = context.df.getInput();
    const fundIds = input.fundIds;

    context.df.setCustomStatus("Started");
    let percentComplete = 0;
    for (const [i, fundId] of fundIds.entries()) {
        outputs.push(yield context.df.callActivity("quandlAPI", fundId));
        percentComplete = (Math.round(((i+1) / fundIds.length)*10000)/100).toString()
        context.df.setCustomStatus(percentComplete+"% Complete...");
    }
    context.df.setCustomStatus("Finished");
    return outputs;
});