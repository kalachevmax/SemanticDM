

/**
 * @interface
 */
dm.IEntityFactory = function() {};


/**
 * @param {string} type
 * @param {!Object} data
 * @return {dm.IEntity}
 */
dm.IEntityFactory.prototype.createEntity = function(type, data) {};
