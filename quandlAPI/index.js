/*
 * QUANDL API
 */

const fetch = require("node-fetch");

module.exports = async function (context) {
    const fundId = context.bindings.fundId

    var NAV = {};
    const response = await fetch("https://www.quandl.com/api/v3/datasets/AMFI/" + fundId + "?column_index=1&limit=1&api_key=" + process.env["quandl_API_KEY"]);
    const json = await response.json();
    NAV.fundId = json.dataset.dataset_code;
    NAV.fundName = json.dataset.name;
    NAV.latestNAVDate = json.dataset.data[0][0];
    NAV.latestNAV = json.dataset.data[0][1];

    return NAV;
};