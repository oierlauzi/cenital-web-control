export default {
	list: state => Object.keys(state.elements),

	getInputCount: state => name => state.elements[name].inputCount,
	getUpstreamOverlayCount: state => name => state.elements[name].usOverlays.length,
	getDownstreamOverlayCount: state => name => state.elements[name].dsOverlays.length,

	getScalingMode: state => name => state.elements[name].scalingMode,
	getScalingFilter: state => name => state.elements[name].scalingFilter,

	getProgram: state => name => state.elements[name].pgm,
	getPreview: state => name => state.elements[name].pvw,
	getTransitionBar: state => name => state.elements[name].transitionBar,
	getTransitionEffects: state => name => Object.keys(state.elements[name].transitionEffects),
	getTransitionEffectType: state => (name, effect) => state.elements[name].transitionEffect[effect].type,
	getTransitionEffect: state => name => state.elements[name].transitionEffect,
	getTransitionDuration: state => name => state.elements[name].transitionDuration,
	getTransitionPreview: state => name => state.elements[name].transitionPreview,

	getFetching: state => state.fetching,
};