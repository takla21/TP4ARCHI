cassandra = require("cassandra-driver");

module.exports = function verifyAndParseFacture(body, isPut) {
    if(!Array.isArray(body.produits)) return ;
    
    const facture = {
        ...!isPut && {id : body.id || generateId()}, 
        produits : (body.produits || []).map(p => new cassandra.types.Tuple(p.nom, p.prix))
    }
    return facture
}

function generateId() {
    return Math.floor(Math.random() * Math.pow(2, 31))
}