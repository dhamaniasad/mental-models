"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sphere, Text, Html, Float, useCursor } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
// Using Three.js built-in animation system instead of react-spring

// Define domain colors
const DOMAIN_COLORS = {
  passion: new THREE.Color('#FF3A5E'),
  mission: new THREE.Color('#4D45FF'),
  profession: new THREE.Color('#18ADB5'),
  vocation: new THREE.Color('#FFC14A'),
  ikigai: new THREE.Color('#9C27B0')
};

// Domain definition
interface Domain {
  id: string;
  name: string;
  description: string;
  color: THREE.Color;
  position: [number, number, number];
}

// Define domains
const domains: Domain[] = [
  {
    id: 'passion',
    name: 'Passion',
    description: 'What you love',
    color: DOMAIN_COLORS.passion,
    position: [-5, 3, 0]
  },
  {
    id: 'mission',
    name: 'Mission',
    description: 'What the world needs',
    color: DOMAIN_COLORS.mission,
    position: [5, 3, 0]
  },
  {
    id: 'profession',
    name: 'Profession',
    description: 'What you can be paid for',
    color: DOMAIN_COLORS.profession,
    position: [5, -3, 0]
  },
  {
    id: 'vocation',
    name: 'Vocation', 
    description: 'What you are good at',
    color: DOMAIN_COLORS.vocation,
    position: [-5, -3, 0]
  }
];

// Custom shader for spheres
const sphereShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color() },
    energy: { value: 0.3 },
    pulseIntensity: { value: 0.3 }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    
    uniform float time;
    uniform float pulseIntensity;
    
    // Noise functions
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      
      // Calculate displacement based on noise
      float noise = snoise(position * 0.5 + time * 0.2);
      float displacement = noise * 0.2 * pulseIntensity;
      
      // Apply pulsating effect
      float pulse = sin(time * 0.5) * 0.05 * pulseIntensity;
      vec3 newPosition = position * (1.0 + pulse);
      
      // Apply displacement
      newPosition += normal * displacement;
      
      // Calculate view position for effects
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    
    uniform vec3 color;
    uniform float time;
    uniform float energy;
    
    // Fresnel calculation
    float fresnel(vec3 viewDir, vec3 normal, float power) {
      return pow(1.0 - abs(dot(viewDir, normal)), power);
    }
    
    void main() {
      // Normalize view direction
      vec3 viewDir = normalize(vViewPosition);
      
      // Base color
      vec3 baseColor = color;
      
      // Add flowing patterns
      float pattern = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time) * 0.5 + 0.5;
      pattern *= energy * 0.5;
      
      // Edge glow with fresnel effect
      float fresnelTerm = fresnel(viewDir, vNormal, 3.0);
      vec3 fresnelColor = mix(baseColor, vec3(1.0), 0.7);
      
      // Final color with pattern and fresnel
      vec3 finalColor = mix(baseColor, baseColor * 1.5, pattern * 0.3);
      finalColor = mix(finalColor, fresnelColor, fresnelTerm * energy);
      
      // Add subtle energy ripples
      float energyRipple = sin(length(vUv - 0.5) * 20.0 - time * 2.0) * 0.5 + 0.5;
      finalColor = mix(finalColor, vec3(1.0), energyRipple * energy * 0.2);
      
      // Final opacity with fresnel contribution
      float finalOpacity = 0.9 + fresnelTerm * 0.1;
      
      gl_FragColor = vec4(finalColor, finalOpacity);
    }
  `
};

// Custom shader for connections
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

// Component for a Draggable Domain Sphere
function DomainSphere({ 
  domain,
  selected,
  onSelect,
  energyLevel = 0.3
}: {
  domain: Domain;
  selected: boolean;
  onSelect: () => void;
  energyLevel?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  
  // Create custom shader material
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Track scale and pulse intensity with refs
  const scaleRef = useRef(1);
  const pulseIntensityRef = useRef(0.3);

  // Update scale and pulse intensity based on state
  useEffect(() => {
    scaleRef.current = selected ? 1.2 : hovered ? 1.1 : 1;
    pulseIntensityRef.current = selected ? 1.0 : hovered ? 0.6 : 0.3;
  }, [selected, hovered]);
  
  // Update shader uniforms and animate scale
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      materialRef.current.uniforms.energy.value = energyLevel;
      materialRef.current.uniforms.pulseIntensity.value = pulseIntensityRef.current;
    }

    // Animate scale changes smoothly
    if (meshRef.current) {
      const currentScale = meshRef.current.scale.x;
      const targetScale = scaleRef.current;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });
  
  return (
    <group position={domain.position as THREE.Vector3TupleArgument}>
      {/* Main sphere with custom shader */}
      <mesh
        ref={meshRef}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          args={[{
            uniforms: {
              time: { value: 0 },
              color: { value: domain.color },
              energy: { value: energyLevel },
              pulseIntensity: { value: 0.3 }
            },
            vertexShader: sphereShaderMaterial.vertexShader,
            fragmentShader: sphereShaderMaterial.fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending
          }]}
        />
      </mesh>

      {/* Label */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, -2.2, 0]}
          fontSize={0.4}
          color={domain.color.getStyle()}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {domain.name}
        </Text>
        <Text
          position={[0, -2.7, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {domain.description}
        </Text>
      </Float>

      {/* Particle system around sphere */}
      <ParticleSystem color={domain.color} active={selected || hovered} />
    </group>
  );
}

// Component for Connection between domains
function Connection({
  domainA,
  domainB,
  energyLevel = 0.3
}: {
  domainA: Domain;
  domainB: Domain;
  energyLevel?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curve = useRef<THREE.CatmullRomCurve3>(new THREE.CatmullRomCurve3([]));
  
  // Update curve points
  useFrame(({ clock }) => {
    // Update points for curve
    const points = [];
    const segments = 20;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const startPoint = new THREE.Vector3(...domainA.position);
      const endPoint = new THREE.Vector3(...domainB.position);
      
      const point = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);
      
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
            color1: { value: domainA.color },
            color2: { value: domainB.color },
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

// Particle system component
function ParticleSystem({ color, active }: { color: THREE.Color, active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 1;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(angle);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(angle);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    return { positions, sizes };
  });
  
  // Animation
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const geometry = particlesRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const i3 = i * 3;
      const x = positionAttribute.array[i3];
      const y = positionAttribute.array[i3 + 1];
      const z = positionAttribute.array[i3 + 2];
      
      // Get the base position
      const angle = Math.atan2(y, x);
      const radius = Math.sqrt(x * x + y * y + z * z);
      
      // Apply minor noise to position
      positionAttribute.array[i3] = Math.cos(angle + time * (0.2 + Math.random() * 0.1)) * radius * (1 + Math.sin(time * 0.5) * 0.05);
      positionAttribute.array[i3 + 1] = Math.sin(angle + time * (0.2 + Math.random() * 0.1)) * radius * (1 + Math.sin(time * 0.5) * 0.05);
      positionAttribute.array[i3 + 2] = z * (1 + Math.sin(time * 0.3 + i) * 0.05);
    }
    
    positionAttribute.needsUpdate = true;
  });
  
  // Animate opacity using ref
  const opacityRef = useRef(active ? 0.8 : 0.2);

  useEffect(() => {
    opacityRef.current = active ? 0.8 : 0.2;
  }, [active]);
  
  // Update material opacity
  useFrame(() => {
    if (particlesRef.current && particlesRef.current.material) {
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, opacityRef.current, 0.1);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.positions.length / 3}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={positions.sizes.length}
          array={positions.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Ikigai Center Effect
function IkigaiCenter({
  active,
  position = [0, 0, 0]
}: {
  active: boolean;
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Track animation values with refs
  const scaleRef = useRef(active ? 1.2 : 0.5);
  const intensityRef = useRef(active ? 2.0 : 0.5);
  const emissiveColorRef = useRef(new THREE.Color(active ? '#b429cf' : '#4a1991'));

  // Update animation values based on active state
  useEffect(() => {
    scaleRef.current = active ? 1.2 : 0.5;
    intensityRef.current = active ? 2.0 : 0.5;
    emissiveColorRef.current = new THREE.Color(active ? '#b429cf' : '#4a1991');
  }, [active]);
  
  // Pulsation and animation effects
  useFrame(({ clock }) => {
    if (materialRef.current) {
      const time = clock.getElapsedTime();
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;

      // Animate emissive color
      materialRef.current.emissive.lerp(emissiveColorRef.current, 0.1);

      // Animate intensity
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        intensityRef.current,
        0.1
      );
    }

    // Animate scale
    if (meshRef.current) {
      const currentScale = meshRef.current.scale.x;
      const targetScale = scaleRef.current;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#9C27B0"
        emissive="#b429cf"
        emissiveIntensity={1.0}
        transparent
        opacity={0.9}
        metalness={0.5}
        roughness={0.2}
      />
      
      {active && (
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#9C27B0"
        >
          IKIGAI
        </Text>
      )}

      {/* Add light source inside with animated intensity */}
      <pointLight
        color="#b429cf"
        intensity={intensityRef.current * 2}
        distance={5}
      />
    </mesh>
  );
}

// Background star field
function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  
  // Generate random stars
  const [positions] = useState(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Position on a large sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Star colors (mostly white with a hint of blue)
      colors[i * 3] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 1.0;
      
      // Random sizes
      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    
    return { positions, colors, sizes };
  });
  
  // Subtle rotation
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.1;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.positions.length / 3}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={positions.colors.length / 3}
          array={positions.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={positions.sizes.length}
          array={positions.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene setup with post-processing
function Scene() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [ikigaiActive, setIkigaiActive] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0.3);
  const [usePostProcessing, setUsePostProcessing] = useState(true);

  // Try to safely initialize post-processing
  useEffect(() => {
    try {
      // Check if EffectComposer is available and working
      if (typeof EffectComposer !== 'function') {
        console.warn('EffectComposer not available, disabling post-processing');
        setUsePostProcessing(false);
      }
    } catch (err) {
      console.error('Error initializing post-processing:', err);
      setUsePostProcessing(false);
    }
  }, []);

  // Calculate center point and check if Ikigai is active
  useFrame(() => {
    // For a real physics simulation, we would check the positions of spheres
    // For this demo, we'll activate ikigai if a specific domain is selected
    if (selectedDomain === 'ikigai') {
      setIkigaiActive(true);
      setEnergyLevel(1.0);
    } else {
      setIkigaiActive(selectedDomain !== null);
      setEnergyLevel(selectedDomain !== null ? 0.7 : 0.3);
    }
  });

  // Handle domain selection
  const handleSelectDomain = (domainId: string) => {
    if (selectedDomain === domainId) {
      setSelectedDomain(null);
    } else {
      setSelectedDomain(domainId);
    }
  };
  
  return (
    <>
      {/* Background */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 30, 90]} />
      <StarField />
      
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={usePostProcessing ? 0.5 : 0.8}
        color="#ffffff"
      />

      {/* Additional lighting when post-processing is disabled */}
      {!usePostProcessing && (
        <>
          <pointLight position={[0, 5, 0]} intensity={0.3} color="#6a0dad" />
          <pointLight position={[-10, -10, 0]} intensity={0.2} color="#0088ff" />
        </>
      )}
      
      {/* Domain spheres */}
      {domains.map(domain => (
        <DomainSphere
          key={domain.id}
          domain={domain}
          selected={selectedDomain === domain.id}
          onSelect={() => handleSelectDomain(domain.id)}
          energyLevel={energyLevel}
        />
      ))}
      
      {/* Connections between domains */}
      {domains.map((domainA, i) => 
        domains.slice(i + 1).map(domainB => (
          <Connection
            key={`${domainA.id}-${domainB.id}`}
            domainA={domainA}
            domainB={domainB}
            energyLevel={energyLevel}
          />
        ))
      )}
      
      {/* Ikigai center effect */}
      <IkigaiCenter active={ikigaiActive} position={[0, 0, 0]} />
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={30}
        autoRotate={!selectedDomain}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Post-processing effects */}
      {usePostProcessing && (
        <EffectComposer multisampling={8}>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            intensity={1.0}
          />
        </EffectComposer>
      )}
      
      {/* Info panel for selected domain */}
      {selectedDomain && (
        <Html
          position={[selectedDomain === 'ikigai' ? 0 : 8, 0, 0]}
          style={{
            width: '250px',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            transform: 'translateX(20px)'
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#9C27B0' }}>
            {selectedDomain === 'ikigai' 
              ? 'IKIGAI' 
              : domains.find(d => d.id === selectedDomain)?.name}
          </h3>
          <p style={{ margin: '0', fontSize: '14px' }}>
            {selectedDomain === 'ikigai' 
              ? 'Your reason for being - the perfect balance of passion, mission, profession, and vocation.'
              : domains.find(d => d.id === selectedDomain)?.description}
          </p>
          {selectedDomain === 'ikigai' && (
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#b6b6b6' }}>
              At the intersection of what you love, what you're good at, what you can be paid for, and what the world needs.
            </p>
          )}
        </Html>
      )}
    </>
  );
}

// Main component
export function IkigaiDiagram3D() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Error handling function
  const handleError = (error: Error) => {
    console.error('Error in IkigaiDiagram3D:', error);
    setError('Failed to load 3D visualization. Please try refreshing the page.');
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-lg">Loading 3D visualization...</div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-lg">{error}</div>
        </div>
      ) : (
        <ErrorBoundary fallback={<FallbackDiagram />}>
          {(() => {
            try {
              return (
                <Canvas
                  camera={{ position: [0, 0, 18], fov: 60 }}
                  dpr={[1, 2]}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                  }}
                >
                  <Scene />
                </Canvas>
              );
            } catch (err) {
              console.error('Error rendering Canvas:', err);
              return <FallbackDiagram />;
            }
          })()}
        </ErrorBoundary>
      )}
    </div>
  );
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode, fallback: React.ReactNode}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error in 3D visualization:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback 2D visualization
function FallbackDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center relative bg-gray-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-black/40" />

      {/* Circles representing the Ikigai domains */}
      <div className="relative w-[80%] h-[80%] max-w-[500px]">
        {/* Passion - What you love */}
        <div
          className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-red-500/40 to-rose-600/40 border border-rose-400/20 backdrop-blur-sm"
          style={{ filter: 'blur(1px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg">Passion</div>
          </div>
        </div>

        {/* Mission - What the world needs */}
        <div
          className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-500/40 to-indigo-600/40 border border-blue-400/20 backdrop-blur-sm"
          style={{ filter: 'blur(1px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg">Mission</div>
          </div>
        </div>

        {/* Profession - What you can be paid for */}
        <div
          className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-teal-500/40 to-cyan-600/40 border border-teal-400/20 backdrop-blur-sm"
          style={{ filter: 'blur(1px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg">Profession</div>
          </div>
        </div>

        {/* Vocation - What you're good at */}
        <div
          className="absolute bottom-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-amber-500/40 to-yellow-600/40 border border-amber-400/20 backdrop-blur-sm"
          style={{ filter: 'blur(1px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg">Vocation</div>
          </div>
        </div>

        {/* Ikigai - Center */}
        <div
          className="absolute top-1/2 left-1/2 w-[25%] h-[25%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/80 to-fuchsia-600/80 border-2 border-white/30 z-10 flex items-center justify-center shadow-lg shadow-purple-900/50"
        >
          <div className="text-white font-bold text-lg">IKIGAI</div>
        </div>

        {/* Descriptive texts */}
        <div className="absolute top-[7%] left-1/2 -translate-x-1/2 text-white/70 text-sm">What you love</div>
        <div className="absolute left-[7%] top-1/2 -translate-y-1/2 text-white/70 text-sm">What you're good at</div>
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-white/70 text-sm">What you can be paid for</div>
        <div className="absolute right-[7%] top-1/2 -translate-y-1/2 text-white/70 text-sm">What the world needs</div>
      </div>

      {/* Message about fallback */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs">
        Simplified 2D visualization (3D view unavailable)
      </div>
    </div>
  );
}

export default IkigaiDiagram3D;