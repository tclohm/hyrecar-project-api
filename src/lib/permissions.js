module.exports = function(profile) {
	if (profile && profile["app_metadata"]) {
		return profile["app_metadata"].permissions;
	}
	return [];
} 