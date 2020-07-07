window.onload = async() => {
	let data = await promisOfData;
	document.body.innerHTML = "visitor count: " + data.body.body;
}

const promisOfData = fetch('https://2l10lnusjb.execute-api.us-west-2.amazonaws.com/dev/visitorcount')
.then(response =>{
	return response.json();
})