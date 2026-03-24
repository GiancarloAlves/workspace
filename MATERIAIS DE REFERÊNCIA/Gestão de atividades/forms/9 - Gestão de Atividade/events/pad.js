function pad(num) {
	var numRet = num;
	if (parseInt(num) <= 9) {
		numRet = "0" + num;
	}
	return numRet;
}