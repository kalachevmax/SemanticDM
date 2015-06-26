

/**
 * @constructor
 * @implements {dm.IEntityModificationStrategy}
 * @param {string} entityType
 * @param {!dm.IModificationProgressNotifier} notifier
 * @param {dm.ModificationMethodsMap} modificationMethodsMap
 */
dm.EntityModificationStrategy = function(entityType, notifier, modificationMethodsMap) {
	/**
	 * @type {string}
	 */
	this.__entityType = entityType;

	/**
	 * @type {!dm.IModificationProgressNotifier}
	 */
	this.notifier = notifier;

	/**
	 * @type {!Object.<string, !Function>}
	 */
	this.__modificationMethods = {};

	this.__registerModificationMethods(modificationMethodsMap);
};


/**
 * @inheritDoc
 */
dm.EntityModificationStrategy.prototype.registerModificationMethod = function(name, method) {
	if (this.__modificationMethods[name] === undefined) {
		this.__modificationMethods[name] = method;
	}
};


/**
 * @param {dm.ModificationMethodsMap} modificationMethodsMap
 */
dm.EntityModificationStrategy.prototype.__registerModificationMethods = function(modificationMethodsMap) {
	for (var i = 0; i < modificationMethodsMap.length; i++) {
		var name = modificationMethodsMap[i][0];
		var method = modificationMethodsMap[i][1];
		this.registerModificationMethod(name, method);
	}
};


/**
 * @inheritDoc
 */
dm.EntityModificationStrategy.prototype.modify = function(modificationMethod, opt_args) {
	return this.__modificationMethods[modificationMethod] !== undefined ?
			this.__modificationMethods[modificationMethod].apply(this, opt_args) :
			fm.cancelAction('[dm.EntityModificationStrategy] modify ' +
				this.__entityType + ' : can\'t find modificationMethod "' + modificationMethod + '"');
};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.EntityModificationStrategy.prototype.notifyStarted = function(method) {
	return this.notifier.notifyStarted(method);
};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.EntityModificationStrategy.prototype.notifyCompleted = function(method) {
	return this.notifier.notifyCompleted(method);
};


/**
 * @param {string} method
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.EntityModificationStrategy.prototype.notifyFailed = function(method) {
	return this.notifier.notifyFailed(method);
};


/**
 * @inheritDoc
 */
dm.EntityModificationStrategy.prototype.onStarted = function(method, handler) {
	this.notifier.onStarted(this.__entityType, method, handler);
};


/**
 * @inheritDoc
 */
dm.EntityModificationStrategy.prototype.onCompleted = function(method, handler) {
	this.notifier.onCompleted(this.__entityType, method, handler);
};


/**
 * @inheritDoc
 */
dm.EntityModificationStrategy.prototype.onFailed = function(method, handler) {
	this.notifier.onFailed(this.__entityType, method, handler);
};
