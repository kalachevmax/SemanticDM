

/**
 * @interface
 */
dm.IEntity = function() {};


/**
 * @return {number}
 */
dm.IEntity.prototype.getId = function() {};


/**
 * @return {string}
 */
dm.IEntity.prototype.getType = function() {};


/**
 * @param {!Object} data
 * @return {!dm.IEntity}
 */
dm.IEntity.prototype.populate = function(data) {};


/**
 * @param {string=} opt_name
 * @return {string}
 */
dm.IEntity.prototype.serialize = function(opt_name) {};
