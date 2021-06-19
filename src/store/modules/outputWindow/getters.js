export default {
	list: state => Object.keys(state.outputWindows),

	getScalingMode: state => name => state.outputWindows[name].scalingMode,
	getScalingFilter: state => name => state.outputWindows[name].scalingFilter,

	getTitle: state => name => state.outputWindows[name].title,
	getSize: state => name => state.outputWindows[name].size.slice(),
	getPosition: state => name => state.outputWindows[name].position.slice(),
	getOpacity: state => name => state.outputWindows[name].opacity,
	getResizable: state => name => state.outputWindows[name].resizable,
	getDecorated: state => name => state.outputWindows[name].decorated,
	getMonitors: state => name => state.outputWindows[name].monitors.slice(),
	getMonitor: state => name => state.outputWindows[name].monitor,

	getFetching: state => state.fetching,
};