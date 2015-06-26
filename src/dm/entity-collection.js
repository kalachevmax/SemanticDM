

/**
 * @constructor
 * @implements {dm.IEntity}
 * @template T
 * @param {string} entityType
 * @param {string} itemType
 */
dm.EntityCollection = function(entityType, itemType) {
	/**
	 * @type {number}
	 */
	this.__id = dm.getNextId();

	/**
	 * @type {string}
	 */
	this.__entityType = entityType;

	/**
	 * @type {string}
	 */
	this.__itemType = itemType;

	/**
	 * @type {!Array.<T>}
	 */
	this.__items = [];
};


/**
 * @inheritDoc
 */
dm.EntityCollection.prototype.getId = function() {
	return this.__id;
};


/**
 * @inheritDoc
 */
dm.EntityCollection.prototype.getType = function() {
	return this.__entityType;
};


/**
 * @param {number} index
 * @return {T}
 */
dm.EntityCollection.prototype.get = function(index) {
	return this.__items[index] || null;
};


/**
 * @return {!Array.<T>}
 */
dm.EntityCollection.prototype.getItems = function() {
	return this.__items;
};


/**
 * @param {T} item
 */
dm.EntityCollection.prototype.add = function(item) {
	this.__items.push(item);
};


/**
 * @param {number} index
 */
dm.EntityCollection.prototype.remove = function(index) {
	this.__items.splice(index, 1);
};


/**
 * @return {boolean}
 */
dm.EntityCollection.prototype.isEmpty = function() {
	return this.__items.length === 0;
};


/**
 * @param {function(T)} handler
 */
dm.EntityCollection.prototype.forEach = function(handler) {
	var i = 0,
			l = this.__items.length;

	while (i < l) {
		handler(this.__items[i]);
		i++;
	}
};


/**
 * @inheritDoc
 */
dm.EntityCollection.prototype.populate = function(data) {
	this.__items = dm.reconstructEntities(this.__itemType, data);
	return this;
};


/**
 * @inheritDoc
 */
dm.EntityCollection.prototype.serialize = function(opt_name) {
	var result = [];

	for (var i = 0, l = this.__items.length; i < l; i++) {
		result.push(this.__items[i].serialize());
	}

	var data = opt_name ? {opt_name: result} : result;
	return utils.obj.serialize(data);
};
