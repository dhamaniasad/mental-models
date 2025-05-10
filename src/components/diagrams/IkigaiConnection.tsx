"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Connection shader
const connectionShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    color1: { value: new THREE.Color() },
    color2: { value: new THREE.Color() },
    intensity: { value: 0.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float intensity;
    
    // Hash function for noise
    float hash(float n) {
      return fract(sin(n) * 43758.5453);
    }
    
    // Noise function
    float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u * u * (3.0 - 2.0 * u);
      
      float res = mix(
        mix(hash(dot(ip, vec2(1.0, 157.0))), 
            hash(dot(ip + vec2(1.0, 0.0), vec2(1.0, 157.0))), u.x),
        mix(hash(dot(ip + vec2(0.0, 1.0), vec2(1.0, 157.0))), 
            hash(dot(ip + vec2(1.0, 1.0), vec2(1.0, 157.0))), u.x), 
        u.y);
        
      return res * res;
    }
    
    void main() {
      // Flow animation along the tube
      float flow = fract(vUv.x * 3.0 - time * 0.5);
      
      // Noise for organic feel
      float noiseFactor = noise(vUv * 10.0 + time * 0.2) * 0.2;
      
      // Interpolate between colors
      vec3 color = mix(color1, color2, vUv.x);
      
      // Add flowing effect with noise
      float flowIntensity = sin(flow * 3.14159) * 0.5 + 0.5;
      color = mix(color, vec3(1.0), (flowIntensity + noiseFactor) * intensity * 0.3);
      
      // Transparency gradient based on tube profile
      float alpha = sin(vUv.y * 3.14159) * 0.7 + 0.3;
      
      // Add energy pulse
      float pulse = sin(vUv.x * 20.0 - time * 3.0) * 0.5 + 0.5;
      color = mix(color, vec3(1.0), pulse * intensity * 0.2);
      
      // Final color with intensity factor
      gl_FragColor = vec4(color, alpha * intensity * 0.7);
    }
  `
};

interface IkigaiConnectionProps {
  pointA: THREE.Vector3;
  pointB: THREE.Vector3;
  colorA: THREE.Color;
  colorB: THREE.Color;
  energyLevel?: number;
}

export function IkigaiConnection({ 
  pointA, 
  pointB, 
  colorA, 
  colorB, 
  energyLevel = 0.5 
}: IkigaiConnectionProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curve = useRef<THREE.CatmullRomCurve3>(new THREE.CatmullRomCurve3([]));
  
  // Update curve points and shader uniforms
  useFrame(({ clock }) => {
    // Update points for curve
    const points = [];
    const segments = 20;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = new THREE.Vector3().lerpVectors(pointA, pointB, t);
      
      // Add arc
      point.y += Math.sin(Math.PI * t) * 1.5;
      points.push(point);
    }
    
    // Update curve
    curve.current = new THREE.CatmullRomCurve3(points);
    
    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      materialRef.current.uniforms.intensity.value = energyLevel;
    }
  });
  
  return (
    <mesh>
      <tubeGeometry args={[curve.current, 64, 0.1, 8, false]} />
      <shaderMaterial
        ref={materialRef}
        args={[{
          uniforms: {
            time: { value: 0 },
            color1: { value: colorA },
            color2: { value: colorB },
            intensity: { value: energyLevel }
          },
          vertexShader: connectionShaderMaterial.vertexShader,
          fragmentShader: connectionShaderMaterial.fragmentShader,
          transparent: true,
          blending: THREE.AdditiveBlending
        }]}
      />
    </mesh>
  );
}

export default IkigaiConnection;