export default {
	list: state => Object.keys(state.elements),

	getScalingMode: state => name => state.elements[name].scalingMode,
	getScalingFilter: state => name => state.elements[name].scalingFilter,

	getTitle: state => name => state.elements[name].title,
	getSize: state => name => state.elements[name].size.slice(),
	getPosition: state => name => state.elements[name].position.slice(),
	getOpacity: state => name => state.elements[name].opacity,
	getResizable: state => name => state.elements[name].resizable,
	getDecorated: state => name => state.elements[name].decorated,
	getMonitors: state => name => state.elements[name].monitors.slice(),
	getMonitor: state => name => state.elements[name].monitor,

	getFetching: state => state.fetching,
};