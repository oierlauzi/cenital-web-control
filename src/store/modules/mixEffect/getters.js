export default {
	list: state => Object.keys(state.mixEffects),

	getInputCount: state => name => state.mixEffects[name].inputCount,
	getUpstreamOverlayCount: state => name => state.mixEffects[name].usOverlays.length,
	getDownstreamOverlayCount: state => name => state.mixEffects[name].dsOverlays.length,

	getProgram: state => name => state.mixEffects[name].pgm,
	getPreview: state => name => state.mixEffects[name].pvw,
	getTransitionBar: state => name => state.mixEffects[name].transitionBar,
	getTransitionEffects: state => name => Object.keys(state.mixEffects[name].transitionEffects),
	getTransitionEffect: state => name => state.mixEffects[name].transitionEffect,
	getTransitionDuration: state => name => state.mixEffects[name].transitionDuration,
	getTransitionPreview: state => name => state.mixEffects[name].transitionPreview,

	getFetching: state => state.fetching,
};