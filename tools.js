module.exports = {
    inState: function(state) {
        return state === 'TX' ? true : false;
    },
    hasHistory: function(quoteHistory) {
        console.log(quoteHistory.length)
        return quoteHistory.length != 0 ? true : false;
    },
};