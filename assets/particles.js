(() => {
  'use strict';
  const stage = document.querySelector('[data-particle-stage]');
  const canvas = document.getElementById('particle-canvas');
  if (!stage || !canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const fullscreen = stage.dataset.particleSize === 'fullscreen' || Boolean(stage.closest('.hero-fullscreen'));

  const coordinates = stage.querySelector('[data-particle-coords]');
  const toggle = stage.querySelector('[data-particle-toggle]');
  const status = stage.querySelector('[data-particle-status]');
  const sessionTime = stage.querySelector('[data-session-time]');
  const particleCount = stage.querySelector('[data-particle-count]');
  const sessionStarted = performance.now();
  let telemetryTimer = null;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let inView = true;
  let ready = false;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let particles = [];
  let frame = null;
  let resizeFrame = null;
  let previousTime = 0;
  let time = 0;
  const pointer = { x: -10000, y: -10000, radius: 95 };
  const laser = getComputedStyle(stage).getPropertyValue('--orange').trim() || '#ff6900';

  function updateTelemetry() {
    const seconds = Math.floor((performance.now() - sessionStarted) / 1000);
    if (sessionTime) sessionTime.textContent = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
  }

  function reconcileTelemetry() {
    if (telemetryTimer !== null) clearInterval(telemetryTimer);
    telemetryTimer = null;
    if (inView && !document.hidden) {
      updateTelemetry();
      telemetryTimer = setInterval(updateTelemetry, 1000);
    }
  }

  function updateStatus() {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Увімкнути анімацію' : 'Призупинити анімацію');
    status.textContent = paused ? (reducedMotion.matches ? 'STATIC' : 'PAUSED') : 'ACTIVE';
  }

  function paintStatic() {
    context.clearRect(0, 0, width, height);
    for (const particle of particles) {
      context.fillStyle = particle.color;
      context.fillRect(particle.ox, particle.oy, particle.size, particle.size);
    }
  }

  function rebuild() {
    const nextWidth = stage.clientWidth;
    const nextHeight = stage.clientHeight;
    const nextRatio = Math.min(devicePixelRatio || 1, 2);
    if (nextWidth < 1 || nextHeight < 1) return;
    if (width === nextWidth && height === nextHeight && ratio === nextRatio && particles.length) return;
    width = nextWidth;
    height = nextHeight;
    ratio = nextRatio;
    resetPointer();
    coordinates.textContent = 'X: 000 // Y: 000';
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const mask = document.createElement('canvas');
    mask.width = width;
    mask.height = height;
    const maskContext = mask.getContext('2d', { willReadFrequently: true });
    // Fit the brand to the field, not the former small preview panel.
    let fontSize = fullscreen ? Math.min(width * .36, height * .68, 640) : Math.min(width * .29, height * .38, 156);
    maskContext.font = `500 ${fontSize}px Grotesk, sans-serif`;
    fontSize *= Math.min(1, width * (fullscreen ? .86 : .81) / maskContext.measureText('88n77').width);
    maskContext.font = `500 ${fontSize}px Grotesk, sans-serif`;
    maskContext.fillStyle = '#fff';
    maskContext.textAlign = 'center';
    maskContext.textBaseline = 'middle';
    maskContext.fillText('88n77', width / 2, height * (fullscreen ? .47 : .5) + fontSize * .02);
    const pixels = maskContext.getImageData(0, 0, width, height).data;
    const step = width < 420 ? 3 : width < 600 ? 4 : width > 1700 ? 7 : 6;
    pointer.radius = Math.min(fullscreen ? 135 : 95, width * .19);
    particles = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (pixels[(y * width + x) * 4 + 3] <= 128) continue;
        const orange = Math.random() < .085;
        particles.push({
          x, y,
          ox: x, oy: y, vx: 0, vy: 0,
          size: orange ? (width < 420 ? 1.65 : fullscreen ? 2.35 : 2.1) : (width < 420 ? 1.05 : fullscreen ? 1.65 : 1.45),
          color: orange ? laser : 'rgba(244,244,246,.88)',
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    if (particleCount) particleCount.textContent = particles.length.toLocaleString('en-US');
    stage.classList.add('is-ready');
    paintStatic();
    reconcile();
  }

  function animate(timestamp) {
    frame = null;
    if (paused || !inView || document.hidden || !ready) return;
    const elapsed = previousTime ? timestamp - previousTime : 16.667;
    if (elapsed < 16.1) {
      frame = requestAnimationFrame(animate);
      return;
    }
    const delta = Math.min(elapsed / 16.667, 2);
    previousTime = timestamp;
    time += .03 * delta;
    context.clearRect(0, 0, width, height);
    const scanY = ((Math.sin(time * .45) + 1) / 2) * height;
    context.strokeStyle = 'rgba(255,105,0,.12)';
    context.lineWidth = .75;
    context.beginPath();
    context.moveTo(0, scanY);
    context.lineTo(width, scanY);
    context.stroke();

    for (const particle of particles) {
      const waveX = Math.sin(time + particle.oy * .025 + particle.phase) * 1.4;
      const waveY = Math.cos(time + particle.ox * .025 + particle.phase) * 1.4;
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy);
      if (distance < pointer.radius && distance > 0) {
        const force = (pointer.radius - distance) / pointer.radius;
        particle.vx -= dx / distance * force * 4.2 * delta;
        particle.vy -= dy / distance * force * 4.2 * delta;
      }
      particle.vx += (particle.ox + waveX - particle.x) * .09 * delta;
      particle.vy += (particle.oy + waveY - particle.y) * .09 * delta;
      particle.vx *= Math.pow(.82, delta);
      particle.vy *= Math.pow(.82, delta);
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      context.fillStyle = particle.color;
      context.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
    frame = requestAnimationFrame(animate);
  }

  function reconcile() {
    reconcileTelemetry();
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = 0;
    if (!ready) return;
    if (paused) paintStatic();
    else if (inView && !document.hidden) frame = requestAnimationFrame(animate);
  }

  function resetPointer() { pointer.x = -10000; pointer.y = -10000; }
  function movePointer(event) {
    if (event.target.closest('button, a')) { resetPointer(); return; }
    const rect = stage.getBoundingClientRect();
    pointer.x = event.clientX - rect.left - stage.clientLeft;
    pointer.y = event.clientY - rect.top - stage.clientTop;
    coordinates.textContent = `X: ${String(Math.round(pointer.x)).padStart(3, '0')} // Y: ${String(Math.round(pointer.y)).padStart(3, '0')}`;
  }
  stage.addEventListener('pointermove', movePointer, { passive: true });
  stage.addEventListener('pointerdown', movePointer, { passive: true });
  stage.addEventListener('pointerleave', resetPointer);
  stage.addEventListener('pointercancel', resetPointer);
  stage.addEventListener('pointerup', event => { if (event.pointerType !== 'mouse') resetPointer(); });

  toggle.addEventListener('click', () => { paused = !paused; resetPointer(); updateStatus(); reconcile(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; resetPointer(); updateStatus(); reconcile(); });
  document.addEventListener('visibilitychange', reconcile);
  const visibilityObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (!inView) resetPointer();
    reconcile();
  });
  visibilityObserver.observe(stage);

  function queueResize() {
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { resizeFrame = null; if (ready) rebuild(); });
  }
  const resizeObserver = new ResizeObserver(queueResize);
  resizeObserver.observe(stage);
  window.addEventListener('resize', queueResize, { passive: true });
  window.addEventListener('pagehide', () => { if (telemetryTimer !== null) clearInterval(telemetryTimer); telemetryTimer = null; });
  window.addEventListener('pageshow', event => { if (event.persisted) reconcile(); });

  updateStatus();
  const fontReady = document.fonts ? document.fonts.load('500 156px Grotesk') : Promise.resolve();
  fontReady.catch(() => {}).then(() => { ready = true; rebuild(); });
})();
