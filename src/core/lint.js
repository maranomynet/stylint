'use strict';

/**
 * @description runs tests according to config ( or all if strict is true )
 * @return void
 */
module.exports = function lint() {
	var checks = this.__proto__.lintMethods;
	var maxErrs = typeof this.config.maxErrors === 'number' ? this.config.maxErrors : false;
	var maxWarnings = typeof this.config.maxWarnings === 'number' ? this.config.maxWarnings : false;

	for ( var method in checks ) {
		if ( checks.hasOwnProperty( method ) ) {
			if ( this.config[method] ||
				( typeof this.config[method] !== 'undefined' && this.state.strictMode ) ) {
				// state.conf === 'always' || 'never' || etc
				this.state.conf = this.config[method].expect || this.config[method];
				// state.severity === 'error' || 'warning'
				this.state.severity = this.config[method].error ? 'Error' : 'Warning';
				// run the actual check against the line
				checks[method].call( this, this.cache.line );
				// if check puts us over either limit, kill stylint
				if ( maxErrs && this.cache.errs.length > this.config.maxErrors ) {
					return this.reporter('', 'done', 'kill');
				}
				if ( maxWarnings && this.cache.errs.length > this.config.maxWarnings ) {
					return this.reporter('', 'done', 'kill');
				}
			}
		}
	}

	// save our curr context so we can use it next time
	this.cache.prevFile = this.cache.file;
	this.cache.prevLine = this.cache.line;
};
