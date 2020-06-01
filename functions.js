module.exports = {
    formatDate: function(date){
        return new Intl.DateTimeFormat("en-US").format(date)
    },
    rollDice: function(dice, number){
        return Math.floor(Math.random() * 6)
    },
    genNumber: function(number, random){
        return Math.floor(Math.random() * (number * random))
    }
   
}