

/**
 * @constructor
 * @implements {dm.IEntity}
 * @param {string} type
 */
dm.Entity = function(type) {
	/**
	 * @type {number}
	 */
	this.__id = dm.getNextId();

  /**
   * @type {string}
   */
  this.__type = type;
};


/**
 * @inheritDoc
 */
dm.Entity.prototype.getId = function() {
	return this.__id;
};


/**
 * @inheritDoc
 */
dm.Entity.prototype.getType = function() {
  return this.__type;
};


/**
 * @inheritDoc
 */
dm.Entity.prototype.populate = function(data) {};


/**
 * @inheritDoc
 */
dm.Entity.prototype.serialize = function(opt_name) {};
