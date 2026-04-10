// --- EFFECTS DICTIONARY ---
const EFFECTS_CATEGORIES = {
    displacement: { label: "Displacement Maps (Procedurali)", items: {
      disp_noise: { name: 'Rumore Statico' }, disp_turbulence: { name: 'Turbolenza Fluida' }, disp_liquid: { name: 'Metallo Liquido' },
      disp_heat: { name: 'Heat Haze (Calore)' }, disp_glass: { name: 'Vetro Smerigliato' }, disp_oil: { name: 'Pittura ad Olio' },
      disp_wood: { name: 'Venature Legno' }, disp_marble: { name: 'Marmo Fluido' }, disp_crystal: { name: 'Cristallo Fratturato' },
      disp_sponge: { name: 'Spugna / Poroso' }, disp_water: { name: 'Caustiche Acquatiche' }, disp_fabric: { name: 'Trama Tessuto' },
      disp_cellular: { name: 'Cellulare (Finto Voronoi)' }, disp_clouds: { name: 'Nuvole Distorte' }, disp_circuit: { name: 'Circuito Digitale' },
      disp_paper: { name: 'Carta Stropicciata' }, disp_metal: { name: 'Metallo Spazzolato' }, disp_sand: { name: 'Sabbia Granulare' },
      disp_lava: { name: 'Flusso di Lava' }, disp_ice: { name: 'Ghiaccio Spaccato' }
    }},
    water: { label: "Acqua & Onde", items: {
      wave: { name: 'Onda Sinuosa' }, wave2d: { name: 'Onda 2D Complessa' }, ripple: { name: 'Ripple Radiale' }, standing: { name: 'Onda Stazionaria' }, swell: { name: 'Swell Oceanico' }
    }},
    space: { label: "Spazio & Geometria", items: {
      blackhole: { name: 'Buco Nero' }, swirl: { name: 'Swirl Dinamico' }, vortex: { name: 'Vortice Centrifugo' }, fisheye: { name: 'Lente Fisheye' }, pinch: { name: 'Lente Pinch' }, twister: { name: 'Tornado / Twister' }, perspective: { name: 'Prospettiva 3D' }, shear: { name: 'Shear Diagonale' }, bulge: { name: 'Bulge Pulsante' }
    }},
    grid: { label: "Griglie & Blocchi", items: {
      pixelate: { name: 'Pixelate Animato' }, mosaic: { name: 'Mosaico Fluttuante' }, slice: { name: 'Slice Orizzontale' }, vslice: { name: 'Slice Verticale' }, checker: { name: 'Scacchiera Mobile' }, zigzag: { name: 'Zig-Zag' }, brickwall: { name: 'Muro di Mattoni' }, tile_flip: { name: 'Tile Flip' }
    }},
    retro: { label: "Retro & Glitch", items: {
      glitch: { name: 'Glitch Digitale' }, crt: { name: 'Retro CRT' }, vhs: { name: 'Nastro VHS' }, scatter: { name: 'Noise Scatter' }
    }},
    mirror: { label: "Simmetrie", items: {
      kaleid: { name: 'Caleidoscopio' }, mirror_x: { name: 'Specchio Orizzontale' }, mirror_y: { name: 'Specchio Verticale' }, mirror_quad: { name: 'Specchio Quadruplo' }
    }},
    specials: { label: "Speciali", items: {
      melt: { name: 'Scioglimento (Melt)' }, heartbeat: { name: 'Battito Cardiaco' }
    }}
  };
  
  const EFFECTS = {};
  Object.values(EFFECTS_CATEGORIES).forEach(cat => Object.assign(EFFECTS, cat.items));

  function getCategoryKeyByEffect(effectKey) {
    for (const [categoryKey, category] of Object.entries(EFFECTS_CATEGORIES)) {
      if (category.items[effectKey]) return categoryKey;
    }
    return null;
  }

  function isDisplacementEffect(effectKey) {
    return typeof effectKey === 'string' && effectKey.startsWith('disp_');
  }

  /** Parametri extra per effetto (id univoci, usati solo quando l’effetto è attivo). */
  const EFFECT_EXTRA_DEFS = {
    glitch: [
      { id: 'glitch_sensitivity', label: 'Sensibilità bande', min: 10, max: 100, step: 1, default: 50 },
      { id: 'glitch_shift', label: 'Ampiezza shift', min: 25, max: 100, step: 1, default: 50 }
    ],
    crt: [
      { id: 'crt_scanlines', label: 'Scanline ogni N righe', min: 2, max: 10, step: 1, default: 3 },
      { id: 'crt_noise', label: 'Rumore orizzontale', min: 0, max: 100, step: 1, default: 35 }
    ],
    vhs: [
      { id: 'vhs_tracking', label: 'Tracking / tear', min: 0, max: 100, step: 1, default: 50 }
    ],
    ripple: [
      { id: 'ripple_wavelength', label: 'Distanza anelli', min: 8, max: 55, step: 1, default: 22 }
    ],
    blackhole: [
      { id: 'bh_strength', label: 'Curvatura', min: 25, max: 120, step: 1, default: 52 }
    ],
    swirl: [
      { id: 'swirl_radius', label: 'Raggio vortice', min: 12, max: 72, step: 1, default: 36 }
    ],
    vortex: [
      { id: 'vortex_pull', label: 'Tensione spirale', min: 45, max: 180, step: 1, default: 100 }
    ],
    fisheye: [
      { id: 'fisheye_strength', label: 'Forza barrel', min: 65, max: 220, step: 1, default: 100 }
    ],
    pinch: [
      { id: 'pinch_strength', label: 'Forza pinch', min: 65, max: 200, step: 1, default: 100 }
    ],
    heartbeat: [
      { id: 'hb_rate', label: 'Ritmo (BPM)', min: 42, max: 150, step: 1, default: 72 }
    ],
    kaleid: [
      { id: 'kaleid_spin', label: 'Rotazione', min: 0, max: 100, step: 1, default: 42 }
    ],
    disp_glass: [
      { id: 'glass_shift', label: 'Shift celle', min: 35, max: 130, step: 1, default: 100 }
    ],
    wave: [
      { id: 'wave_vertical', label: 'Peso onda verticale', min: 0, max: 100, step: 1, default: 72 }
    ],
    wave2d: [
      { id: 'wave2d_cross', label: 'Incrocio componenti', min: 15, max: 100, step: 1, default: 52 }
    ],
    scatter: [
      { id: 'scatter_chaos', label: 'Caos per cella', min: 40, max: 150, step: 1, default: 100 }
    ],
    melt: [
      { id: 'melt_flow', label: 'Fluidità', min: 25, max: 100, step: 1, default: 62 }
    ],
    twister: [
      { id: 'twister_vertical', label: 'Altezza rotazione', min: 45, max: 150, step: 1, default: 100 }
    ],
    bulge: [
      { id: 'bulge_sharp', label: 'Pulsazione netta', min: 15, max: 95, step: 1, default: 52 }
    ],
    pixelate: [
      { id: 'pixel_drift', label: 'Deriva blocchi', min: 15, max: 100, step: 1, default: 52 }
    ],
    checker: [
      { id: 'checker_shuffle', label: 'Velocità fase', min: 40, max: 140, step: 1, default: 100 }
    ]
  };
  
  const pseudoRandom = (x, y) => (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
  
  // Load JSZip
  const loadJSZip = () => {
    return new Promise((resolve) => {
      if (window.JSZip) return resolve(window.JSZip);
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      script.onload = () => resolve(window.JSZip);
      document.body.appendChild(script);
    });
  };
  
  // --- STATE ---
  const state = {
    imageLoaded: false,
    activeTab: 'preview',
    selectedEffect: 'disp_glass',
    openEffectCategory: getCategoryKeyByEffect('disp_glass'),
    params: {
      intensity: 40, freq: 10, block: 30, speed: 5, centerX: 50, centerY: 50, rgbSplit: 0, radius: 100, feather: 30,
      brightness: 100, contrast: 100, saturation: 100, hueShift: 0, grain: 0
    },
    globalModifiers: { squareSpin: false },
    oscillators: {
      intensity: { active: false, amount: 20, speed: 2 },
      freq: { active: false, amount: 5, speed: 1 }
    },
    frames: [],
    isPlaying: false,
    liveMode: true,
    time: 0,
    playheadIndex: 0,
    isDragging: false,
    extras: {},
    recording: { active: false, fps: 12, lastCaptureMs: 0, maxFrames: 400 }
    ,
    displacement: {
      force: 100,
      xScale: 100,
      yScale: 100,
      twist: 0,
      turbulence: 0,
      mapEnabled: false,
      mapBlend: 100,
      mapInvert: false
    }
  };
  
  // DOM Refs
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let sourceMedia = null;
  let sourceMediaKind = 'image';
  let requestRef = null;
  let playInterval = null;

  let _srcCanvas = null;
  let _srcCtx = null;
  let _dstReuse = null;
  let _dstRw = 0;
  let _dstRh = 0;
  let _exportCanvas = null;
  let _exportCtx = null;
  let _dispMapCanvas = null;
  let _dispMapCtx = null;
  let _dispMapData = null;
  let _dispMapW = 0;
  let _dispMapH = 0;
  let _dispMapName = '';
  let _dispMapVideo = null;

  function extra(key, def) {
    const v = state.extras[key];
    return v !== undefined && v !== null ? v : def;
  }

  function getSourceImageData(w, h) {
    if (!sourceMedia) return null;
    if (!_srcCanvas) {
      _srcCanvas = document.createElement('canvas');
      _srcCtx = _srcCanvas.getContext('2d', { willReadFrequently: true });
    }
    if (_srcCanvas.width !== w || _srcCanvas.height !== h) {
      _srcCanvas.width = w;
      _srcCanvas.height = h;
    }
    _srcCtx.drawImage(sourceMedia, 0, 0, w, h);
    return _srcCtx.getImageData(0, 0, w, h);
  }

  function getPooledDstImageData(w, h) {
    if (!_dstReuse || _dstRw !== w || _dstRh !== h) {
      _dstReuse = new ImageData(w, h);
      _dstRw = w;
      _dstRh = h;
    }
    return _dstReuse;
  }

  function getExportCanvas(w, h) {
    if (!_exportCanvas) {
      _exportCanvas = document.createElement('canvas');
      _exportCtx = _exportCanvas.getContext('2d');
    }
    if (_exportCanvas.width !== w || _exportCanvas.height !== h) {
      _exportCanvas.width = w;
      _exportCanvas.height = h;
    }
    return { canvas: _exportCanvas, ctx: _exportCtx };
  }

  function clamp255(v) {
    return Math.max(0, Math.min(255, v));
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;
    if (max === min) {
      h = 0;
      s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  }

  function hslToRgb(h, s, l) {
    if (s === 0) {
      const v = Math.round(l * 255);
      return [v, v, v];
    }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [
      Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      Math.round(hue2rgb(p, q, h) * 255),
      Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    ];
  }

  function setDisplacementMapStatus() {
    const status = document.getElementById('disp-map-status');
    if (!status) return;
    if (!_dispMapData || !_dispMapW || !_dispMapH) {
      status.textContent = 'Nessuna mappa caricata.';
      return;
    }
    const type = _dispMapVideo ? 'video' : 'immagine';
    status.textContent = `Mappa ${type}: ${_dispMapName || type} (${_dispMapW}x${_dispMapH})`;
  }

  function renderDisplacementControls() {
    const wrap = document.getElementById('displacement-wrap');
    if (!wrap) return;
    wrap.classList.toggle('hidden', !isDisplacementEffect(state.selectedEffect));
    setDisplacementMapStatus();
  }

  function sampleDisplacementMap(nx, ny) {
    if (!_dispMapData || !_dispMapW || !_dispMapH) return null;
    const px = Math.max(0, Math.min(_dispMapW - 1, Math.floor(nx * (_dispMapW - 1))));
    const py = Math.max(0, Math.min(_dispMapH - 1, Math.floor(ny * (_dispMapH - 1))));
    const i = (py * _dispMapW + px) * 4;
    return {
      r: _dispMapData[i],
      g: _dispMapData[i + 1],
      b: _dispMapData[i + 2]
    };
  }

  function syncDisplacementMapFrame() {
    if (!_dispMapVideo || !_dispMapCtx || !_dispMapW || !_dispMapH) return;
    _dispMapCtx.drawImage(_dispMapVideo, 0, 0, _dispMapW, _dispMapH);
    _dispMapData = _dispMapCtx.getImageData(0, 0, _dispMapW, _dispMapH).data;
  }

  function loadDisplacementMapDataUrl(dataUrl, fileName = '') {
    _dispMapVideo = null;
    const img = new Image();
    img.onload = () => {
      if (!_dispMapCanvas) {
        _dispMapCanvas = document.createElement('canvas');
        _dispMapCtx = _dispMapCanvas.getContext('2d', { willReadFrequently: true });
      }
      _dispMapCanvas.width = img.width;
      _dispMapCanvas.height = img.height;
      _dispMapCtx.clearRect(0, 0, img.width, img.height);
      _dispMapCtx.drawImage(img, 0, 0);
      const mapData = _dispMapCtx.getImageData(0, 0, img.width, img.height);
      _dispMapData = mapData.data;
      _dispMapW = img.width;
      _dispMapH = img.height;
      _dispMapName = fileName || 'custom-map';
      setDisplacementMapStatus();
      if (!state.liveMode) renderFrame(state.time);
    };
    img.src = dataUrl;
  }

  function loadDisplacementMapVideoUrl(videoUrl, fileName = '') {
    _dispMapVideo = document.createElement('video');
    _dispMapVideo.src = videoUrl;
    _dispMapVideo.muted = true;
    _dispMapVideo.loop = true;
    _dispMapVideo.playsInline = true;
    _dispMapVideo.autoplay = true;
    _dispMapVideo.addEventListener('loadedmetadata', () => {
      if (!_dispMapCanvas) {
        _dispMapCanvas = document.createElement('canvas');
        _dispMapCtx = _dispMapCanvas.getContext('2d', { willReadFrequently: true });
      }
      _dispMapW = _dispMapVideo.videoWidth;
      _dispMapH = _dispMapVideo.videoHeight;
      _dispMapCanvas.width = _dispMapW;
      _dispMapCanvas.height = _dispMapH;
      syncDisplacementMapFrame();
      _dispMapName = fileName || 'custom-map-video';
      setDisplacementMapStatus();
      if (!state.liveMode) renderFrame(state.time);
    });
    _dispMapVideo.play().catch(() => {});
  }
  
  // --- RENDER ENGINE ---
  function applyDistortion(srcData, width, height, t) {
    const dstData = getPooledDstImageData(width, height);
    const s = srcData.data, d = dstData.data;
    const sel = state.selectedEffect;
    
    const dynInt = state.params.intensity + (state.oscillators.intensity.active ? Math.sin(t * state.oscillators.intensity.speed) * state.oscillators.intensity.amount : 0);
    const dynFreq = state.params.freq + (state.oscillators.freq.active ? Math.cos(t * state.oscillators.freq.speed) * state.oscillators.freq.amount : 0);
    
    const inten = dynInt / 100;
    const freq = Math.max(0.1, dynFreq);
    const bk = Math.max(2, state.params.block);
    const cx = width * (state.params.centerX / 100);
    const cy = height * (state.params.centerY / 100);
    const rgbOff = state.params.rgbSplit;
    const brightness = state.params.brightness / 100;
    const contrast = state.params.contrast / 100;
    const saturation = state.params.saturation / 100;
    const hueShift = state.params.hueShift / 360;
    const grainAmt = state.params.grain;
    const hasSquareSpin = state.globalModifiers.squareSpin;
    const isDisp = isDisplacementEffect(sel);
    const dispForce = state.displacement.force / 100;
    const dispXScale = state.displacement.xScale / 100;
    const dispYScale = state.displacement.yScale / 100;
    const dispTwistRad = (state.displacement.twist * Math.PI) / 180;
    const dispMicro = state.displacement.turbulence / 100;
    const useCustomDispMap = isDisp && state.displacement.mapEnabled && !!_dispMapData;
    const dispMapBlend = state.displacement.mapBlend / 100;
    const dispMapDir = state.displacement.mapInvert ? -1 : 1;
    if (useCustomDispMap && _dispMapVideo) syncDisplacementMapFrame();
  
    const maxRadius = (Math.max(width, height) / 2) * (state.params.radius / 100);
    const featherPx = (Math.max(width, height) / 2) * (state.params.feather / 100);

    const halfW = width * 0.5;
    const halfH = height * 0.5;

    let glitchSens = 0.85;
    let glitchShift = 1;
    let crtScanN = 3;
    let crtNoiseAmt = 1;
    let rippleDiv = 0.2;
    let bhMul = 1;
    let swirlTight = 10;
    let vortexPull = 1;
    let fisheyeK = 1;
    let pinchK = 1;
    let hbPhase = 3;
    let kaleidSpinF = 0.2;
    let glassMul = 1;
    let waveVert = 1;
    let scCh = 1;
    let meltF = 1;
    let twistV = 1;
    let bulgeExp = 12;
    let pixDr = 1;
    let chkSh = 1;
    let w2cross = 0.52;

    if (sel === 'glitch') {
      glitchSens = 0.35 + (extra('glitch_sensitivity', 50) / 100) * 0.95;
      glitchShift = extra('glitch_shift', 50) / 50;
    }
    if (sel === 'crt') {
      crtScanN = Math.max(2, Math.min(10, Math.round(extra('crt_scanlines', 3))));
      crtNoiseAmt = 0.12 + (extra('crt_noise', 35) / 100) * 1.35;
    }
    if (sel === 'ripple') {
      rippleDiv = Math.max(0.055, (extra('ripple_wavelength', 22) / 24) * freq * 0.1);
    }
    if (sel === 'blackhole') {
      bhMul = 52 / Math.max(22, extra('bh_strength', 52));
    }
    if (sel === 'swirl') {
      swirlTight = Math.max(5, extra('swirl_radius', 36));
    }
    if (sel === 'vortex') {
      vortexPull = extra('vortex_pull', 100) / 100;
    }
    if (sel === 'fisheye') {
      fisheyeK = extra('fisheye_strength', 100) / 100;
    }
    if (sel === 'pinch') {
      pinchK = extra('pinch_strength', 100) / 100;
    }
    if (sel === 'heartbeat') {
      hbPhase = (Math.PI * extra('hb_rate', 72)) / 30;
    }
    if (sel === 'kaleid') {
      kaleidSpinF = 0.08 + (extra('kaleid_spin', 42) / 100) * 0.42;
    }
    if (sel === 'disp_glass') {
      glassMul = extra('glass_shift', 100) / 100;
    }
    if (sel === 'wave') {
      waveVert = extra('wave_vertical', 72) / 100;
    }
    if (sel === 'scatter') {
      scCh = extra('scatter_chaos', 100) / 100;
    }
    if (sel === 'melt') {
      meltF = extra('melt_flow', 62) / 62;
    }
    if (sel === 'twister') {
      twistV = extra('twister_vertical', 100) / 100;
    }
    if (sel === 'bulge') {
      bulgeExp = 6 + extra('bulge_sharp', 52) / 8;
    }
    if (sel === 'pixelate') {
      pixDr = extra('pixel_drift', 52) / 52;
    }
    if (sel === 'checker') {
      chkSh = extra('checker_shuffle', 100) / 100;
    }
    if (sel === 'wave2d') {
      w2cross = extra('wave2d_cross', 52) / 100;
    }

    let vhsTr = 0.85;
    if (sel === 'vhs') {
      vhsTr = 0.42 + (extra('vhs_tracking', 50) / 100) * 0.88;
    }
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sx = x, sy = y;
        const nx = (x - cx) / halfW;
        const ny = (y - cy) / halfH;
        const r = Math.sqrt(nx * nx + ny * ny);
        const theta = Math.atan2(ny, nx);
  
        switch (sel) {
          case 'disp_noise': const n_val = pseudoRandom(x, y); sx = x + (n_val - 0.5)*inten*100; sy = y + (pseudoRandom(y, x)-0.5)*inten*100; break;
          case 'disp_turbulence': const turb = Math.sin(x*freq*0.02+t) + Math.cos(y*freq*0.02-t); sx = x+turb*inten*40; sy = y+turb*inten*40; break;
          case 'disp_liquid': const liq = Math.sin(x*freq*0.01+t) * Math.cos(y*freq*0.01+t); sx = x+liq*inten*60; sy = y+liq*inten*60; break;
          case 'disp_heat': sx = x+Math.sin(y*freq*0.05+t*5)*inten*15; sy = y+Math.cos(x*freq*0.05+t*4)*inten*15; break;
          case 'disp_glass': { const g_bk = Math.max(2, bk / 2); const sh = inten * 20 * glassMul; sx = x + ((Math.floor(x / g_bk) % 2 === 0) ? sh : -sh); sy = y + ((Math.floor(y / g_bk) % 2 === 0) ? sh : -sh); break; }
          case 'disp_oil': sx = x+Math.sin(y*freq*0.03)*Math.cos(t)*inten*30; sy = y+Math.cos(x*freq*0.03)*Math.sin(t)*inten*30; break;
          case 'disp_wood': const w_r = Math.sqrt((x-cx)**2 + (y-cy)**2); const rings = Math.sin(w_r*freq*0.05 + Math.sin(x*0.01+t)*5); sx = x+rings*inten*30; break;
          case 'disp_marble': const m_noise = Math.sin(x*0.01 + Math.sin(y*0.02+t))*freq; sx = x+Math.sin(m_noise)*inten*50; sy = y+Math.cos(m_noise)*inten*50; break;
          case 'disp_crystal': const crysX = Math.round(x/bk)*bk; const crysY = Math.round(y/bk)*bk; const c_ang = pseudoRandom(crysX, crysY)*Math.PI*2; sx = x+Math.cos(c_ang)*inten*40; sy = y+Math.sin(c_ang)*inten*40; break;
          case 'disp_sponge': const sp_noise = Math.sin(x*freq*0.1)*Math.cos(y*freq*0.1); if(sp_noise>0.5){sx=x+inten*15; sy=y+inten*15;} break;
          case 'disp_water': const c_w1=Math.sin(x*0.02+t)+Math.sin(y*0.02+t); const c_w2=Math.sin(x*0.01-t)+Math.sin(y*0.01+t); sx=x+(c_w1+c_w2)*inten*20; sy=y+(c_w1-c_w2)*inten*20; break;
          case 'disp_fabric': sx = x+Math.sin(y*freq*0.5)*inten*10; sy = y+Math.sin(x*freq*0.5)*inten*10; break;
          case 'disp_cellular': const cellX=Math.floor(x/bk); const cellY=Math.floor(y/bk); sx=x+Math.sin(cellX*12+t)*inten*30; sy=y+Math.cos(cellY*12+t)*inten*30; break;
          case 'disp_clouds': const cl1=Math.sin(x*0.01+t)*Math.cos(y*0.01+t); const cl2=Math.sin(x*0.05-t*0.5)*Math.cos(y*0.05-t*0.5); sx=x+(cl1+cl2*0.5)*inten*80; sy=y+(cl1-cl2*0.5)*inten*80; break;
          case 'disp_circuit': const circ_x=Math.round(x/bk)*bk; const circ_y=Math.round(y/bk)*bk; if(pseudoRandom(circ_x,circ_y)>0.5){sx+=inten*20;}else{sy+=inten*20;} break;
          case 'disp_paper': const p_noise = Math.sin(x*0.05)*Math.cos(y*0.05)*Math.sin(x*0.01-y*0.01); sx=x+p_noise*inten*50; sy=y+p_noise*inten*50; break;
          case 'disp_metal': sx = x+(pseudoRandom(x,1)-0.5)*inten*30; sy=y; break;
          case 'disp_sand': const sand_v=(pseudoRandom(x*y,t)-0.5); sx=x+sand_v*inten*15; sy=y+sand_v*inten*15; break;
          case 'disp_lava': const lava_flow=Math.sin(x*0.02+y*0.05+t*2); sx=x+lava_flow*inten*30; sy=y+Math.abs(lava_flow)*inten*40; break;
          case 'disp_ice': const ice_ang=Math.floor(theta*freq)/freq; sx=x+Math.cos(ice_ang)*inten*20; sy=y+Math.sin(ice_ang)*inten*20; break;
          
          case 'wave': sx = x + Math.sin(y / height * freq * Math.PI * 2 + t) * inten * 70 * waveVert; sy = y + Math.sin(x / width * freq * Math.PI * 2 + t) * inten * 20 * (0.35 + (1 - waveVert) * 0.65); break;
          case 'wave2d': sx = x + Math.sin(y / height * freq * Math.PI * 2 + t) * inten * 60 * (0.55 + w2cross * 0.45) + Math.cos(x / width * freq * Math.PI + t) * inten * 20 * w2cross; sy = y + Math.sin(x / width * freq * Math.PI * 2 + t) * inten * 40 * (0.55 + w2cross * 0.45) + Math.cos(y / height * freq * Math.PI + t) * inten * 15 * w2cross; break;
          case 'ripple': { const rr = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2); const off = Math.sin(rr / rippleDiv - t) * inten * 50; sx = x + nx * off; sy = y + ny * off; break; }
          case 'standing': sx=x+Math.sin(x/width*freq*Math.PI*2)*Math.sin(t)*inten*60; sy=y+Math.sin(y/height*freq*Math.PI*2)*Math.cos(t)*inten*40; break;
          case 'swell': sx=x+Math.sin(y/height*Math.PI+t*0.5)*inten*80; sy=y+Math.cos(x/width*Math.PI+t*0.5)*inten*40; break;
          case 'blackhole': { const pull = inten * Math.exp(-r * freq * 0.5 * bhMul); sx = x - (x - cx) * pull * (1 + Math.sin(t) * 0.1); sy = y - (y - cy) * pull * (1 + Math.sin(t) * 0.1); break; }
          case 'swirl': { const twist = inten * Math.PI * 2 * Math.exp(-r * (freq * (10 / swirlTight))); sx = cx + Math.cos(theta + twist + t * 0.5) * r * halfW; sy = cy + Math.sin(theta + twist + t * 0.5) * r * halfH; break; }
          case 'vortex': { const vr = r * (1 + Math.sin(t) * 0.2); const va = theta + inten * 3 * vortexPull * (1 - vr) * Math.sin(t * 0.5); sx = cx + Math.cos(va) * vr * halfW; sy = cy + Math.sin(va) * vr * halfH; break; }
          case 'fisheye': { const kf = inten * 1.8 * fisheyeK * (1 + Math.sin(t) * 0.25); const rf2 = nx * nx + ny * ny; sx = cx + nx * (1 + kf * rf2) * halfW; sy = cy + ny * (1 + kf * rf2) * halfH; break; }
          case 'pinch': { const kp = inten * 1.5 * pinchK * (1 + Math.cos(t) * 0.25); const rp2 = nx * nx + ny * ny; sx = cx + nx * (1 - kp * rp2 * (1 - r)) * halfW; sy = cy + ny * (1 - kp * rp2 * (1 - r)) * halfH; break; }
          case 'twister': { const tw = inten * Math.sin(t) * Math.PI * twistV; const a2 = theta + tw * ny; sx = cx + Math.cos(a2) * r * halfW; sy = cy + Math.sin(a2) * r * halfH; break; }
          case 'perspective': const py=(y-cy)/height; sx=cx+(x-cx)*(1+py*inten*3*Math.sin(t)); sy=y+py*inten*50*Math.cos(t); break;
          case 'shear': sx=x+Math.sin(y/height*Math.PI+t)*inten*80; sy=y+Math.sin(x/width*Math.PI*freq+t*0.7)*inten*30; break;
          case 'bulge': { const br = r * (1 - inten * Math.exp(-r * r * 2) * Math.pow(Math.abs(Math.sin(t)), bulgeExp)); sx = cx + Math.cos(theta) * br * halfW; sy = cy + Math.sin(theta) * br * halfH; break; }
          case 'pixelate': { const bxc = Math.floor(x / bk) * bk + bk / 2; const byc = Math.floor(y / bk) * bk + bk / 2; sx = bxc + Math.sin(t + bxc * 0.05) * inten * bk * pixDr; sy = byc + Math.cos(t + byc * 0.05) * inten * bk * pixDr; break; }
          case 'mosaic': const mx=Math.floor(x/bk)*bk; const my=Math.floor(y/bk)*bk; const ph=Math.sin(mx*0.04+t)*Math.cos(my*0.04+t); sx=mx+ph*inten*bk*2; sy=my+Math.cos(mx*0.04+t)*inten*bk; break;
          case 'slice': const s_i=Math.floor(y/bk); sx=x+Math.sin(s_i*freq*0.1+t*2)*inten*80; break;
          case 'vslice': const s_j=Math.floor(x/bk); sy=y+Math.sin(s_j*freq*0.1+t*2)*inten*80; break;
          case 'checker': { const cxi = Math.floor(x / bk); const cyi = Math.floor(y / bk); const cph = (cxi + cyi) % 2 === 0 ? 1 : -1; sx = x + cph * Math.sin(t * 2 * chkSh) * inten * bk; sy = y + cph * Math.cos(t * 2 * chkSh) * inten * bk; break; }
          case 'zigzag': const zrow=Math.floor(y/bk); sx=x+(zrow%2===0?1:-1)*Math.sin(t*2)*inten*60; sy=y+Math.sin(x/width*freq*Math.PI*2+t)*inten*18; break;
          case 'brickwall': const brow=Math.floor(y/bk); const boff=(brow%2===0?0:bk*0.5)+Math.sin(t+brow*0.3)*inten*bk; sx=x+boff; sy=y+Math.sin(x/width*freq*Math.PI*2+t)*inten*8; break;
          case 'tile_flip': const tf_i=Math.floor(x/bk); const tf_j=Math.floor(y/bk); const tf_f=Math.sin(t+(tf_i+tf_j)*0.5)>0?1:-1; sx=x+tf_f*Math.sin(t)*inten*bk; sy=y+tf_f*Math.cos(t)*inten*bk; break;
          case 'glitch': { const band = Math.floor(y / bk); if (Math.sin(band * freq + t * 5) > (1 - inten * glitchSens)) { sx = x + Math.sin(t * 10 + band) * inten * width * 0.15 * glitchShift; } break; }
          case 'crt': { const nt = Math.floor(t * 60) + y * 17 + x * 13; sy = y + Math.sin(y * freq + t * 10) * inten * 5; sx = x + (pseudoRandom(x, nt) - 0.5) * inten * crtNoiseAmt; break; }
          case 'vhs': { const vhsNoise = Math.sin(y * 0.5 + t * 15) + Math.cos(y * 0.1 - t * 3); if (vhsNoise > 1.85 - inten * vhsTr) { sx = x + Math.sin(y + t) * inten * 150; } break; }
          case 'scatter': { const sc_seed = Math.floor(x / bk) * 100 + Math.floor(y / bk); sx = x + Math.sin(sc_seed * 12.1 * scCh + t) * inten * bk; sy = y + Math.cos(sc_seed * 31.7 * scCh + t) * inten * bk; break; }
          case 'kaleid': { const segA = Math.PI * 2 / Math.max(2, Math.floor(freq)); let a = (theta + t * kaleidSpinF + Math.PI * 2) % segA; if (a > segA / 2) a = segA - a; const kr = r * (1 + inten * 0.3 * Math.sin(t)); sx = cx + Math.cos(a) * kr * cx; sy = cy + Math.sin(a) * kr * cy; break; }
          case 'mirror_x': const mx_x=x<cx?x:width-(x-cx); sx=mx_x+Math.sin(y/height*freq*Math.PI*2+t)*inten*20; break;
          case 'mirror_y': const my_y=y<cy?y:height-(y-cy); sy=my_y+Math.cos(x/width*freq*Math.PI*2+t)*inten*20; break;
          case 'mirror_quad': const mq_x=x<cx?x:width-(x-cx); const mq_y=y<cy?y:height-(y-cy); sx=mq_x+Math.sin(t)*inten*20; sy=mq_y+Math.cos(t)*inten*20; break;
          case 'melt': { const meltDrop = Math.sin(x / width * freq * Math.PI * 2) * inten * 100; sy = y - Math.abs(meltDrop) * ((Math.sin(t + x * 0.01) + 1) / 2) * meltF; break; }
          case 'heartbeat': { const pulse = 1 + Math.pow(Math.abs(Math.sin(t * hbPhase)), 12) * inten * 0.3; sx = cx + (x - cx) * pulse; sy = cy + (y - cy) * pulse; break; }
        }

        if (isDisp) {
          let dx = (sx - x) * dispForce * dispXScale;
          let dy = (sy - y) * dispForce * dispYScale;

          if (dispTwistRad !== 0) {
            const rx = dx * Math.cos(dispTwistRad) - dy * Math.sin(dispTwistRad);
            const ry = dx * Math.sin(dispTwistRad) + dy * Math.cos(dispTwistRad);
            dx = rx;
            dy = ry;
          }

          if (dispMicro > 0) {
            const micro = (pseudoRandom(x * 0.7 + t * 30, y * 0.7 - t * 20) - 0.5) * 2;
            dx += micro * 24 * inten * dispMicro;
            dy += (0.5 - micro) * 24 * inten * dispMicro;
          }

          if (useCustomDispMap) {
            const mapPx = sampleDisplacementMap(x / width, y / height);
            if (mapPx) {
              const mapDx = ((mapPx.r / 255) - 0.5) * 2 * dispMapDir;
              const mapDy = ((mapPx.g / 255) - 0.5) * 2 * dispMapDir;
              dx += mapDx * 120 * inten * dispMapBlend;
              dy += mapDy * 120 * inten * dispMapBlend;
            }
          }

          sx = x + dx;
          sy = y + dy;
        }
  
        // --- SQUARE SPIN MODIFIER ---
        if (hasSquareSpin) {
          const sqSize = bk * 5; 
          if (Math.abs(x - cx) < sqSize && Math.abs(y - cy) < sqSize) {
            let cycleTime = t % 2.0;
            let progress = Math.max(0, Math.min(1, cycleTime * 2));
            let smoothStep = progress * progress * (3 - 2 * progress);
            let currentRot = Math.floor(t / 2) * (Math.PI / 2) + smoothStep * (Math.PI / 2);
            let dx = sx - cx; let dy = sy - cy;
            dx += Math.sin(dx * freq * 0.05 + t * 5) * inten * 15;
            sx = cx + (dx * Math.cos(currentRot) - dy * Math.sin(currentRot));
            sy = cy + (dx * Math.sin(currentRot) + dy * Math.cos(currentRot));
          } else {
            sx += Math.sin(y * 0.1 + t * 10) * inten * 2;
            sy += Math.cos(x * 0.1 + t * 10) * inten * 2;
          }
        }
  
        // --- FEATHERING ---
        if (state.params.radius < 100) {
          const distToCenter = Math.sqrt((x - cx)**2 + (y - cy)**2);
          let blend = 1;
          if (distToCenter > maxRadius) blend = 0;
          else if (distToCenter > maxRadius - featherPx && featherPx > 0) blend = (maxRadius - distToCenter) / featherPx;
          sx = x + (sx - x) * blend; sy = y + (sy - y) * blend;
        }
  
        sx = Math.max(0, Math.min(width - 1, Math.round(sx)));
        sy = Math.max(0, Math.min(height - 1, Math.round(sy)));
  
        const di = (y * width + x) * 4;
        
        // --- RGB SPLIT ---
        let outR, outG, outB, outA;
        if (rgbOff > 0) {
          const sxR = Math.max(0, Math.min(width - 1, Math.round(sx - rgbOff*inten)));
          const sxB = Math.max(0, Math.min(width - 1, Math.round(sx + rgbOff*inten)));
          const siR = (sy * width + sxR) * 4;
          const siB = (sy * width + sxB) * 4;
          const si = (sy * width + sx) * 4;
          outR = s[siR];
          outG = s[si + 1];
          outB = s[siB + 2];
          outA = s[si + 3];
        } else {
          const si = (sy * width + sx) * 4;
          outR = s[si];
          outG = s[si + 1];
          outB = s[si + 2];
          outA = s[si + 3];
        }

        outR = ((outR - 128) * contrast + 128) * brightness;
        outG = ((outG - 128) * contrast + 128) * brightness;
        outB = ((outB - 128) * contrast + 128) * brightness;

        const hsl = rgbToHsl(clamp255(outR), clamp255(outG), clamp255(outB));
        let newHue = hsl.h + hueShift;
        if (newHue > 1) newHue -= 1;
        if (newHue < 0) newHue += 1;
        const newSat = Math.max(0, Math.min(1, hsl.s * saturation));
        const [satR, satG, satB] = hslToRgb(newHue, newSat, hsl.l);
        outR = satR;
        outG = satG;
        outB = satB;

        if (grainAmt > 0) {
          const grainNoise = (pseudoRandom(x + t * 60, y - t * 37) - 0.5) * 2 * grainAmt;
          outR += grainNoise;
          outG += grainNoise;
          outB += grainNoise;
        }

        if (sel === 'crt' && y % crtScanN === 0) { outR *= 0.8; outG *= 0.8; outB *= 0.8; }
        d[di] = clamp255(outR);
        d[di + 1] = clamp255(outG);
        d[di + 2] = clamp255(outB);
        d[di + 3] = outA;
      }
    }
    return dstData;
  }

  function pushRecordedFrame(force = false) {
    if (!state.recording.active || !state.imageLoaded) return;
    const now = performance.now();
    const minDelta = 1000 / Math.max(1, state.recording.fps);
    if (!force && now - state.recording.lastCaptureMs < minDelta) return;
    state.recording.lastCaptureMs = now;
    state.frames.push(canvas.toDataURL('image/png'));
    if (state.frames.length > state.recording.maxFrames) {
      state.frames = state.frames.slice(state.frames.length - state.recording.maxFrames);
    }
    renderTimeline();
  }
  
  function renderFrame(t) {
    if (!sourceMedia || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const srcData = getSourceImageData(w, h);
    if (!srcData) return;
    const dstData = applyDistortion(srcData, w, h, t);
    ctx.putImageData(dstData, 0, 0);
    pushRecordedFrame();
  }
  
  // --- LOOP ---
  let lastTime = performance.now();
  function loop(currentTime) {
    if (state.liveMode && state.imageLoaded && !state.isPlaying) {
      const dt = (currentTime - lastTime) / 1000;
      state.time += dt * state.params.speed;
      renderFrame(state.time);
    }
    lastTime = currentTime;
    requestRef = requestAnimationFrame(loop);
  }
  
  // --- CODE GENERATOR ---
  function updateCodeView() {
    const sourceLabel = sourceMediaKind === 'video' ? 'Video' : 'Immagine';
    const extraDefs = EFFECT_EXTRA_DEFS[state.selectedEffect];
    const extraSnap = {};
    if (extraDefs) {
      extraDefs.forEach(d => { extraSnap[d.id] = state.extras[d.id] ?? d.default; });
    }
    const extraLine = Object.keys(extraSnap).length
      ? `\n  // Extra effetto: ${JSON.stringify(extraSnap)}`
      : '';
    const codeStr = `// Distortion Studio PRO - Engine 50+ FX
  // Effetto Selezionato: ${EFFECTS[state.selectedEffect].name}
  // Sorgente media: ${sourceLabel}
  // Modificatore SquareSpin: ${state.globalModifiers.squareSpin ? 'ATTIVO' : 'DISATTIVO'}${extraLine}
  
  function applyDistortion(srcData, width, height, t) {
    const dstData = new ImageData(width, height);
    const s = srcData.data, d = dstData.data;
    
    const baseInt = ${state.params.intensity};
    const dynInt = baseInt + (${state.oscillators.intensity.active ? `Math.sin(t * ${state.oscillators.intensity.speed}) * ${state.oscillators.intensity.amount}` : '0'});
    const inten = dynInt / 100;
    
    const freq = Math.max(0.1, ${state.params.freq} + (${state.oscillators.freq.active ? `Math.cos(t * ${state.oscillators.freq.speed}) * ${state.oscillators.freq.amount}` : '0'}));
    const bk = ${state.params.block};
    const cx = width * ${state.params.centerX / 100};
    const cy = height * ${state.params.centerY / 100};
    const rgbOff = ${state.params.rgbSplit};
    
    const maxRadius = (Math.max(width, height) / 2) * (${state.params.radius} / 100);
    const featherPx = (Math.max(width, height) / 2) * (${state.params.feather} / 100);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sx = x, sy = y;
        
        // -- Logica effetto interno [Rimosso per brevita nella preview] --
  
        ${state.globalModifiers.squareSpin ? `
        // -- Logica Square Spin --
        const sqSize = bk * 5;
        if (Math.abs(x - cx) < sqSize && Math.abs(y - cy) < sqSize) {
          let cycleTime = t % 2.0; let progress = Math.max(0, Math.min(1, cycleTime * 2));
          let smoothStep = progress * progress * (3 - 2 * progress);
          let currentRot = Math.floor(t / 2) * (Math.PI / 2) + smoothStep * (Math.PI / 2);
          let dx = sx - cx; let dy = sy - cy;
          dx += Math.sin(dx * freq * 0.05 + t * 5) * inten * 15;
          sx = cx + (dx * Math.cos(currentRot) - dy * Math.sin(currentRot));
          sy = cy + (dx * Math.sin(currentRot) + dy * Math.cos(currentRot));
        } else {
          sx += Math.sin(y * 0.1 + t * 10) * inten * 2; sy += Math.cos(x * 0.1 + t * 10) * inten * 2;
        }` : ''}
  
        if (${state.params.radius} < 100) {
          const distToCenter = Math.sqrt((x - cx)**2 + (y - cy)**2);
          let blend = 1;
          if (distToCenter > maxRadius) blend = 0;
          else if (distToCenter > maxRadius - featherPx && featherPx > 0) blend = (maxRadius - distToCenter) / featherPx;
          sx = x + (sx - x) * blend; sy = y + (sy - y) * blend;
        }
  
        sx = Math.max(0, Math.min(width - 1, Math.round(sx)));
        sy = Math.max(0, Math.min(height - 1, Math.round(sy)));
        const di = (y * width + x) * 4;
        
        if(rgbOff > 0) {
          const siR = (sy * width + Math.max(0, Math.min(width-1, Math.round(sx - rgbOff*inten)))) * 4;
          const siB = (sy * width + Math.max(0, Math.min(width-1, Math.round(sx + rgbOff*inten)))) * 4;
          const si = (sy * width + sx) * 4;
          d[di] = s[siR]; d[di+1] = s[si+1]; d[di+2] = s[siB+2]; d[di+3] = s[si+3];
        } else {
          const si = (sy * width + sx) * 4;
          d[di] = s[si]; d[di+1] = s[si+1]; d[di+2] = s[si+2]; d[di+3] = s[si+3];
        }
      }
    }
    return dstData;
  }`;
    document.getElementById('code-output').textContent = codeStr;
  }
  
  function normalizeFilter(s) {
    return (s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function ensureExtraDefaults(effectKey) {
    const defs = EFFECT_EXTRA_DEFS[effectKey];
    if (!defs) return;
    defs.forEach(def => {
      if (state.extras[def.id] === undefined) state.extras[def.id] = def.default;
    });
  }

  function renderEffectExtras() {
    const wrap = document.getElementById('effect-extras-wrap');
    const box = document.getElementById('effect-extras-controls');
    const hint = document.getElementById('effect-extras-hint');
    if (!wrap || !box) return;
    const defs = EFFECT_EXTRA_DEFS[state.selectedEffect];
    ensureExtraDefaults(state.selectedEffect);
    if (!defs || !defs.length) {
      wrap.classList.add('hidden');
      box.innerHTML = '';
      if (hint) {
        hint.classList.add('hidden');
        hint.textContent = '';
      }
      return;
    }
    wrap.classList.remove('hidden');
    if (hint) {
      hint.textContent = `Regolazioni dedicate a «${EFFECTS[state.selectedEffect].name}».`;
      hint.classList.remove('hidden');
    }
    box.innerHTML = defs.map(def => {
      const v = state.extras[def.id] ?? def.default;
      const step = def.step !== undefined ? def.step : 1;
      const disp = step < 1 ? Number(v).toFixed(2) : String(Math.round(Number(v)));
      return `<div>
        <div class="flex justify-between items-end mb-1">
          <label class="block text-[10px] text-neutral-500" for="extra-${def.id}">${def.label}</label>
          <span class="text-[10px] font-mono text-neutral-200 tabular-nums" id="val-extra-${def.id}">${disp}</span>
        </div>
        <input type="range" id="extra-${def.id}" data-extra-id="${def.id}" min="${def.min}" max="${def.max}" step="${step}" value="${v}" class="w-full">
      </div>`;
    }).join('');
  }

  function renderEffectsList() {
    const effContainer = document.getElementById('effects-container');
    const searchEl = document.getElementById('effects-search');
    const q = normalizeFilter(searchEl ? searchEl.value : '');
    const total = Object.keys(EFFECTS).length;
    const selectedCategory = getCategoryKeyByEffect(state.selectedEffect);

    if (!q && selectedCategory && state.openEffectCategory !== selectedCategory) {
      state.openEffectCategory = selectedCategory;
    }

    document.getElementById('effects-title').innerHTML = `<i data-lucide="layers" class="w-3.5 h-3.5 shrink-0"></i> Catalogo effetti <span class="text-neutral-600 font-normal">(${total})</span>`;

    let effHTML = '';
    let catIndex = 0;
    for (const [catKey, cat] of Object.entries(EFFECTS_CATEGORIES)) {
      const entries = Object.entries(cat.items).filter(([, data]) => {
        if (!q) return true;
        return normalizeFilter(data.name).includes(q);
      });
      if (entries.length === 0) continue;

      let shouldOpen = false;
      if (q) shouldOpen = true;
      else if (state.openEffectCategory) shouldOpen = state.openEffectCategory === catKey;
      else shouldOpen = catIndex === 0;
      catIndex++;

      effHTML += `<details class="effect-cat" data-category="${catKey}"${shouldOpen ? ' open' : ''}><summary><span>${cat.label}</span><i data-lucide="chevron-right" class="chevron" aria-hidden="true"></i></summary><div class="effect-cat-inner"><div class="grid grid-cols-2 gap-1.5">`;
      for (const [key, data] of entries) {
        const activeCls = state.selectedEffect === key
          ? 'bg-neutral-800 border-neutral-500 text-white font-medium'
          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-neutral-200';
        effHTML += `<button type="button" data-effect="${key}" class="effect-btn text-[10px] leading-snug p-2 rounded-md text-left transition-all border min-h-[2.25rem] ${activeCls}">${data.name}</button>`;
      }
      effHTML += `</div></div></details>`;
    }

    if (!effHTML) {
      effHTML = `<p class="text-xs text-neutral-500 text-center py-4 px-2">Nessun effetto corrisponde alla ricerca.</p>`;
    }

    effContainer.innerHTML = effHTML;
    lucide.createIcons();

    effContainer.querySelectorAll('.effect-cat').forEach(details => {
      details.addEventListener('toggle', () => {
        if (!details.open || q) return;
        state.openEffectCategory = details.dataset.category || null;
        effContainer.querySelectorAll('.effect-cat').forEach(other => {
          if (other !== details) other.open = false;
        });
      });
    });

    effContainer.querySelectorAll('.effect-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const el = e.target.closest('.effect-btn');
        if (!el || !el.dataset.effect) return;
        state.selectedEffect = el.dataset.effect;
        state.openEffectCategory = getCategoryKeyByEffect(state.selectedEffect);
        renderEffectsList();
        updateCodeView();
        if (!state.liveMode) renderFrame(state.time);
      });
    });
    renderEffectExtras();
    renderDisplacementControls();
  }

  // --- SETUP UI BINDINGS ---
  function initUI() {
    lucide.createIcons();
    renderEffectsList();

    if (window.__distortionUiBound) return;
    window.__distortionUiBound = true;

    const searchInput = document.getElementById('effects-search');
    if (searchInput) {
      let t;
      searchInput.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => renderEffectsList(), 120);
      });
    }

    const extrasWrap = document.getElementById('effect-extras-wrap');
    if (extrasWrap) {
      extrasWrap.addEventListener('input', e => {
        const inp = e.target.closest('[data-extra-id]');
        if (!inp) return;
        const id = inp.dataset.extraId;
        state.extras[id] = parseFloat(inp.value);
        const vl = document.getElementById(`val-extra-${id}`);
        if (vl) {
          const step = parseFloat(inp.step) || 1;
          vl.textContent = step < 1 ? Number(inp.value).toFixed(2) : String(Math.round(parseFloat(inp.value)));
        }
        if (!state.liveMode) renderFrame(state.time);
        if (state.activeTab === 'code') updateCodeView();
      });
    }

    // Event Listeners Base Params
    ['intensity', 'freq', 'block', 'speed', 'centerX', 'centerY', 'radius', 'feather', 'rgbSplit', 'brightness', 'contrast', 'saturation', 'hueShift', 'grain'].forEach(id => {
      document.getElementById(id).addEventListener('input', e => {
        state.params[id] = parseFloat(e.target.value);
        if(document.getElementById(`val-${id}`)) {
          const withUnit = id === 'rgbSplit'
            ? `${e.target.value}px`
            : ['radius', 'feather', 'brightness', 'contrast', 'saturation', 'grain'].includes(id)
              ? `${e.target.value}%`
              : id === 'hueShift'
                ? `${e.target.value}deg`
                : e.target.value;
          document.getElementById(`val-${id}`).innerText = withUnit;
        }
        if(!state.liveMode) renderFrame(state.time);
        if(state.activeTab === 'code') updateCodeView();
      });
    });

    const dispSliders = ['force', 'xScale', 'yScale', 'twist', 'turbulence', 'mapBlend'];
    dispSliders.forEach(key => {
      const id = `disp-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', e => {
        state.displacement[key] = parseFloat(e.target.value);
        const out = document.getElementById(`val-${id}`);
        if (out) {
          out.textContent = key === 'twist' ? `${e.target.value}deg` : `${e.target.value}%`;
        }
        if (!state.liveMode) renderFrame(state.time);
      });
    });

    const dispMapEnable = document.getElementById('disp-map-enable');
    const dispMapInvert = document.getElementById('disp-map-invert');
    if (dispMapEnable) {
      dispMapEnable.addEventListener('change', e => {
        state.displacement.mapEnabled = e.target.checked;
        if (!state.liveMode) renderFrame(state.time);
      });
    }
    if (dispMapInvert) {
      dispMapInvert.addEventListener('change', e => {
        state.displacement.mapInvert = e.target.checked;
        if (!state.liveMode) renderFrame(state.time);
      });
    }
  
    // LFO Checkboxes & Sliders
    ['int', 'freq'].forEach(p => {
      const fullP = p === 'int' ? 'intensity' : 'freq';
      document.getElementById(`lfo-${p}-active`).addEventListener('change', e => {
        state.oscillators[fullP].active = e.target.checked;
        document.getElementById(`lfo-${p}-controls`).className = e.target.checked ? 'flex flex-col gap-2 mt-2' : 'hidden gap-2';
        if(state.activeTab === 'code') updateCodeView();
      });
      ['amt', 'speed'].forEach(k => {
        const fullK = k === 'amt' ? 'amount' : 'speed';
        document.getElementById(`lfo-${p}-${k}`).addEventListener('input', e => {
          state.oscillators[fullP][fullK] = parseFloat(e.target.value);
          if(state.activeTab === 'code') updateCodeView();
        });
      });
    });
  
    // Square Spin Modifier
    document.getElementById('mod-square-spin').addEventListener('change', e => {
      state.globalModifiers.squareSpin = e.target.checked;
      const on = e.target.checked;
      document.getElementById('toggle-bg').className = on
        ? 'block w-9 h-5 rounded-full transition-colors bg-white shrink-0 relative'
        : 'block w-9 h-5 rounded-full transition-colors bg-neutral-700 shrink-0 relative';
      const dot = document.getElementById('toggle-dot');
      dot.className = on
        ? 'absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-neutral-950 transition-transform shadow-sm'
        : 'absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm';
      dot.style.transform = on ? 'translateX(1rem)' : 'translateX(0)';
      if (state.activeTab === 'code') updateCodeView();
    });
  
    // Reset Button
    document.getElementById('btn-reset').addEventListener('click', () => {
      state.params = {
        intensity: 40, freq: 10, block: 30, speed: 5, centerX: 50, centerY: 50, rgbSplit: 0, radius: 100, feather: 30,
        brightness: 100, contrast: 100, saturation: 100, hueShift: 0, grain: 0
      };
      Object.keys(state.params).forEach(k => {
        const input = document.getElementById(k);
        if(input) input.value = state.params[k];
        const valLabel = document.getElementById(`val-${k}`);
        if (valLabel) {
          valLabel.innerText = k === 'rgbSplit'
            ? `${state.params[k]}px`
            : ['radius', 'feather', 'brightness', 'contrast', 'saturation', 'grain'].includes(k)
              ? `${state.params[k]}%`
              : k === 'hueShift'
                ? `${state.params[k]}deg`
                : state.params[k];
        }
      });
      const ed = EFFECT_EXTRA_DEFS[state.selectedEffect];
      if (ed) ed.forEach(def => { state.extras[def.id] = def.default; });
      state.displacement = {
        force: 100,
        xScale: 100,
        yScale: 100,
        twist: 0,
        turbulence: 0,
        mapEnabled: false,
        mapBlend: 100,
        mapInvert: false
      };
      ['force', 'xScale', 'yScale', 'twist', 'turbulence', 'mapBlend'].forEach(key => {
        const id = `disp-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
        const input = document.getElementById(id);
        const valEl = document.getElementById(`val-${id}`);
        if (input) input.value = String(state.displacement[key]);
        if (valEl) valEl.textContent = key === 'twist' ? `${state.displacement[key]}deg` : `${state.displacement[key]}%`;
      });
      if (dispMapEnable) dispMapEnable.checked = false;
      if (dispMapInvert) dispMapInvert.checked = false;
      renderEffectExtras();
      renderDisplacementControls();
      if (!state.liveMode) renderFrame(state.time);
      if (state.activeTab === 'code') updateCodeView();
    });
  
    function setCanvasReady(w, h) {
      canvas.width = w;
      canvas.height = h;
      state.imageLoaded = true;
      document.getElementById('empty-state').classList.add('hidden');
      canvas.classList.replace('opacity-0', 'opacity-100');
      canvas.classList.add('cursor-crosshair', 'canvas-ready');
    }

    function loadImageDataUrl(dataUrl) {
      const img = new Image();
      img.onload = () => {
        sourceMedia = img;
        sourceMediaKind = 'image';
        let w = img.width;
        let h = img.height;
        if (w > 800 || h > 800) {
          const r = Math.min(800 / w, 800 / h);
          w *= r;
          h *= r;
        }
        setCanvasReady(w, h);
        renderFrame(0);
      };
      img.src = dataUrl;
    }

    function loadVideoUrl(videoUrl) {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.addEventListener('loadedmetadata', () => {
        sourceMedia = video;
        sourceMediaKind = 'video';
        let w = video.videoWidth;
        let h = video.videoHeight;
        if (w > 800 || h > 800) {
          const r = Math.min(800 / w, 800 / h);
          w = Math.max(2, Math.round(w * r));
          h = Math.max(2, Math.round(h * r));
        }
        setCanvasReady(w, h);
        renderFrame(0);
      });
      video.play().catch(() => {});
    }

    function loadMainMediaFile(file) {
      if (!file) return;
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = ev => loadImageDataUrl(ev.target.result);
        reader.readAsDataURL(file);
        return;
      }
      if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        loadVideoUrl(url);
      }
    }

    document.getElementById('upload-image').addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file || (!file.type.startsWith('image/') && !file.type.startsWith('video/'))) return;
      loadMainMediaFile(file);
      e.target.value = '';
    });

    const uploadDispMap = document.getElementById('upload-disp-map');
    if (uploadDispMap) {
      uploadDispMap.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file || (!file.type.startsWith('image/') && !file.type.startsWith('video/'))) return;
        if (file.type.startsWith('video/')) {
          const url = URL.createObjectURL(file);
          loadDisplacementMapVideoUrl(url, file.name);
        } else {
          const reader = new FileReader();
          reader.onload = ev => loadDisplacementMapDataUrl(ev.target.result, file.name);
          reader.readAsDataURL(file);
        }
        e.target.value = '';
      });
    }

    const dropZone = document.getElementById('drop-zone');
    if (dropZone) {
      ['dragenter', 'dragover'].forEach(type => {
        dropZone.addEventListener(type, ev => {
          ev.preventDefault();
          ev.stopPropagation();
          dropZone.classList.add('is-dragover');
        });
      });
      ['dragleave', 'drop'].forEach(type => {
        dropZone.addEventListener(type, ev => {
          ev.preventDefault();
          ev.stopPropagation();
          dropZone.classList.remove('is-dragover');
        });
      });
      dropZone.addEventListener('drop', ev => {
        const file = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
        if (!file || (!file.type.startsWith('image/') && !file.type.startsWith('video/'))) return;
        loadMainMediaFile(file);
      });
    }
  
    // Mouse Interaction (Center X/Y)
    const updateCenter = e => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      state.params.centerX = Math.max(0, Math.min(100, (x / canvas.width) * 100));
      state.params.centerY = Math.max(0, Math.min(100, (y / canvas.height) * 100));
      document.getElementById('centerX').value = state.params.centerX;
      document.getElementById('centerY').value = state.params.centerY;
      if(!state.liveMode) renderFrame(state.time);
    };
    canvas.addEventListener('pointerdown', e => { state.isDragging = true; updateCenter(e); });
    canvas.addEventListener('pointermove', e => { if(state.isDragging) updateCenter(e); });
    window.addEventListener('pointerup', () => state.isDragging = false);
  
    const tabPreview = document.getElementById('tab-preview');
    const tabCode = document.getElementById('tab-code');
    const codeView = document.getElementById('code-view');

    function setMainTab(which) {
      state.activeTab = which;
      const isPreview = which === 'preview';
      tabPreview.setAttribute('aria-selected', isPreview ? 'true' : 'false');
      tabCode.setAttribute('aria-selected', isPreview ? 'false' : 'true');
      codeView.classList.toggle('hidden', isPreview);
      canvas.classList.toggle('hidden', !isPreview);
      if (!isPreview) updateCodeView();
    }

    tabPreview.addEventListener('click', () => setMainTab('preview'));
    tabCode.addEventListener('click', () => setMainTab('code'));
  
    // Timeline / Export / Auto Gen
    document.getElementById('btn-live').addEventListener('click', e => {
      state.liveMode = !state.liveMode;
      const btn = e.currentTarget;
      btn.setAttribute('aria-pressed', state.liveMode ? 'true' : 'false');
      btn.classList.toggle('live-on', state.liveMode);
      btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3 h-3 ${state.liveMode ? 'animate-spin-slow' : ''}"></i> ${state.liveMode ? 'Live on' : 'Live off'}`;
      lucide.createIcons();
    });
  
    document.getElementById('btn-cap-frame').addEventListener('click', () => {
      if(!state.imageLoaded) return;
      state.frames.push(canvas.toDataURL('image/png'));
      renderTimeline();
    });

    const recordBtn = document.getElementById('btn-record');
    const recordFps = document.getElementById('record-fps');
    const recordFpsLabel = document.getElementById('val-record-fps');
    if (recordFps) {
      recordFps.addEventListener('input', e => {
        state.recording.fps = parseInt(e.target.value, 10) || 12;
        if (recordFpsLabel) recordFpsLabel.textContent = String(state.recording.fps);
      });
    }
    if (recordBtn) {
      recordBtn.addEventListener('click', () => {
        state.recording.active = !state.recording.active;
        recordBtn.setAttribute('aria-pressed', state.recording.active ? 'true' : 'false');
        recordBtn.classList.toggle('is-recording', state.recording.active);
        if (state.recording.active) {
          state.recording.lastCaptureMs = 0;
          pushRecordedFrame(true);
        }
      });
    }
  
    document.getElementById('btn-clear-frames').addEventListener('click', () => {
      state.frames = []; renderTimeline();
    });
  
    document.getElementById('btn-gen-auto').addEventListener('click', () => {
      if(!state.imageLoaded) return;
      state.liveMode = false;
      const liveBtn = document.getElementById('btn-live');
      liveBtn.setAttribute('aria-pressed', 'false');
      liveBtn.classList.remove('live-on');
      liveBtn.innerHTML = `<i data-lucide="refresh-cw" class="w-3 h-3"></i> Live off`;
      lucide.createIcons();
      
      const count = 15;
      const newFrames = [];
      const w = canvas.width;
      const h = canvas.height;
      const { canvas: ec, ctx: ex } = getExportCanvas(w, h);
      const srcSnapshot = getSourceImageData(w, h);
      for (let i = 0; i < count; i++) {
        const dstD = applyDistortion(srcSnapshot, w, h, (i / count) * Math.PI * 4);
        ex.putImageData(dstD, 0, 0);
        newFrames.push(ec.toDataURL('image/png'));
      }
      state.frames = newFrames;
      renderTimeline();
    });
  
    document.getElementById('btn-play').addEventListener('click', e => {
      state.isPlaying = !state.isPlaying;
      const btn = document.getElementById('btn-play');
      if (state.isPlaying && state.frames.length > 0) {
        state.liveMode = false;
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'Metti in pausa');
        btn.classList.add('is-playing');
        btn.innerHTML = `<i data-lucide="pause" class="w-4 h-4 fill-current"></i>`;
        playInterval = setInterval(() => {
          state.playheadIndex = (state.playheadIndex + 1) % state.frames.length;
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = state.frames[state.playheadIndex];
          renderTimeline();
        }, 1000 / 12);
      } else {
        state.isPlaying = false;
        clearInterval(playInterval);
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Riproduci sequenza');
        btn.classList.remove('is-playing');
        btn.innerHTML = `<i data-lucide="play" class="w-4 h-4 fill-current"></i>`;
      }
      lucide.createIcons();
    });
  
    document.getElementById('btn-export-zip').addEventListener('click', async () => {
      if(state.frames.length === 0) return alert('Nessun frame da esportare!');
      const JSZip = await loadJSZip();
      const zip = new JSZip();
      state.frames.forEach((frameUrl, i) => zip.file(`frame_${String(i).padStart(3, '0')}.png`, frameUrl.split(',')[1], {base64: true}));
      const blob = await zip.generateAsync({type: 'blob'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'distortion_sequence.zip'; a.click();
    });
  }
  
  function renderTimeline() {
    const strip = document.getElementById('timeline-strip');
    if(state.frames.length === 0) {
      strip.innerHTML = '<div class="w-full text-center text-xs text-neutral-600 py-4">Nessun frame catturato.</div>'; return;
    }
    strip.innerHTML = state.frames.map((src, i) => {
      const border = (state.isPlaying && state.playheadIndex === i) ? 'border-neutral-200 scale-[1.02]' : 'border-neutral-700 hover:border-neutral-500';
      return `<div class="timeline-thumb relative shrink-0 h-[4.5rem] w-[4.5rem] sm:h-[4.75rem] sm:w-[4.75rem] bg-black border-2 rounded-lg overflow-hidden transition-all ${border}">
        <img src="${src}" alt="" class="w-full h-full object-cover" />
        <div class="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono tabular-nums text-center py-0.5 text-neutral-200">${i+1}</div>
      </div>`;
    }).join('');
  }
  
  initUI();
  updateCodeView();
  requestRef = requestAnimationFrame(loop);
