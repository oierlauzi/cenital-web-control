export default {
	list: state => Object.keys(state.mixEffects),
	getInputs: state => name => state.mixEffects[name].inputs,
	getProgram: state => name => state.mixEffects[name].pgm,
	getPreview: state => name => state.mixEffects[name].pvw,
	getTransitionType: state => name => state.mixEffects[name].transitionType,
	getTransitionDuration: state => name => state.mixEffects[name].transitionDur
};