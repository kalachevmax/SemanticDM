

/**
 * @constructor
 * @extends {events.EventEmitter}
 * @implements {dm.IModificationProgressNotifier}
 */
dm.ModificationProgressNotifier = function() {
	events.EventEmitter.call(this);
};

utils.inherit(dm.ModificationProgressNotifier, events.EventEmitter);


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notify = function(method, status) {
	var self = this;

	return fm.action(function(entity) {
		self.emit(new dm.ModificationProgressEvent(self, entity, method, status));
	});
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.addListener = function(entityType, method, status, handler) {
	this.addListener(dm.EventType.ENTITY_MODIFICATION, this.handleEntityModificationEvent(entityType, method, status, handler));
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyStarted = function(method) {
	return this.notify(method, dm.ModificationStatus.STARTED);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyCompleted = function(method) {
	return this.notify(method, dm.ModificationStatus.COMPLETED);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyFailed = function(method) {
	return this.notify(method, dm.ModificationStatus.FAILED);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyCreateStarted = function() {
	return this.notifyStarted(dm.ModificationMethod.CREATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyUpdateStarted = function() {
	return this.notifyStarted(dm.ModificationMethod.UPDATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyDeleteStarted = function() {
	return this.notifyStarted(dm.ModificationMethod.DELETE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyCreated = function() {
	return this.notifyCompleted(dm.ModificationMethod.CREATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyUpdated = function() {
	return this.notifyCompleted(dm.ModificationMethod.UPDATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyDeleted = function() {
	return this.notifyCompleted(dm.ModificationMethod.DELETE);
};


/**
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.ModificationProgressNotifier.prototype.notifyPopulated = function() {
	return this.notifyCompleted(dm.ModificationMethod.POPULATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyCreateFailed = function() {
	return this.notifyFailed(dm.ModificationMethod.CREATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyUpdateFailed = function() {
	return this.notifyFailed(dm.ModificationMethod.UPDATE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.notifyDeleteeFailed = function() {
	return this.notifyFailed(dm.ModificationMethod.DELETE);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onStarted = function(entityType, method, handler) {
	this.addListener(dm.EventType.ENTITY_MODIFICATION, this.handleEntityModificationEvent(entityType, method, dm.ModificationStatus.STARTED, handler));
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onCompleted = function(entityType, method, handler) {
	this.addListener(dm.EventType.ENTITY_MODIFICATION, this.handleEntityModificationEvent(entityType, method, dm.ModificationStatus.COMPLETED, handler));
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onFailed = function(entityType, method, handler) {
	this.addListener(dm.EventType.ENTITY_MODIFICATION, this.handleEntityModificationEvent(entityType, method, dm.ModificationStatus.FAILED, handler));
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onCreateStarted = function(entityType, handler) {
	return this.onStarted(entityType, dm.ModificationMethod.CREATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onUpdateStarted = function(entityType, handler) {
	return this.onStarted(entityType, dm.ModificationMethod.UPDATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onDeleteStarted = function(entityType, handler) {
	return this.onStarted(entityType, dm.ModificationMethod.DELETE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onCreated = function(entityType, handler) {
	return this.onCompleted(entityType, dm.ModificationMethod.CREATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onUpdated = function(entityType, handler) {
	return this.onCompleted(entityType, dm.ModificationMethod.UPDATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onDeleted = function(entityType, handler) {
	return this.onCompleted(entityType, dm.ModificationMethod.DELETE, handler);
};


/**
 * @param {string} entityType
 * @param {function(!dm.ModificationProgressEvent)} handler
 */
dm.ModificationProgressNotifier.prototype.onPopulated = function(entityType, handler) {
	return this.onCompleted(entityType, dm.ModificationMethod.POPULATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onCreateFailed = function(entityType, handler) {
	return this.onFailed(entityType, dm.ModificationMethod.CREATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onUpdateFailed = function(entityType, handler) {
	return this.onFailed(entityType, dm.ModificationMethod.UPDATE, handler);
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.onDeleteFailed = function(entityType, handler) {
	return this.onFailed(entityType, dm.ModificationMethod.DELETE, handler);
};


/**
 * @param {string} entityType
 * @param {string} method
 * @param {dm.ModificationStatus} status
 * @param {function(!dm.ModificationProgressEvent)} handler
 * @return {function(!dm.ModificationProgressEvent)}
 */
dm.ModificationProgressNotifier.prototype.handleEntityModificationEvent = function(entityType, method, status, handler) {
	/**
	 * @param {!dm.ModificationProgressEvent} event
	 */
	function handleEntityModification(event) {
		if (event.getEntity().getType() === entityType &&
				event.getModificationMethod() === method &&
				event.getStatus() === status) {

			handler(event);
		}
	}

	return handleEntityModification;
};


/**
 * @inheritDoc
 */
dm.ModificationProgressNotifier.prototype.removeAllListeners = function() {
	this.removeAllListeners();
};
