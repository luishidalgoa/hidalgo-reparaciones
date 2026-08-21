/* Kit de limpieza en 3D.
   Geometría hecha a mano con primitivas: no hace falta un archivo de modelo,
   y así el conjunto pesa lo que pesa la librería y nada más. Cuatro piezas
   sobre una bandeja: brocha, destornillador, jeringa de pasta y bote de
   isopropílico. Gira solo, despacio, y no responde al ratón. */

import * as T from './vendor/three.module.js';

const AMBAR   = 0xE8A33D;
const MADERA  = 0x6B4A2B;
const ACERO   = 0xB9BEC9;
const OSCURO  = 0x14181F;
const AZUL    = 0x1E4E8C;
const CREMA   = 0xE8E4DC;

export function montarKit(lienzo, quieto) {
  const esc = new T.Scene();

  const cam = new T.PerspectiveCamera(30, 1, 0.1, 100);
  cam.position.set(0.4, 5.6, 12.4);
  cam.lookAt(0, 0.1, 0);

  const render = new T.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true });
  render.setPixelRatio(Math.min(devicePixelRatio, 2));
  render.shadowMap.enabled = true;
  render.shadowMap.type = T.PCFSoftShadowMap;

  /* Luz: un flexo cálido desde la izquierda, como el del taller, más un
     relleno frío por detrás para despegar las piezas del fondo. */
  esc.add(new T.AmbientLight(0xffffff, 0.55));

  const flexo = new T.DirectionalLight(0xffd9a0, 2.4);
  flexo.position.set(-4, 6, 3);
  flexo.castShadow = true;
  flexo.shadow.mapSize.set(1024, 1024);
  flexo.shadow.camera.left = -6;
  flexo.shadow.camera.right = 6;
  flexo.shadow.camera.top = 6;
  flexo.shadow.camera.bottom = -6;
  flexo.shadow.bias = -0.0015;
  esc.add(flexo);

  const relleno = new T.DirectionalLight(0x7fb3d5, 0.8);
  relleno.position.set(4, 2, -4);
  esc.add(relleno);

  const mate = (color, rug = 0.7, met = 0.1) =>
    new T.MeshStandardMaterial({ color, roughness: rug, metalness: met });

  const grupo = new T.Group();
  esc.add(grupo);

  /* Bandeja */
  const bandeja = new T.Mesh(
    new T.BoxGeometry(6.4, 0.22, 3.9),
    mate(OSCURO, 0.85, 0.05)
  );
  bandeja.position.y = -0.11;
  bandeja.receiveShadow = true;
  grupo.add(bandeja);

  const canto = new T.Mesh(
    new T.BoxGeometry(6.6, 0.06, 4.1),
    mate(AMBAR, 0.5, 0.2)
  );
  canto.position.y = -0.24;
  grupo.add(canto);

  /* Destornillador de precisión */
  const dest = new T.Group();
  const mango = new T.Mesh(new T.CylinderGeometry(0.20, 0.23, 1.5, 24), mate(AMBAR, 0.45, 0.15));
  mango.castShadow = true;
  dest.add(mango);
  const anilla = new T.Mesh(new T.CylinderGeometry(0.235, 0.235, 0.14, 24), mate(ACERO, 0.35, 0.85));
  anilla.position.y = 0.82;
  dest.add(anilla);
  const vastago = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 1.7, 16), mate(ACERO, 0.3, 0.9));
  vastago.position.y = -1.6;
  vastago.castShadow = true;
  dest.add(vastago);
  const punta = new T.Mesh(new T.ConeGeometry(0.055, 0.2, 16), mate(ACERO, 0.25, 0.95));
  punta.position.y = -2.52;
  punta.rotation.x = Math.PI;
  dest.add(punta);
  dest.rotation.z = Math.PI / 2 + 0.1;
  dest.position.set(-1.55, 0.25, 0.95);
  grupo.add(dest);

  /* Brocha antiestática */
  const brocha = new T.Group();
  const palo = new T.Mesh(new T.CylinderGeometry(0.14, 0.16, 1.9, 20), mate(MADERA, 0.9, 0.05));
  palo.castShadow = true;
  brocha.add(palo);
  const virola = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 0.45, 20), mate(ACERO, 0.4, 0.8));
  virola.position.y = -1.05;
  brocha.add(virola);
  const cerdas = new T.Mesh(new T.CylinderGeometry(0.155, 0.30, 0.95, 20), mate(0x2B2622, 0.95, 0));
  cerdas.position.y = -1.72;
  cerdas.castShadow = true;
  brocha.add(cerdas);
  brocha.rotation.z = Math.PI / 2 - 0.22;
  brocha.position.set(-1.35, 0.28, -0.85);
  grupo.add(brocha);

  /* Jeringa de pasta térmica */
  const jer = new T.Group();
  const cuerpo = new T.Mesh(new T.CylinderGeometry(0.19, 0.19, 1.5, 22), mate(CREMA, 0.55, 0.05));
  cuerpo.castShadow = true;
  jer.add(cuerpo);
  const embolo = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 0.5, 16), mate(0x9A968E, 0.7, 0.1));
  embolo.position.y = 0.92;
  jer.add(embolo);
  const pulsador = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.09, 16), mate(0x9A968E, 0.7, 0.1));
  pulsador.position.y = 1.2;
  jer.add(pulsador);
  const boquilla = new T.Mesh(new T.ConeGeometry(0.13, 0.42, 16), mate(ACERO, 0.35, 0.85));
  boquilla.position.y = -0.94;
  boquilla.rotation.x = Math.PI;
  jer.add(boquilla);
  jer.rotation.z = Math.PI / 2 + 0.28;
  jer.position.set(1.5, 0.24, 0.9);
  grupo.add(jer);

  /* Bote de isopropílico */
  const bote = new T.Group();
  const lata = new T.Mesh(new T.CylinderGeometry(0.44, 0.44, 1.7, 28), mate(CREMA, 0.5, 0.05));
  lata.position.y = 0.85;
  lata.castShadow = true;
  bote.add(lata);
  const etiqueta = new T.Mesh(new T.CylinderGeometry(0.451, 0.451, 0.72, 28), mate(AZUL, 0.6, 0.05));
  etiqueta.position.y = 0.78;
  bote.add(etiqueta);
  const cuello = new T.Mesh(new T.CylinderGeometry(0.17, 0.2, 0.3, 20), mate(CREMA, 0.5, 0.05));
  cuello.position.y = 1.83;
  bote.add(cuello);
  const tapon = new T.Mesh(new T.CylinderGeometry(0.19, 0.19, 0.26, 20), mate(AMBAR, 0.45, 0.15));
  tapon.position.y = 2.09;
  bote.add(tapon);
  bote.position.set(1.75, 0, -0.85);
  grupo.add(bote);

  /* Tornillos sueltos, que es lo que siempre acaba habiendo en la bandeja */
  for (let i = 0; i < 5; i++) {
    const t = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 0.1, 12), mate(ACERO, 0.4, 0.85));
    t.position.set(-0.25 + i * 0.28, 0.05, 1.55 - (i % 2) * 0.32);
    t.castShadow = true;
    grupo.add(t);
  }

  const medir = () => {
    const c = lienzo.parentElement.getBoundingClientRect();
    if (!c.width || !c.height) return;
    render.setSize(c.width, c.height, false);
    cam.aspect = c.width / c.height;
    /* En huecos estrechos la escena se sale por los lados: se retira la
       cámara lo justo para que la bandeja siga entrando entera. */
    const holgura = Math.min(1, cam.aspect / 1.5);
    cam.position.z = 12.4 / Math.max(0.62, holgura);
    cam.position.y = 5.6 / Math.max(0.75, holgura);
    cam.lookAt(0, 0.1, 0);
    cam.updateProjectionMatrix();
  };
  medir();
  new ResizeObserver(medir).observe(lienzo.parentElement);

  let t0 = 0;
  const dibujar = (ahora) => {
    if (!t0) t0 = ahora;
    const s = (ahora - t0) / 1000;
    grupo.rotation.y = quieto ? -0.5 : -0.5 + s * 0.18;
    grupo.position.y = quieto ? 0 : Math.sin(s * 0.9) * 0.06;
    render.render(esc, cam);
    if (!quieto) requestAnimationFrame(dibujar);
  };
  requestAnimationFrame(dibujar);
}
