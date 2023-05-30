const contactsTools = require('./contacts');
const yargs = require('yargs');

const { argv } = yargs(process.argv.slice(2));

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			const allContacts = await contactsTools.getListOfContacts();
			console.log('Here all contacts');
			console.table(allContacts);
			break;

		case 'get':
			const getContactById = await contactsTools.getContactById(id);
			console.log('Here contact you looking for: ');
			console.table(getContactById);
			break;

		case 'add':
			const addNewContact = await contactsTools.addContact(name, email, phone);
			console.log('Contact was added to data base');
			console.table(addNewContact);
			break;

		case 'remove':
			const removeContactById = await contactsTools.removeContactById(id);
			console.log('Contact removed: ');
			console.table(removeContactById);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
};

invokeAction(argv);
