const tools = require('../js/tools.js');

module.exports = {
    getSuggestedPrice: function(loc, qh, gal) {
        let locFactor    = 0.0;
        let rhFactor     = 0.0;
        let galFactor    = 0.0;
        let rfFactor     = 0.0;
        let margin       = 0.0;
        const compFactor = 0.10;

        if(tools.inState(loc)) {
            locFactor = 0.02;
        } else {
            locFactor = 0.04;
        }

        if(tools.hasHistory(qh)) {
            rhFactor = 0.01;
        } else {
            rhFactor = 0.0;
        }

        if(gal > 1000) {
            galFactor = 0.02;
        } else {
            galFactor = 0.03;
        }

        margin = 1.50 * (locFactor - rhFactor + galFactor + compFactor + rfFactor);
        
        return (1.50 + margin).toFixed(2);
    },
    getTotal: function(gallons, suggestedPrice) {
        return (gallons * suggestedPrice).toFixed(2);
    }
};