import _ from 'lodash/fp';

const checkboxDriverFactory = component => ({
	click: () => component.click(),
	getLabel: () => component.$(`label`),
	getInput: () => component.$(`input`),
	element: () => component
});

export default checkboxDriverFactory;