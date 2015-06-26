

/**
 * @interface
 * @template T
 */
dm.IEntityModificationStrategy = function() {};


/**
 * @param {string} name
 * @param {!Function} method
 */
dm.IEntityModificationStrategy.prototype.registerModificationMethod = function(name, method) {};


/**
 * @param {string} modificationMethod
 * @param {(*|!Array)=} opt_args
 * @return {fm.Action.<T>}
 */
dm.IEntityModificationStrategy.prototype.modify = function(modificationMethod, opt_args) {};


/**
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IEntityModificationStrategy.prototype.onStarted = function(method, handler) {};


/**
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IEntityModificationStrategy.prototype.onCompleted = function(method, handler) {};


/**
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IEntityModificationStrategy.prototype.onFailed = function(method, handler) {};
