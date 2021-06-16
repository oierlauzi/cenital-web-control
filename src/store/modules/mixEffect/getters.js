export default {
	list: state => Object.keys(state.mixEffects),
	getInputCount: state => name => state.mixEffects[name].inputCount,
	getProgram: state => name => state.mixEffects[name].pgm,
	getPreview: state => name => state.mixEffects[name].pvw,
	getTransitionBar: state => name => state.mixEffects[name].transitionBar,
	getTransitionEffect: state => name => state.mixEffects[name].transitionEffect,
	getTransitionDuration: state => name => state.mixEffects[name].transitionDuration,
	getTransitionPreview: state => name => state.mixEffects[name].transitionPreview
};