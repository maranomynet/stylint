// check if we're starting a hash
var openBracket = /\{$/,
    closeBracket = /\}$/,
    interpolation = /({\S)(\S)+[}]|([{]\S[}])/;

module.exports = function checkForBrackets( line, areWeInAHash ) {
    if ( typeof areWeInAHash === 'undefined' || typeof line === 'undefined' ) { return; }

    if ( !interpolation.test(line) ) {
        // ex .someClass {
        if ( openBracket.test(line) && line.indexOf('=') === -1 ) {
            return true;
        }
        // ex } when not in a hash and not an interpolated variable
        else if ( closeBracket.test(line) && !areWeInAHash ) {
            return true;
        }
        // no brackets on line at all
        else {
            return false;
        }
    }
}