

/**
 * @interface
 */
dm.IEntityCache = function() {};


/**
 * @param {number} id
 * @return {dm.IEntity}
 */
dm.IEntityCache.prototype.getEntityById = function(id) {};


/**
 * @param {string} type
 * @param {!Object} data
 * @return {dm.IEntity}
 */
dm.IEntityCache.prototype.getEntity = function(type, data) {};


/**
 * @param {string} type
 * @return {dm.IEntity}
 */
dm.IEntityCache.prototype.getOneEntity = function(type) {};


/**
 * @param {!dm.IEntity} entity
 */
dm.IEntityCache.prototype.addEntity = function(entity) {};


/**
 * @param {!dm.IEntity} entity
 */
dm.IEntityCache.prototype.removeEntity = function(entity) {};


/**
 * @param {string} type
 * @param {function(!dm.IEntity)} handler
 */
dm.IEntityCache.prototype.forEachEntity = function(type, handler) {};


/**
 * @param {string} type
 * @param {function(boolean)} conditionHandler
 * @return {dm.IEntity}
 */
dm.IEntityCache.prototype.findEntity = function(type, conditionHandler) {};


/**
 * @param {string} type
 * @param {function(!dm.IEntity)} handler
 * @return {dm.IEntity}
 */
dm.IEntityCache.prototype.filterEntity = function(type, handler) {};
