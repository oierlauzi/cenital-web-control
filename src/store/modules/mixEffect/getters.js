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
	getTransitionSelectedEffect: state => name => state.elements[name].transition.selectedEffect,
	getMixTransitionEffect: state => name => state.elements[name].transition.effects.mix.effect,
	getDveTransitionEffect: state => name => state.elements[name].transition.effects.dve.effect,
	getDveTransitionAngle: state => name => state.elements[name].transition.effects.dve.angle,

	getOverlayVisible: state => (name, slot, index) => state.elements[name].overlays[slot][index].visible,
	getOverlayTransition: state => (name, slot, index) => state.elements[name].overlays[slot][index].transition,
	getOverlayFeed: state => (name, slot, index, feed) => state.elements[name].overlays[slot][index].feeds[feed],
	getOverlayPosition: state => (name, slot, index) => state.elements[name].overlays[slot][index].position.slice(),
	getOverlayRotation: state => (name, slot, index) => state.elements[name].overlays[slot][index].rotation.slice(),
	getOverlayScale: state => (name, slot, index) => state.elements[name].overlays[slot][index].scale.slice(),
	getOverlayOpacity: state => (name, slot, index) => state.elements[name].overlays[slot][index].opacity,
	getOverlayBlendingMode: state => (name, slot, index) => state.elements[name].overlays[slot][index].blendingMode,
	getOverlayScalingMode: state => (name, slot, index) => state.elements[name].overlays[slot][index].scalingMode,
	getOverlayScalingFilter: state => (name, slot, index) => state.elements[name].overlays[slot][index].scalingFilter,
	getLinearKeyEnabled: state => (name, slot, index) => state.elements[name].overlays[slot][index].linearKey.enabled,
	getLinearKeyInverted: state => (name, slot, index) => state.elements[name].overlays[slot][index].linearKey.inverted,
	getLinearKeyChannel: state => (name, slot, index) => state.elements[name].overlays[slot][index].linearKey.channel,
	getLumaKeyEnabled: state => (name, slot, index) => state.elements[name].overlays[slot][index].lumaKey.enabled,
	getLumaKeyInverted: state => (name, slot, index) => state.elements[name].overlays[slot][index].lumaKey.inverted,
	getLumaKeyMinThreshold: state => (name, slot, index) => state.elements[name].overlays[slot][index].lumaKey.min,
	getLumaKeyMaxThreshold: state => (name, slot, index) => state.elements[name].overlays[slot][index].lumaKey.max,
	getChromaKeyEnabled: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.enabled,
	getChromaKeyHue: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.hue,
	getChromaKeyHueSpan: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.hueSpan,
	getChromaKeyHueSmoothness: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.hueSmoothness,
	getChromaKeySaturationThreshold: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.saturationThreshold,
	getChromaKeySaturationSmoothness: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.saturationSmoothness,
	getChromaKeyBrightnessThreshold: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.brightnessThreshold,
	getChromaKeyBrightnessSmoothness: state => (name, slot, index) => state.elements[name].overlays[slot][index].chromaKey.brightnessSmoothness,

	getFetching: state => state.fetching,
};