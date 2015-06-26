

/**
 * @constructor
 * @param {string} entityType
 * @param {!dm.IEntityModificationStrategy} modificationStrategy
 */
dm.EntityAccessor = function(entityType, modificationStrategy) {
	/**
	 * @type {string}
	 */
	this.__entityType = entityType;

	/**
	 * @type {!dm.IEntityModificationStrategy}
	 */
	this.__modificationStrategy = modificationStrategy;
};


/**
 * @return {string}
 */
dm.EntityAccessor.prototype.getEntityType = function() {
	return this.__entityType;
};


/**
 * @return {!dm.IEntityModificationStrategy}
 */
dm.EntityAccessor.prototype.getModificationStrategy = function() {
	return this.__modificationStrategy;
};


/**
 * @inheritDoc
 */
dm.EntityAccessor.prototype.modify = function(method, opt_args) {
	return fm.script([
		this.__modificationStrategy.modify.apply(this.__modificationStrategy, opt_args),
		this.__modificationStrategy.notifyCompleted(method)
	]);
};


/**
 * @inheritDoc
 */
dm.EntityAccessor.prototype.onCompleted = function(method, handler) {
	this.__modificationStrategy.onCompleted(method, handler);
};


/**
 * @inheritDoc
 */
dm.EntityAccessor.prototype.onStarted = function(method, handler) {
	this.__modificationStrategy.onStarted(method, handler);
};


/**
 * @inheritDoc
 */
dm.EntityAccessor.prototype.onFailed = function(method, handler) {
	this.__modificationStrategy.onFailed(method, handler);
};


/**
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
app.dm.EntityAccessor.prototype.onCreated = function(handler) {
	this.onCompleted(dm.ModificationMethod.CREATE, handler);
};


/**
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
app.dm.EntityAccessor.prototype.onUpdated = function(handler) {
	this.onCompleted(dm.ModificationMethod.UPDATE, handler);
};


/**
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
app.dm.EntityAccessor.prototype.onDeleted = function(handler) {
	this.onCompleted(dm.ModificationMethod.DELETE, handler);
};
