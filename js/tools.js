module.exports = {
    inState: function(state) {
        return state === 'TX' ? true : false;
    },
    hasHistory: function(quoteHistory) {
        return quoteHistory === undefined ? true : false;
    },
};