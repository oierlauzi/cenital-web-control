export default {
	list: state => Object.keys(state.elements),

	getInputCount: state => name => state.elements[name].inputCount,
	getOverlayCount: state => (name, slot) => state.elements[name].overlays[slot].length,

	getScalingMode: state => name => state.elements[name].scalingMode,
	getScalingFilter: state => name => state.elements[name].scalingFilter,

	getProgram: state => name => state.elements[name].pgm,
	getPreview: state => name => state.elements[name].pvw,
	getTransitionBar: state => name => state.elements[name].transition.bar,
	getTransitionDuration: state => name => state.elements[name].transition.duration,
	getTransitionPreview: state => name => state.elements[name].transition.preview,
	getTransitionEffects: state => name => Object.keys(state.elements[name].transition.effects),
	getTransitionEffectType: state => (name, effect) => state.elements[name].transition.effects[effect].type,
	getTransitionSelectedEffect: state => name => state.elements[name].transition.selectedEffect,

	getOverlayVisible: state => (name, slot, index) => state.elements[name].overlays[slot][index].visible,
	getOverlayTransition: state => (name, slot, index) => state.elements[name].overlays[slot][index].transition,
	getOverlayPosition: state => (name, slot, index) => state.elements[name].overlays[slot][index].position.slice(),
	getOverlayRotation: state => (name, slot, index) => state.elements[name].overlays[slot][index].rotation.slice(),
	getOverlayScale: state => (name, slot, index) => state.elements[name].overlays[slot][index].scale.slice(),
	getOverlayOpacity: state => (name, slot, index) => state.elements[name].overlays[slot][index].opacity,
	getOverlayBlendingMode: state => (name, slot, index) => state.elements[name].overlays[slot][index].blendingMode,
	getOverlayScalingMode: state => (name, slot, index) => state.elements[name].overlays[slot][index].scalingMode,
	getOverlayScalingFilter: state => (name, slot, index) => state.elements[name].overlays[slot][index].scalingFilter,

	getFetching: state => state.fetching,
};