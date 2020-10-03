module.exports = async function (context, req, mf) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const fetch = require("node-fetch");

    var responseMessage = "init";
    var NAVs = [];
    const getMFNAV = async (fundId) => {
        var NAV = {};
        const response = await fetch("https://www.quandl.com/api/v3/datasets/AMFI/" + fundId + "?api_key=" + process.env["quandl_API_KEY"] + "&column_index=1&limit=1");
        const json = await response.json();
        NAV.fundName = json.dataset.name;
        NAV.latestNAVDate = json.dataset.data[0][0];
        NAV.latestNAV = json.dataset.data[0][1];

        return NAV;
    }

    if(mf) {
        for (var i = 0; i < mf.fundIds.length; i++){    
            NAVs.push(await getMFNAV(mf.fundIds[i]))
        }
        responseMessage = NAVs
    } else {
        responseMessage = "Mutual Fund investments for " + req.query.id + " not found";
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}