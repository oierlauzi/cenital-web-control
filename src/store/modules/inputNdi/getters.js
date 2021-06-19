export default {
	list: state => Object.keys(state.elements),

	getSources: state => name => state.elements[name].sources.slice(),
	getSource: state => name => state.elements[name].source,

	getFetching: state => state.fetching,
};