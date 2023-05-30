const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const getListOfContacts = async () => {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));
	const contactById = contacts.find((contact) => contact.id === contactId);
	return contactById || null;
};

const removeContactById = async (contactId) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));
	const contactById = contacts.findIndex((contact) => contact.id === contactId);
	if (contactById === -1) return null;
	const [removedContact] = contacts.splice(contactById, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContact;
};

const addContact = async (name, email, phone) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));
	const newContact = {
		id: nanoid(),
		name: name,
		email: email,
		phone: phone
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

module.exports = {
	getListOfContacts,
	getContactById,
	removeContactById,
	addContact
};
