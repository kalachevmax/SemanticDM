

/**
 * @constructor
 * @implements {dm.IEntityCache}
 */
dm.EntityCache = function () {
	/**
	 * @type {!Object.<number, !dm.IEntity>}
	 */
	this.__entities = {};

	/**
	 * @type {!Object.<string, !Object.<string, !dm.IEntity>>}
	 */
	this.__types = {};
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.getEntityById = function (id) {
	return this.__entities[id] || null;
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.getEntity = function (type, data) {
	return null;
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.getOneEntity = function (type) {
	for (var id in this.__types[type]) {
		return this.__types[type][id];
	}

	return null;
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.addEntity = function (entity) {
	var id = entity.getId();
	var type = entity.getType();

	if (this.__entities[id] === undefined) {
		this.__entities[id] = entity;
	}

	if (this.__types[type] === undefined) {
		this.__types[type] = {};
	}

	if (this.__types[type][id] === undefined) {
		this.__types[type][id] = entity;
	}
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.removeEntity = function (entity) {
	var id = entity.getId();

	if (this.__entities[id] !== undefined) {
		delete this.__entities[id];
		delete this.__types[entity.getType()][id];
	}
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.forEachEntity = function (type, handler) {
	var types = this.__types;

	for (var id in types[type]) {
		handler(types[type][id]);
	}
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.findEntity = function (type, conditionHandler) {
	var types = this.__types;

	for (var id in types[type]) {
		var entity = types[type][id];

		if (conditionHandler(entity)) {
			return entity;
		}
	}

	return null;
};


/**
 * @inheritDoc
 */
dm.EntityCache.prototype.filterEntity = function (type, handler) {
	var types = this.__types;

	for (var id in types[type]) {
		var result = handler(types[type][id]);

		if (result !== undefined) {
			return result;
		}
	}

	return null;
};

