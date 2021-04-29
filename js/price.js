const tools = require('../js/tools.js');

module.exports = {
    getSuggestedPrice: function(loc, mon, qh, gal) {
        let locFactor    = 0.00;
        let rhFactor     = 0.00;
        let galFactor    = 0.00;
        let margin       = 0.00;
        const compFactor = 0.10;

        if(tools.inState(loc)) {
            locFactor = 0.02;
        } else {
            locFactor = 0.04;
        }

        if(tools.hasHistory(qh)) {
            rhFactor = 0.01;
        } else {
            rhFactor = 0.00;
        }

        if(gal > 1000) {
            galFactor = 0.02;
        } else {
            galFactor = 0.03;
        }

        margin = 1.50 * (locFactor - rhFactor + galFactor + compFactor);
        
        return (1.50 + margin).toFixed(3);
    },
    getTotal: function(gallons, suggestedPrice) {
        return (gallons * suggestedPrice).toFixed(3);
    }
};