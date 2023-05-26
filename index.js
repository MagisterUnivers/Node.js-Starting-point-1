// something
const contactsTools = require('./db/contacts');
const yargs = require('yargs');

// console.log('Sup, i am connected');

const { argv } = yargs(process.argv.slice(2));

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			// ...
			const allContacts = await contactsTools.listContacts();
			console.log('Here all contacts');
			console.log(allContacts);
			break;

		case 'get':
			// ... id
			const getContactById = await contactsTools.getContactById(id);
			console.log(getContactById);
			break;

		case 'add':
			// ... name email phone
			const addNewContact = await contactsTools.addContact(name, email, phone);
			console.log(addNewContact);
			break;

		case 'remove':
			// ... id
			const removeContactById = await contactsTools.removeContact(id);
			console.log('Contact removed: ');
			console.log(removeContactById);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
};

invokeAction(argv);
