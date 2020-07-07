fetch('https://2l10lnusjb.execute-api.us-west-2.amazonaws.com/dev/visitorcount')
.then(response =>{
	console.log(response.json());
	return response.json();
})