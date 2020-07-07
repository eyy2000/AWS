fetch('https://2l10lnusjb.execute-api.us-west-2.amazonaws.com/dev/visitorcount?k=visitors')
.then(response =>{
	return response.json();
})