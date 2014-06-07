function StorageManagement() {
	this.storage = localStorage;
}

StorageManagement.prototype.getItem = function(key) {
	return this.storage.getItem(key);
};

StorageManagement.prototype.setItem = function(key, val) {
	this.storage.setItem(key, val);
};

StorageManagement.prototype.removeItem = function(key, val) {
	this.storage.removeItem(key);
};

