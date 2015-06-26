

/**
 * @constructor
 * @extends {events.Event}
 * @template T
 * @param {!events.IEventEmitter} target
 * @param {!fm.IEntity} entity
 * @param {string} modificationMethod
 * @param {dm.ModificationStatus} status
 */
dm.ModificationProgressEvent = function(target, entity, modificationMethod, status) {
	events.Event.call(this, target, dm.EventType.ENTITY_MODIFICATION);

	/**
	 * @type {T}
	 */
	this.__entity = entity;

	/**
	 * @type {string}
	 */
	this.__modificationMethod = modificationMethod;

	/**
	 * @type {dm.ModificationStatus}
	 */
	this.__status = status;
};

utils.inherit(dm.ModificationProgressEvent, events.Event);


/**
 * @return {T}
 */
dm.ModificationProgressEvent.prototype.getEntity = function() {
	return this.__entity;
};


/**
 * @return {string}
 */
dm.ModificationProgressEvent.prototype.getModificationMethod = function() {
	return this.__modificationMethod;
};


/**
 * @return {dm.ModificationStatus}
 */
dm.ModificationProgressEvent.prototype.getStatus = function() {
	return this.__status;
};
