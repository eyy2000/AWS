window.onload = async() => {
	let data = await promisOfData;
}

const promisOfData = fetch('https://2l10lnusjb.execute-api.us-west-2.amazonaws.com/dev/visitorcount')
.then(response =>{
	document.getElementById('body').innerHTML = "visitor count: ";
	console.log(response.json());
	return response.json();
})