import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
uniform float uIntensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 center = vec2(0.5, 0.5);

  float distX = abs(uv.x - center.x);

  // Multiply distX by 3 for stronger effect near edges, power 4, amplified intensity
  float scale = 1.0 / (1.0 + pow(distX * 2.0 , 4.0) * uIntensity);

  vec2 distortedUV = vec2(uv.x, (uv.y - center.y) * scale + center.y);

  outputColor = texture(inputBuffer, distortedUV);
}






`;

export class CurvedScrollEffectImpl extends Effect {
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

