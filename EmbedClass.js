module.exports = class DiscordEmbed {
    /**
     *
     * @param {object} embedOptions - Embed Options
     * @param {string} embedOptions.type - Embed type
     */
    constructor(embedOptions = {}){

        this.embedOptions = embedOptions;
        this.setTitle(embedOptions.title)
        return this.embedOptions;
    }
    setTitle(title){
        this.embedOptions.title = title
    }


}
