const logger = {
    color : {green :  "\x1b[32m", red : "\x1b[31m", yellow : "\x1b[33m", clear : "\x1b[0m" },
    info : function (text) {
        console.info(`${this.color.green}${text} ${this.color.clear}`)
    },
    error : function (text) {
        console.error(`${this.color.red}${text} ${this.color.clear}`)
    },
    warn : function (text) {
        console.warn(`${this.color.yellow}${text} ${this.color.clear}`)
    }
}

module.exports = logger