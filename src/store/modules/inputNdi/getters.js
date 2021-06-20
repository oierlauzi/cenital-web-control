export default {
	list: state => Object.keys(state.elements),

	getSources: state => name => state.elements[name].sources.slice(),
	getCurrentSource: state => name => state.elements[name].currentSource,

	getFetching: state => state.fetching,
};