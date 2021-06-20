export default {
	list: state => Object.keys(state.elements),

	getClips: state => name => Object.keys(state.elements[name].clips),
	getClipState: state => (name, clip) => state.elements[name].clips[clip].state,
	getClipRepeat: state => (name, clip) => state.elements[name].clips[clip].repeat,
	getClipSpeed: state => (name, clip) => state.elements[name].clips[clip].speed,
	getClipDuration: state => (name, clip) => state.elements[name].clips[clip].duration,
	getClipTime: state => (name, clip) => state.elements[name].clips[clip].time,
	getCurrentClip: state => name => state.elements[name].currentClip,

	getFetching: state => state.fetching,
};