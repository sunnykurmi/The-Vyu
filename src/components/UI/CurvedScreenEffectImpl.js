import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
  uniform float uIntensity;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 center = vec2(0.5);
    vec2 dist = uv - center;
    float len = length(dist);
    vec2 offset = dist * len * -uIntensity; // ← NEGATE the distortion here
    outputColor = texture(inputBuffer, uv + offset);
  }
`;

export class CurvedScreenEffectImpl extends Effect {
  constructor({ intensity = 0.2 } = {}) {
    super('CurvedScreenEffect', fragmentShader, {
      uniforms: new Map([['uIntensity', new Uniform(intensity)]])
    });
  }

  // 👇 This exposes .intensity so you can update it via effect.intensity = ...
  get intensity() {
    return this.uniforms.get('uIntensity').value;
  }

  set intensity(value) {
    this.uniforms.get('uIntensity').value = value;
  }
}

