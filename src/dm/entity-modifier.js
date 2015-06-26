

/**
 * @constructor
 * @implements {dm.IEntityModifier}
 * @param {dm.ModificationMethodsMap} modificationMethodsMap
 */
dm.EntityModifier = function(modificationMethodsMap) {
	/**
	 * @type {!Object.<string, !Function>}
	 */
	this.__modificationMethods = {};

	this.__registerModificationMethods(modificationMethodsMap);
};


dm.EntityModifier.prototype._create = function() {};


/**
 * @inheritDoc
 */
dm.EntityModifier.prototype.registerModificationMethod = function(name, method) {
	if (this.__modificationMethods[name] === undefined) {
		this.__modificationMethods[name] = method;
	}
};


/**
 * @param {dm.ModificationMethodsMap} modificationMethodsMap
 */
dm.EntityModifier.prototype.__registerModificationMethods = function(modificationMethodsMap) {
	for (var i = 0; i < modificationMethodsMap.length; i++) {
		var name = modificationMethodsMap[i][0];
		var method = modificationMethodsMap[i][1];
		this.registerModificationMethod(name, method);
	}
};
