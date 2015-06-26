

/**
 * @interface
 */
dm.IModificationProgressNotifier = function() {};


/**
 * @param {string} method
 * @param {string} status
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.IModificationProgressNotifier.prototype.notify = function(method, status) {};


/**
 * @param {string} entityType
 * @param {string} method
 * @param {dm.ModificationStatus} status
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IModificationProgressNotifier.prototype.addListener = function(entityType, method, status, handler) {};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.IModificationProgressNotifier.prototype.notifyStarted = function(method) {};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.IModificationProgressNotifier.prototype.notifyCompleted = function(method) {};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.IModificationProgressNotifier.prototype.notifyFailed = function(method) {};


/**
 * @param {string} entityType
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IModificationProgressNotifier.prototype.onStarted = function(entityType, method, handler) {};


/**
 * @param {string} entityType
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IModificationProgressNotifier.prototype.onCompleted = function(entityType, method, handler) {};


/**
 * @param {string} entityType
 * @param {string} method
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.IModificationProgressNotifier.prototype.onFailed = function(entityType, method, handler) {};


dm.IModificationProgressNotifier.prototype.removeAllListeners = function() {};
