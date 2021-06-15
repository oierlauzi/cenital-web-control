export default {
	list: state => Object.keys(state.mixEffects),
	getInputCount: state => name => state.mixEffects[name].inputCount,
	getProgram: state => name => state.mixEffects[name].pgm,
	getPreview: state => name => state.mixEffects[name].pvw,
	getTransitionType: state => name => state.mixEffects[name].transitionType,
	getTransitionDuration: state => name => state.mixEffects[name].transitionDur,
	getTransitionPreview: state => name => state.mixEffects[name].transitionPrev
};