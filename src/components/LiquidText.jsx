import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidText({
  text = "ANKUR",
  textColor = "#ffffff",
  fontWeight = "900",
  gradient = false,
  className = "",
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 90;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 1. WebGL Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    // 2. Offscreen Canvas for Crisp Typography
    const textCanvas = document.createElement("canvas");
    const ctx = textCanvas.getContext("2d");

    const renderTextTexture = () => {
      textCanvas.width = width * dpr;
      textCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const safePaddingX = width * 0.05;
      const availableWidth = width - safePaddingX * 2;
      const availableHeight = height * 0.85;

      let fontSize = availableHeight;
      ctx.font = `${fontWeight} ${fontSize}px Inter, -apple-system, sans-serif`;
      let measuredWidth = ctx.measureText(text).width;

      if (measuredWidth > availableWidth) {
        fontSize = fontSize * (availableWidth / measuredWidth);
        ctx.font = `${fontWeight} ${fontSize}px Inter, -apple-system, sans-serif`;
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (gradient) {
        const grad = ctx.createLinearGradient(safePaddingX, 0, width - safePaddingX, 0);
        grad.addColorStop(0, "#22d3ee");
        grad.addColorStop(0.5, "#c084fc");
        grad.addColorStop(1, "#f43f5e");
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = textColor;
      }

      ctx.fillText(text, width / 2, height / 2 + fontSize * 0.04);
    };

    renderTextTexture();
    const texture = new THREE.CanvasTexture(textCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // 3. Dual Liquid Shader (Continuous Hover + Mobile Touch Splash Pulse)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform float uTime;
      uniform vec2 uTouchOrigin;
      uniform float uTouchProgress; // 0.0 to 1.0 expanding mobile wave
      varying vec2 vUv;

      void main() {
        vec2 p = vUv;
        
        // 1. Continuous Desktop Mouse Ripple
        float distMouse = distance(p, uMouse);
        float mouseInfluence = smoothstep(0.32, 0.0, distMouse) * uHover;
        vec2 mouseDir = normalize(p - uMouse + 0.0001);
        float mouseWave = sin(distMouse * 26.0 - uTime * 5.5) * 0.012 * mouseInfluence;

        // 2. Mobile Touch Splash Wave (Radiates outward upon tap)
        float distTouch = distance(p, uTouchOrigin);
        float splashRadius = uTouchProgress * 0.9;
        float splashRing = exp(-pow(distTouch - splashRadius, 2.0) / 0.015) * (1.0 - uTouchProgress);
        vec2 splashDir = normalize(p - uTouchOrigin + 0.0001);
        float splashWave = sin(distTouch * 30.0 - uTouchProgress * 12.0) * 0.02 * splashRing;

        // Combine both displacements
        vec2 totalDisplacement = (mouseDir * mouseWave) + (splashDir * splashWave);
        vec2 distortedUv = p + totalDisplacement;

        if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
          gl_FragColor = vec4(0.0);
          return;
        }

        // Chromatic RGB Dispersion
        float r = texture2D(uTexture, distortedUv + totalDisplacement * 0.4).r;
        float g = texture2D(uTexture, distortedUv).g;
        float b = texture2D(uTexture, distortedUv - totalDisplacement * 0.4).b;
        float a = texture2D(uTexture, distortedUv).a;

        gl_FragColor = vec4(r, g, b, a);
      }
    `;

    const uniforms = {
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uTouchOrigin: { value: new THREE.Vector2(0.5, 0.5) },
      uTouchProgress: { value: 1.0 }, // 1.0 = fully decayed
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetHover = 0;
    let currentHover = 0;
    let touchStartTime = -10;

    // Trigger Expanding Ripple Splash
    const triggerSplash = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;
      uniforms.uTouchOrigin.value.set(x, y);
      touchStartTime = clock.getElapsedTime();
    };

    // Desktop Mouse Event Handlers
    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return; // Touch handled separately
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
      targetHover = 1.0;
    };

    const onPointerLeave = () => {
      targetHover = 0.0;
    };

    // Mobile Touch Event Handlers
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        triggerSplash(touch.clientX, touch.clientY);
      }
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1.0 - (touch.clientY - rect.top) / rect.height;
        uniforms.uMouse.value.set(x, y);
        targetHover = 0.8;
      }
    };

    const onTouchEnd = () => {
      targetHover = 0.0;
    };

    // Click / Tap Event Trigger
    const onClick = (e) => {
      triggerSplash(e.clientX, e.clientY);
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("click", onClick);

    // Responsive Canvas Resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        if (cr.width === 0 || cr.height === 0) continue;
        width = cr.width;
        height = cr.height;

        renderer.setSize(width, height);
        renderTextTexture();
        texture.needsUpdate = true;
      }
    });
    resizeObserver.observe(container);

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      currentHover += (targetHover - currentHover) * 0.1;
      uniforms.uHover.value = currentHover;
      uniforms.uTime.value = elapsedTime;

      // Calculate mobile touch pulse progress (lasts ~1.2s)
      const splashDuration = 1.2;
      const timeSinceTouch = elapsedTime - touchStartTime;
      if (timeSinceTouch < splashDuration) {
        uniforms.uTouchProgress.value = timeSinceTouch / splashDuration;
      } else {
        uniforms.uTouchProgress.value = 1.0;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("click", onClick);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [text, textColor, fontWeight, gradient]);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-pointer select-none flex items-center justify-center ${className}`}
    />
  );
}