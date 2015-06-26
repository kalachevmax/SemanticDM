

/**
 * @interface
 */
dm.IEntityModifier = function() {};


/**
 * @param {string} name
 * @param {!Function} method
 */
dm.IEntityModifier.prototype.registerModificationMethod = function(name, method) {};
