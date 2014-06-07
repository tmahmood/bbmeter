/// class IDGenerator
/// Generate unique ID
function IDGenerator(prefix) {
	this.prefix = prefix;
	this.last_idx = 0;
	this.last_id = prefix + this.last_idx;

	while ($('#' + this.last_id).length > 0) {
		this.last_idx++;
		this.last_id = prefix + this.last_idx;
	}
}
// we are expecting these ID are not created manually anywhere
// so not checking if it exists already.
IDGenerator.prototype.getNextId = function(){
	newid = this.prefix + this.last_idx;
	this.last_idx++;
	return newid;
}

