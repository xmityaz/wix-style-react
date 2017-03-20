import _ from 'lodash/fp';

const breadcrumbsDriverFactory = component => ({
	click: () => component.click(),
	element: () => component
});

export default breadcrumbsDriverFactory;