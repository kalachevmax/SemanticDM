

/**
 * @namespace
 */
var dm = {};


/**
 * @typedef {!Array.<!Array.<string|!Function>>}
 */
dm.ModificationMethodsMap;


/**
 * @type {number}
 */
dm.__currentId = 0;


/**
 * @type {!Object.<number, !Array.<number>>}
 */
dm.__links = {};


/**
 * @type {!Object.<string, !dm.IEntityFactory>}
 */
dm.__entityFactories = {};


/**
 * @type {dm.IEntityCache}
 */
dm.__entityCache = null;


/**
 * @type {!Object.<string, Object.<string, !dm.IEntityModificationStrategy>>}
 */
dm.__modificationStrategies = {};


/**
 * @param {dm.IModificationProgressNotifier} notifier
 */
dm.__notifier = null;


/**
 * @return {number}
 */
dm.getNextId = function() {
	return dm.__currentId += 1;
};


/**
 * @param {!dm.IEntityFactory} factory
 * @param {!Array.<string>} types
 */
dm.registerEntityFactory = function(factory, types) {
  for (var i = 0, l = types.length; i < l; i += 1) {
    dm.__entityFactories[types[i]] = factory;
  }
};


/**
 * @param {dm.IEntityCache} cache
 */
dm.registerEntityCache = function(cache) {
	dm.__entityCache = cache;
};


/**
 * @param {number} id
 * @return {dm.Entity}
 */
dm.getEntityById = function(id) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.getEntityById(id);
	}

	return null;
};


/**
 * @param {string} type
 * @return {dm.Entity}
 */
dm.getOneEntity = function(type) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.getOneEntity(type);
	}

  return null;
};


/**
 * @param {string} type
 * @param {number} data
 * @return {dm.IEntity}
 */
dm.getEntity = function(type, data) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.getEntity(type, data);
	}

	return null;
};


/**
 * @param {string} type
 * @param {function(!dm.Entity)} handler
 */
dm.forEachEntity = function(type, handler) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.forEachEntity(type, handler);
	}

	return null;
};


/**
 * @param {string} type
 * @param {function(boolean)} conditionHandler
 */
dm.findEntity = function(type, conditionHandler) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.findEntity(type, conditionHandler);
	}

	return null;
};


/**
 * @param {string} type
 * @param {function(dm.Entity)} handler
 */
dm.filterEntity = function(type, handler) {
	if (dm.__entityCache !== null) {
		return dm.__entityCache.filterEntity(type, handler);
	}

	return null;
};


/**
 * @param {string} type
 * @param {!Object} data
 * @return {dm.Entity}
 */
dm.reconstructEntity = function(type, data) {
	var entity = dm.getEntity(type, data);

	if (entity === null) {
		if (dm.__entityFactories[type] !== undefined) {
			entity = dm.__entityFactories[type].createEntity(type, data);

			if (dm.__entityCache !== null) {
				dm.__entityCache.addEntity(entity);
			}
		} else {
			console.log('[dm.reconstructEntity] can\'t find entity factory for entity type "' + type + '"');
		}
	} else {
		entity.populate(data);
	}

	return entity;
};



/**
 * @param {string} type
 * @param {!Array.<!Object>} data
 * @return {!Array.<!dm.Entity>}
 */
dm.reconstructEntities = function(type, data) {
  var result = [];

  for (var i = 0, l = data.length; i < l; i += 1) {
		var entity = dm.reconstructEntity(type, data[i]);

    if (entity !== null) {
      result.push(entity);
    }
  }

  return result;
};


/**
 * @param {!dm.Entity} entity1
 * @param {!dm.Entity} entity2
 */
dm.addLink = function(entity1, entity2) {
	var id1 = entity1.getId();
	var id2 = entity2.getId();

	if (dm.__links[id1] === undefined) {
		dm.__links[id1] = [id2]
	} else {
		if (utils.arr.indexOf(id2, dm.__links[id1]) === -1) {
			dm.__links[id1].push(id2);
		}
	}
};


/**
 * @param {!dm.Entity} entity1
 * @param {!dm.Entity} entity2
 */
dm.removeLink = function(entity1, entity2) {
	var id1 = entity1.getId();
	var id2 = entity2.getId();

	if (dm.__links[id1] !== undefined) {
		var index = utils.arr.indexOf(id2, dm.__links[id1]);

		if (index !== -1) {
			dm.__links[id1].splice(index, 1);
		}
	}
};


/**
 * @param {!dm.Entity} entity
 * @param {string} linkType
 */
dm.getLinksCount = function(entity, linkType) {
	var links = this.__links[entity.getId()] || [];
	var count = 0;

	for (var i = 0, l = links.length; i < l; i += 1) {
		var linkEntity = this.getEntityById(links[i]);

		if (linkEntity !== null && linkEntity.getType() === linkType) {
			count += 1;
		}
	}

	return count;
};


/**
 * @param {!dm.Entity} entity
 * @param {string} linkType
 * @param {function(!dm.Entity)} handler
 */
dm.filterLinksByType = function(entity, linkType, handler) {
	var links = this.__links[entity.getId()] || [];

	for (var i = 0, l = links.length; i < l; i += 1) {
		var linkEntity = this.getEntityById(links[i]);

		if (linkEntity !== null && linkEntity.getType() === linkType) {
			handler(linkEntity);
		}
	}
};


dm.dumpLinks = function() {
	var links = this.__links;

	for (var id in links) {
		console.log(dm.getEntityById(id), ':');
		var entityLinks = [];

		for (var i = 0, l = links[id].length; i < l; i += 1) {
			entityLinks.push(dm.getEntityById(links[id][i]));
		}

		console.log(entityLinks);
	}
};


/**
 * @param {!dm.IModificationProgressNotifier} notifier
 */
dm.registerNotifier = function(notifier) {
	if (dm.__notifier === null) {
		dm.__notifier = notifier;
	}
};


/**
 * @return {!dm.IModificationProgressNotifier}
 */
dm.getNotifier = function() {
	return dm.__notifier;
};


/**
 * @param {string} type
 * @param {string} entityType
 * @param {!dm.IEntityModificationStrategy} modificationStrategy
 */
dm.registerModificationStrategy = function(type, entityType, modificationStrategy) {
	if (dm.__modificationStrategies[type] === undefined) {
		dm.__modificationStrategies[type] = {};
	}

	if (dm.__modificationStrategies[type][entityType] === undefined) {
		dm.__modificationStrategies[type][entityType] = modificationStrategy;
	}
};


/**
 * @param {string} type
 * @param {string} entityType
 * @return {dm.IEntityModificationStrategy}
 */
dm.getModificationStrategy = function(type, entityType) {
	return dm.__modificationStrategies[type] !== undefined ?
			(dm.__modificationStrategies[type][entityType] || null) : null;
};


/**
 * @param {string} entityType
 * @param {string} modificationMethod
 * @param {...*} opt_params
 * @return {fm.Action.<!dm.IEntity>}
 */
dm.modify = function(entityType, modificationMethod, opt_params) {
	var args = Array.prototype.slice.call(arguments, 1);

	/**
	 * @param {function(!dm.IEntity)} complete
	 * @param {fm.ErrorHandler} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		var modificationStrategy = dm.getModificationStrategy(dm.ModificationStrategyType.DEFAULT, entityType);

		if (modificationStrategy !== null) {
			var action = modificationStrategy.modify.apply(modificationStrategy, args);
			action(complete, cancel, input, opt_context);
		} else {
			cancel('[app.dm.modify] can\'t find modification strategy for entity type "' +
				entityType + '" and modification method "' + modificationMethod + '"');
		}
	}

	return action;
};


/**
 * @param {fm.Action.<!dm.IEntity>|fm.Script} actionOrScript
 * @return {fm.Action}
 */
dm.do = function(actionOrScript) {
	fm.do(actionOrScript);
};
