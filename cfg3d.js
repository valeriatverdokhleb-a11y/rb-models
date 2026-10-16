// Конструктор «Серийка» для главной r-bureau.ru (собрано totilda.py)
const $=id=>document.getElementById(id);   // в Тильде глобальный $ — это jQuery
$("view").querySelectorAll("img").forEach(i=>i.remove());   // убрать кадр-заглушку из блока b3
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {mergeVertices,toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';

const box=$('view');
const R=new THREE.WebGLRenderer({antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2)); R.shadowMap.enabled=true; R.shadowMap.type=THREE.PCFSoftShadowMap;
R.toneMapping=THREE.NoToneMapping;   // без тон-маппинга: ACES высветлял RAL; свет подобран так, что верх сиденья = цвет RAL (±5 по каналу) R.outputColorSpace=THREE.SRGBColorSpace;
box.prepend(R.domElement);
const S=new THREE.Scene(); S.background=new THREE.Color(0xf4f4f3);
S.environment=new THREE.PMREMGenerator(R).fromScene(new RoomEnvironment(),.04).texture;
const C=new THREE.PerspectiveCamera(32,1,.05,50); C.position.set(-.04,1.35,3.25);   // ракурс прежний, камера отъехала на ~12% (скрин Леры 15.10)
const O=new OrbitControls(C,R.domElement); O.target.set(-.04,.4,0); O.enableDamping=true; O.dampingFactor=.08;
O.minDistance=.45; O.zoomSpeed=2.2; O.zoomToCursor=true;   // колесо приближает быстрее и туда, где курсор
// пинч на трекпаде Mac приходит как wheel с ctrlKey и маленьким шагом — усиливаем, иначе приближать неудобно
// обычный скролл всегда листает страницу и модель не трогает; приближение — щипком (ctrl+колесо), вращение — когда блок на экране хотя бы на 2/3
let vis3=0;new IntersectionObserver(es=>{vis3=es[0].intersectionRatio;O.enableRotate=vis3>=.66},{threshold:[0,.25,.5,.66,.8,1]}).observe(box);
box.addEventListener('wheel',e=>{if(e.amp)return;e.stopPropagation();if(!e.ctrlKey)return;e.preventDefault();if(vis3<.66)return;
  const n=new WheelEvent('wheel',{deltaY:e.deltaY*10,deltaMode:e.deltaMode,clientX:e.clientX,clientY:e.clientY,bubbles:true,cancelable:true});n.amp=1;R.domElement.dispatchEvent(n)},{capture:true,passive:false}); O.maxDistance=6; O.maxPolarAngle=Math.PI;   // по вертикали — до вида снизу; по горизонтали OrbitControls и так крутит на 360 O.enablePan=false;
O.autoRotate=false; O.autoRotateSpeed=.6; O.addEventListener('start',()=>O.autoRotate=false);

// свет: мягкий сверху + тень
const hemi=new THREE.HemisphereLight(0xffffff,0xdedcd8,.3); S.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,1.6); sun.position.set(2,4,1.5); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048); sun.shadow.radius=6; sun.shadow.bias=-.0004;
const rim=new THREE.DirectionalLight(0xffffff,1.2); rim.position.set(-3,2,-2); S.add(rim);
const under=new THREE.DirectionalLight(0xffffff,2); under.position.set(.5,-4,1); S.add(under);   // подсветка снизу: плавно набирает силу, когда камера опускается к полу и ниже
Object.assign(sun.shadow.camera,{left:-1.5,right:1.5,top:1.5,bottom:-1.5,near:.5,far:10}); S.add(sun);
// пол: сетка + ловец тени
const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.14}));
floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; S.add(floor);
const grid=new THREE.GridHelper(8,32,0xdddcd9,0xe6e5e2); grid.position.y=.001; S.add(grid);

// материалы каркаса: стулья и стол красятся отдельно
const coat=()=>new THREE.MeshStandardMaterial({color:0x111111,roughness:.45,metalness:.2,envMapIntensity:.5});
const M={pan:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.62,metalness:0,envMapIntensity:.5}),   // плиты ЭЛЕМЕНТА из пластика RePanel
  chair:coat(),table:coat(),top:coat(),fab:new THREE.MeshPhysicalMaterial({color:0x111111,roughness:.95,metalness:0,envMapIntensity:.5,sheen:.6,sheenRoughness:.85,specularIntensity:.25})};
// обивка — велюр: мягкий светлый ворс на скосах (sheen) + мелкая неровность ворса (шум по координатам модели, UV не нужны)
M.fab.onBeforeCompile=sh=>{
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vF;').replace('#include <begin_vertex>','#include <begin_vertex>\nvF=position;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>',`#include <common>
    varying vec3 vF;
    float h3(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
    float vn(vec3 p){vec3 i=floor(p),f=smoothstep(0.,1.,fract(p));
      return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}`)
    .replace('#include <color_fragment>',`#include <color_fragment>
      float pile=vn(vF*900.)*.6+vn(vF*160.)*.4;               // ворс: мелкое зерно + чуть крупнее «примятые» участки
      diffuseColor.rgb*=.94+.12*pile;`)};
M.fab.customProgramCacheKey=()=>'velour';
// фактуры пластика грузятся по требованию, при выборе
const TLd=new THREE.TextureLoader(), plCache={};
const plTex=([,k,tr])=>plCache[k]||(plCache[k]=(()=>{const ld=(f,srgb)=>{const t=TLd.load(`https://valeriatverdokhleb-a11y.github.io/rb-models/repanel/${k}/${f}`);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;if(srgb)t.colorSpace=THREE.SRGBColorSpace;return t};
  return {map:ld('color.jpg',1),normal:ld('normal.jpg'),alpha:tr?ld('opacity.jpg'):null}})());
const L=new GLTFLoader(); const D=new DRACOLoader(); D.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/'); L.setDRACOLoader(D);
// модели — с GitHub Pages
const buf=f=>{const b=atob(window.GLB[f]),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer};
const load=(f,mat)=>new Promise(ok=>{const done=g=>{g.scene.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material.name==='frame')o.material=mat;else if(o.material.name==='top')o.material=M.top;else if(o.material.name==='fabric')o.material=M.fab;else if(o.material.name==='panel')o.material=M.pan}});ok(g.scene)};
  L.load('https://valeriatverdokhleb-a11y.github.io/rb-models/'+f,done)});

// стулья по меню: серия (+ модель) → файл. У Элемента спереди −x, у остальных +z — разворачиваем к −x
// ЭЛЕМЕНТ СОФТ — с подлокотниками и без (обе модели: 3d/soft/build_all.sh, 15.10)
const CHF={'ЭЛЕМЕНТ':['element_arm.glb',0],'ЭЛЕМЕНТ ПЛ':['element_pl.glb',0],'ЭЛЕМЕНТ ПЛ с':['element_arm_pl.glb',0],'ЭЛЕМЕНТ без':['element.glb',0],'ЭЛЕМЕНТ СОФТ':['element_soft.glb',0],'ЭЛЕМЕНТ СОФТ с':['element_arm_soft.glb',0],'ДУГА S':['duga_s.glb',-Math.PI/2],'ДУГА M':['duga_m.glb',-Math.PI/2],'УГОЛ':['ugol.glb',-Math.PI/2],'БЕЗ НАЗВАНИЯ стул':['noname_chair.glb',-Math.PI/2],'БЕЗ НАЗВАНИЯ табурет':['noname_stool.glb',-Math.PI/2]};
// стол строится по меню (узлы — по rb_table_6/11.fbx из 3d.r-bureau.ru): блин 5 мм на 4 резиновых опорах 12 мм,
// стойка Ø60 (СТОЛ 6) или Ø110 (СТОЛ 11) до 742 мм, подстолье Ø250×3, сверху столешница.
// Столешница: сталь/нержавейка 5 мм, пластик 15 мм, МДФ 18 мм с фасками 3×45° сверху и снизу.
// Скругления по чертежам DXF (15.10): квадратный блин R50; столешница до 600 — R50, 700 — R55 (между — плавно)
const RUB=new THREE.MeshStandardMaterial({color:0x050505,roughness:.7,metalness:0});
const mm=x=>x/1000, tb=new THREE.Group(); S.add(tb);
let tbEdge={e:.3,sq:true};   // край столешницы — по нему ставим стулья
// стол на трёх ножках: подстолье — img/glb/table_tripod.glb (rb_table_tripod.fbx с 3d.r-bureau.ru без столешницы), верх подстолья 753,7 мм.
// Ножки (ось: опора у пола → верх у подстолья, в координатах сцены) — чтобы стулья в них не упирались
const TRILEGS=[[[-.348,.005,-.22],[.008,.754,-.014]],[[.364,.005,-.192],[.008,.753,.014]],[[-.016,.005,.411],[-.016,.754,0]]];
const legHit=(x,y,z)=>!!tbEdge.legs&&tbEdge.legs.some(([a,b])=>{const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],w=[x-a[0],y-a[1],z-a[2]],
  t=Math.max(0,Math.min(1,(w[0]*d[0]+w[1]*d[1]+w[2]*d[2])/(d[0]*d[0]+d[1]*d[1]+d[2]*d[2])));return Math.hypot(w[0]-t*d[0],w[1]-t*d[1],w[2]-t*d[2])<.045});
function plate(sq,size,r,t,bev,seg,uvk){   // плита толщиной t (мм), низ на y=0
  const s=new THREE.Shape(),h=mm(size)/2-mm(bev);
  if(!sq)s.absarc(0,0,h,0,Math.PI*2,false);
  else{const q=Math.max(mm(r)-mm(bev),.0005);
    s.moveTo(-h+q,-h);s.lineTo(h-q,-h);s.absarc(h-q,-h+q,q,-Math.PI/2,0,false);s.lineTo(h,h-q);s.absarc(h-q,h-q,q,0,Math.PI/2,false);
    s.lineTo(-h+q,h);s.absarc(-h+q,h-q,q,Math.PI/2,Math.PI,false);s.lineTo(-h,-h+q);s.absarc(-h+q,-h+q,q,Math.PI,Math.PI*1.5,false)}
  let g=new THREE.ExtrudeGeometry(s,{depth:mm(t-2*bev),bevelEnabled:bev>0,bevelThickness:mm(bev),bevelSize:mm(bev),bevelSegments:seg,curveSegments:sq?12:Math.round(64+size/10)});
  g.rotateX(-Math.PI/2); g.translate(0,mm(bev),0);
  if(uvk){const u=g.attributes.uv.array;for(let i=0;i<u.length;i++)u[i]*=uvk}   // фактура пластика в реальном масштабе: uv в метрах ×2 → плитка 0,5 м
  g.deleteAttribute('normal'); g=mergeVertices(g,1e-6); return toCreasedNormals(g,Math.PI/5)}
function mesh(g,m,y){const o=new THREE.Mesh(g,m);o.position.y=y;o.castShadow=o.receiveShadow=true;return o}
function buildTable(){
  tb.children.forEach(o=>{if(!o.userData.shared)o.geometry.dispose()}); tb.clear();
  const k=$('tbM').value,t=TB[k];
  const tm0=$('tbMat').value, uv0=tm0==='переработанный пластик RePanel'?2:0;
  if(k==='НА ТРЁХ НОЖКАХ'){   // подстолье из модели + столешница Ø700 по меню: МДФ 18 мм с фасками 3×45°, пластик 15, сталь/нержавейка 4 мм (как в модели)
    const f=TRIPOD.clone(); f.userData.shared=true; tb.add(f);
    const [th,bev,seg]=tm0==='МДФ'?[18,3,1]:tm0==='переработанный пластик RePanel'?[15,2,3]:[4,1,2];
    tb.add(mesh(plate(false,700,0,th,bev,seg,uv0),M.top,.7537));
    tbEdge={e:.35,sq:false,b:0,bsq:false,cr:.02,legs:TRILEGS}; return}
  const size=t.size?Math.min(t.size[1],Math.max(t.size[0],+$('tbSize').value||600)):600, model=t.size?k:'СТОЛ 6';
  const sq=t.shape&&$('tbTop').value==='квадрат', bsq=t.base&&$('tbBase').value==='квадрат', bD=window.baseOf(model,size,sq);
  const tm=$('tbMat').value, [th,bev,seg]=tm==='МДФ'?[18,3,1]:tm==='переработанный пластик RePanel'?[15,2,3]:[5,1,2];
  tb.add(mesh(plate(bsq,bD,50,5,1,2),M.table,mm(12)));                                     // блин
  const fr=mm(bD/2-40);   // опоры: у круга — по осям, у квадрата — в углах
  [[1,0],[0,1],[-1,0],[0,-1]].forEach(([x,z])=>{const f=mesh(new THREE.CylinderGeometry(.02,.02,.012,24),RUB,.006);
    if(bsq){f.position.set((x-z)*fr*Math.SQRT1_2,.006,(x+z)*fr*Math.SQRT1_2)}else f.position.set(x*fr,.006,z*fr); tb.add(f)});
  const cr=model==='СТОЛ 11'?.0548:.03015;
  tb.add(mesh(new THREE.CylinderGeometry(cr,cr,mm(725),64),M.table,mm(17+725/2)));          // стойка
  tb.add(mesh(new THREE.CylinderGeometry(.125,.125,mm(3),64),M.table,mm(742+1.5)));        // подстолье
  tb.add(mesh(plate(sq,size,size<=600?50:50+(size-600)/20,th,bev,seg,tm==='переработанный пластик RePanel'?2:0),M.top,mm(745))); // столешница
  tbEdge={e:mm(size)/2,sq,b:mm(bD)/2,bsq,cr};
}
const cache={}; let pair=[];
// передние опоры стула (точки у пола, ближние к переду) — по ним ставим стул к краю столешницы
function feet(g,yaw){const p=[],v=new THREE.Vector3();g.updateMatrixWorld(true);
  g.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;for(let i=0;i<a.count;i+=3){v.fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);if(v.y<.02)p.push([v.x*Math.cos(yaw)+v.z*Math.sin(yaw),-v.x*Math.sin(yaw)+v.z*Math.cos(yaw)])}});
  const x0=Math.min(...p.map(q=>q[0])),fr=p.filter(q=>q[0]<x0+.05);return [[x0,Math.min(...fr.map(q=>q[1]))],[x0,Math.max(...fr.map(q=>q[1]))]]}
// весь стул облаком точек [x, z, высота] в той же системе, что feet — чтобы стул не входил в стол
function cloud(g,yaw){const p=[],v=new THREE.Vector3();g.updateMatrixWorld(true);
  g.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;for(let i=0;i<a.count;i+=2){v.fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);p.push([v.x*Math.cos(yaw)+v.z*Math.sin(yaw),-v.x*Math.sin(yaw)+v.z*Math.cos(yaw),v.y])}});
  return p}
// расстановка: 2 — слева стул на 45° к зрителю, справа в профиль; 3 — + дальний (от камеры); 4 — + ближний;
// 5 и 6 — по тому же принципу: сначала от камеры, потом к камере. С 4 стульев левый тоже задвинут прямо.
// [направление от центра стола, разворот стула]; прямой стул смотрит в центр: разворот = −направление
const DEG=Math.PI/180, st=d=>[d*DEG,-d*DEG], TURN=[Math.atan2(.05,-.625),Math.PI*.75];
const PLAN={2:[TURN,st(0)],3:[TURN,st(0),st(-90)],4:[st(180),st(0),st(-90),st(90)],
  5:[st(180),st(0),st(-60),st(-120),st(90)],6:[st(180),st(0),st(-60),st(-120),st(120),st(60)]};
const box3=(g,yaw)=>{const v=new THREE.Vector3(),b=[1,-1,1,-1];g.updateMatrixWorld(true);   // габарит стула: x — глубина (перед −x), z — ширина
  g.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;for(let i=0;i<a.count;i+=7){v.fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);
    const x=v.x*Math.cos(yaw)+v.z*Math.sin(yaw),z=-v.x*Math.sin(yaw)+v.z*Math.cos(yaw);b[0]=Math.min(b[0],x);b[1]=Math.max(b[1],x);b[2]=Math.min(b[2],z);b[3]=Math.max(b[3],z)}});return b};
// зона посадки на полу (серая заливка): от края стола — стул задвинут → гость сидит и отодвигает стул (+0,25 м) →
// половина прохода между спинами соседних посадок (0,6 м: гость проходит свободно, официант — боком с подносом).
// Со стороны без стульев — край стола + половина прохода. 2–3 стула и квадратный стол — прямоугольник, круглый стол с 4+ стульями — круг
const ZONE={pull:.25,aisle:.6};
const zone=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial({color:0xe3e1dc,depthWrite:false}));
zone.rotation.x=-Math.PI/2; zone.position.y=-.0005; zone.renderOrder=-1; S.add(zone);   // под прозрачным полом с тенями и под сеткой
// ext — габариты посадки от центра стола (по точкам стульев, уже отодвинутых гостями, + половина прохода): px/nx/pz/nz по осям, r — радиус
function drawZone(ext,n){
  const sh=new THREE.Shape(); let area;
  if(!tbEdge.sq&&n>=3){sh.absarc(0,0,ext.r,0,Math.PI*2,false); area=Math.PI*ext.r*ext.r}   // круглый стол с 3+ стульями — круг
  else{const X=Math.max(ext.px,ext.nx),Z=Math.max(ext.pz,ext.nz);   // 2 стула и квадратный стол — прямоугольник по центру стола
    sh.moveTo(-X,-Z);sh.lineTo(X,-Z);sh.lineTo(X,Z);sh.lineTo(-X,Z);sh.closePath(); area=4*X*Z}
  zone.geometry.dispose(); zone.geometry=new THREE.ShapeGeometry(sh,96);   // после поворота −90° по x: y фигуры → −z мира
  window.zoneArea=area; document.dispatchEvent(new Event('zone'));
}
let seatsBusy=Promise.resolve();
function chairs(){return seatsBusy=seatsBusy.then(placeChairs)}   // по очереди, чтобы быстрые клики не путали стулья
async function placeChairs(){
  const m=$('chM').value,k=m==='БЕЗ НАЗВАНИЯ'||m==='ДУГА'?m+' '+$('chV').value:m==='ЭЛЕМЕНТ'?($('chS').value==='переработанный пластик RePanel'?($('chA').value==='добавить'?'ЭЛЕМЕНТ ПЛ с':'ЭЛЕМЕНТ ПЛ'):$('chS').value==='обивка'?($('chA').value==='добавить'?'ЭЛЕМЕНТ СОФТ с':'ЭЛЕМЕНТ СОФТ'):$('chA').value==='добавить'?m:'ЭЛЕМЕНТ без'):m,[f,yaw]=CHF[k];
  const g=cache[f]||(cache[f]=await load(f,M.chair)); const ft=feet(g,yaw), bb=g.userData.bb||(g.userData.bb=box3(g,yaw));
  const n=window.nCh, plan=PLAN[n], gap=n>=5?60*DEG:90*DEG, half=(bb[3]-bb[2])/2+.01;
  const E=tbEdge.e, dist=(x,z)=>tbEdge.sq?Math.max(Math.abs(x),Math.abs(z)):Math.hypot(x,z);   // край столешницы: квадрат или круг
  const zp=[], zx={px:E+ZONE.aisle/2,nx:E+ZONE.aisle/2,pz:E+ZONE.aisle/2,nz:E+ZONE.aisle/2,r:E+ZONE.aisle/2};   // без стульев — край стола + половина прохода
  pair.forEach(c=>S.remove(c)); pair=plan.map(([a,r])=>{
    const c=g.clone(),u=[Math.cos(a),Math.sin(a)],th=r+yaw;
    // ближайшая передняя опора после разворота — ровно под краем столешницы
    const leg=([x,z])=>[x*Math.cos(r)+z*Math.sin(r),-x*Math.sin(r)+z*Math.cos(r)];
    let lo=0,hi=3;for(let i=0;i<40;i++){const s=(lo+hi)/2,d=Math.min(...ft.map(q=>{const l=leg(q);return dist(s*u[0]+l[0],s*u[1]+l[1])}));d<E?lo=s:hi=s}
    // стул не входит в стойку, не встаёт ножками на блин, спинка не заходит в столешницу, сиденье и подлокотники — под столешницу не глубже 3 см
    // (на маленьких столах 400–450 передние ножки шире столешницы — без этой проверки стул вставал в стол)
    const cl=g.userData.cl||(g.userData.cl=cloud(g,yaw)), T=tbEdge, inB=(x,z)=>T.bsq?Math.max(Math.abs(x),Math.abs(z))<T.b+.015:Math.hypot(x,z)<T.b+.015;
    const ok=s=>cl.every(q=>{const l=leg(q),x=s*u[0]+l[0],z=s*u[1]+l[1],y=q[2];
      return Math.hypot(x,z)>T.cr+.03 && !(y<.03&&inB(x,z)) && !(y>.735&&dist(x,z)<E+.01) && !(y>.3&&dist(x,z)<E-.03) && !legHit(x,y,z)});   // legHit — ножки стола на трёх ножках
    let a0=0,a1=3; for(let i=0;i<30;i++){const s=(a0+a1)/2; ok(s)?a1=s:a0=s}
    lo=Math.max(lo,a1);
    // соседние стулья не должны упираться друг в друга: если тесно — стул чуть выдвигается
    if(n>=4)lo=Math.max(lo,half/Math.tan(gap/2)-bb[0]);
    c.position.set(lo*u[0],0,lo*u[1]);c.rotation.y=th;S.add(c);
    // зона: каждая точка стула, отодвинутого гостем на ZONE.pull от стола, + половина прохода — плавно, без порогов
    // стул, развёрнутый к зрителю на 45°, — поза для кадра: в зоне считаем его задвинутым прямо (зеркально правому)
    if(a!==TURN[0]){const pu=lo+ZONE.pull;
      for(let i=0;i<cl.length;i+=2){const l=leg(cl[i]),x=pu*u[0]+l[0],z=pu*u[1]+l[1];zp.push([x,z]);if(a===0)zp.push([-x,-z])}}
    return c});
  const hh=ZONE.aisle/2; zp.forEach(([x,z])=>{zx.px=Math.max(zx.px,x+hh);zx.nx=Math.max(zx.nx,-x+hh);zx.pz=Math.max(zx.pz,z+hh);zx.nz=Math.max(zx.nz,-z+hh);zx.r=Math.max(zx.r,Math.hypot(x,z)+hh)});
  drawZone(zx,n);
}
document.addEventListener('seats',chairs);
document.addEventListener('zone',()=>{$('zoneT').textContent='оптимальная площадь посадки — '+window.zoneArea.toFixed(1).replace('.',',')+' м²';draw()});
['chM','chV','chA','chS'].forEach(id=>$(id).addEventListener('change',chairs));
const TRIPOD=await load('table_tripod.glb',M.table);   // подстолье стола на трёх ножках
buildTable(); await chairs();
// стол перестраивается при любом изменении размера, формы, материала или основания (размер — после ввода, с задержкой)
let tbT; const reTable=()=>{clearTimeout(tbT);tbT=setTimeout(()=>{buildTable();chairs()},250)};
['tbM','tbSize','tbTop','tbMat','tbBase'].forEach(id=>$(id).addEventListener(id==='tbSize'?'input':'change',reTable));

// цвет из меню
const hexOf=(sel,inp)=>{const v=sel.value==='другой RAL…'?inp.value:sel.value.slice(4,8);return (RAL.find(r=>r[0]===v)||[,window.RALX[v]||'#111111'])[1]};
// нержавейка как на фото Дуги: сатинированная (не зеркальная), светло-серая, с мелкой продольной шлифовкой
const steel=new THREE.Color(0xc2c4c6);
const brush=(()=>{const n=512,c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');
  x.fillStyle='rgb(120,120,120)';x.fillRect(0,0,n,n);let r=11;const rnd=()=>(r=(r*16807)%2147483647)/2147483647;
  for(let i=0;i<5000;i++){const g=90+rnd()*70|0;x.fillStyle=`rgba(${g},${g},${g},.5)`;x.fillRect(rnd()*n,rnd()*n,20+rnd()*220,.6+rnd()*1.2)}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,3);return t})();
// покраска: порошковая эмаль RAL или нержавейка
function coatAs(m,ral){const inox=ral==null;
  m.color.set(inox?steel:ral); m.metalness=inox?.65:.12; m.roughness=inox?.48:.66;   // RAL — муар: матовый, зерно — в шейдере (grain)
  if(m.userData.grain)m.userData.grain.value=inox?0:1;   // нержавейка: не зеркало — часть рассеянного света, как у сатина
  m.roughnessMap=inox?brush:null; m.bumpMap=inox?brush:null; m.bumpScale=.15; m.envMapIntensity=inox?1.3:.5; m.envMap=null;
  // стулья из нержавейки: настоящий металл (metalness 1) в светлой студии — трубы с бликами и тенями, плоские детали светлые, как на фото Дуги
  if(inox&&m===M.chair){m.color.set(0xd4d7da); m.metalness=.94; m.roughness=.42; m.bumpMap=null; m.envMap=studio; m.envMapIntensity=1.05}   // светлая матовая (сатин), как на фото Дуги
  m.needsUpdate=true}
// студия для отражений нержавейки на стульях: светлый купол с мягким градиентом и три полосы-софтбокса
const studio=(()=>{const es=new THREE.Scene(),g=new THREE.SphereGeometry(10,48,24),p=g.attributes.position,col=[];
  for(let i=0;i<p.count;i++){const y=p.getY(i)/10,v=y>0?.5+.32*y:.46+.1*y;col.push(v,v,v*1.01)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
  es.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  [[6,2,0,7,3,2.2],[1.6,5,-7,3,-2,1.7],[1.6,5,6,2,-5,1.5]].forEach(([w,h,x,y,z,k])=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k,k,k),side:THREE.DoubleSide}));b.position.set(x,y,z);b.lookAt(0,0,0);es.add(b)});
  return new THREE.PMREMGenerator(R).fromScene(es,.02).texture})();
// стол из нержавейки: круговая шлифовка — тонкие риски кругами вокруг оси стола (столешница, блин основания),
// на ножке — кольцами по высоте. Считается в шейдере по координатам модели, UV не нужны.
// Риски еле заметные: чуть меняют шероховатость и наклон нормали, видны в бликах при повороте
const ringT={value:0}, ringB={value:0};   // круговая шлифовка: столешница и подстолье — отдельно
function ringify(mat,ring){mat.onBeforeCompile=sh=>{sh.uniforms.uRing=ring;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vP; varying vec3 vRad; varying vec3 vUp; varying float vFlat;')
    .replace('#include <begin_vertex>','#include <begin_vertex>\nvP=position; vFlat=step(.7,abs(normal.y)); vRad=normalize(normalMatrix*vec3(position.x,0.,position.z)+1e-6); vUp=normalize(normalMatrix*vec3(0.,1.,0.));');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uRing; varying vec3 vP; varying vec3 vRad; varying vec3 vUp; varying float vFlat;\nfloat h1(float x){return fract(sin(x*12.9898)*43758.5453);}')
    .replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
      // по горизонтали — радиус от оси, по ножке — высота
      float rr=mix(vP.y,length(vP.xz),vFlat);
      #define VN(x) mix(h1(floor(x)),h1(floor(x)+1.),smoothstep(0.,1.,fract(x)))
      float f1=rr*3000., f2=rr*700.;
      float aa=clamp(1.-fwidth(f1)*.6,0.,1.);                 // мельче пикселя — гасим, иначе рябь
      float rk=mix(.5,VN(f1),aa)*.7+VN(f2)*.3;
      if(uRing>.5){ roughnessFactor*=.88+.24*rk; diffuseColor.rgb*=.975+.05*rk; }`)
    .replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
      if(uRing>.5) normal=normalize(normal+mix(vUp,vRad,vFlat)*(rk-.5)*.07);`)};
  mat.customProgramCacheKey=()=>'ring';}
ringify(M.top,ringT); ringify(M.table,ringB);
// зерно поверхности (бамп по шуму в координатах модели, UV не нужны): муар на металле в RAL и ворс ткани.
// Зерно мельче пикселя плавно гаснет — издалека остаётся просто матовая поверхность, вблизи видна фактура
function grain(mat,freq,amp,on){const u={value:on?1:0}; mat.userData.grain=u; const prev=mat.onBeforeCompile, pk=mat.customProgramCacheKey;
  mat.onBeforeCompile=(sh,r)=>{prev&&prev.call(mat,sh,r); sh.uniforms.uGrain=u;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvGP=position;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>',`#include <common>
      uniform float uGrain; varying vec3 vGP;
      float gh(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
      float gn(vec3 p){vec3 i=floor(p),f=smoothstep(0.,1.,fract(p));
        return mix(mix(mix(gh(i),gh(i+vec3(1,0,0)),f.x),mix(gh(i+vec3(0,1,0)),gh(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix(gh(i+vec3(0,0,1)),gh(i+vec3(1,0,1)),f.x),mix(gh(i+vec3(0,1,1)),gh(i+vec3(1,1,1)),f.x),f.y),f.z);}`)
      .replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
      if(uGrain>.5){ vec3 q=vGP*${freq.toFixed(1)};
        float fade=clamp(1.5-length(fwidth(q))*1.2,0.,1.);                      // мельче пикселя — гасим, иначе рябь
        float H=(gn(q)*.65+gn(q*2.7)*.35)*${amp.toExponential(2)}*fade;
        vec3 sx=dFdx(-vViewPosition), sy=dFdy(-vViewPosition); vec2 dH=vec2(dFdx(H),dFdy(H));
        vec3 r1=cross(sy,normal), r2=cross(normal,sx); float det=dot(sx,r1)*faceDirection;
        normal=normalize(abs(det)*normal-sign(det)*(dH.x*r1+dH.y*r2)); }`)};
  mat.customProgramCacheKey=()=>(pk?pk.call(mat):'')+'|grain'}
grain(M.chair,2200,1.6e-4,true); grain(M.table,2200,1.6e-4,true); grain(M.top,2200,1.6e-4,false);   // муар: зерно ~0,5 мм
grain(M.fab,1400,6e-5,true);                                                                         // ворс: мягче и мельче
function paint(){
  const cs=$('chMat').value==='сталь', ts=$('tbBaseMat').value==='сталь';
  coatAs(M.chair,cs?hexOf($('chRal'),$('chRalIn')):null);
  coatAs(M.table,ts?hexOf($('tbRal'),$('tbRalIn')):null);
  // столешница: МДФ — свой RAL (матовая), пластик — текстура с крапинкой, сталь — как подстолье, нержавейка — металл
  const tm=$('tbMat').value, T=M.top; T.map=null;
  T.roughnessMap=T.bumpMap=T.normalMap=T.alphaMap=null; T.transparent=false; T.envMapIntensity=.5; T.userData.grain.value=0;   // МДФ и пластик — без муара; сталь включит его в coatAs
  if(tm==='МДФ'){T.color.set(hexOf($('topRal'),$('topRalIn')));T.metalness=0;T.roughness=.7}
  else if(tm==='переработанный пластик RePanel'){const t=plTex(PL[plI]);T.color.set(0xffffff);T.map=t.map;T.normalMap=t.normal;T.normalScale.set(.7,.7);T.alphaMap=t.alpha;T.transparent=!!t.alpha;T.metalness=0;T.roughness=.62}
  else coatAs(T,tm==='сталь'?hexOf($('topRal'),$('topRalIn')):null);
  ringT.value=tm==='нержавейка'?1:0; ringB.value=ts?0:1;   // у стола вместо прямой шлифовки — круговая
  [[T,ringT],[M.table,ringB]].forEach(([m,r])=>{if(r.value){m.roughnessMap=m.bumpMap=null;m.envMapIntensity=1.1;m.needsUpdate=true}});
  T.needsUpdate=true;
  { const t=plTex(PL[window.chPlI]),P=M.pan; P.map=t.map;P.normalMap=t.normal;P.normalScale.set(.7,.7);P.alphaMap=t.alpha;P.transparent=!!t.alpha;P.needsUpdate=true }   // пластик на стуле
  M.fab.color.setStyle(getComputedStyle($('fabDot')).backgroundColor);   // обивка: в тон каркасу или выбранный приглушённый цвет
  M.fab.sheenColor.copy(M.fab.color).lerp(new THREE.Color(0xffffff),.15);   // ворс на свету — светлее основного цвета
}
document.querySelectorAll('select,input').forEach(e=>e.addEventListener(e.tagName==='INPUT'?'input':'change',paint)); document.addEventListener('cfg',paint); paint();

// на узком экране камера отъезжает, чтобы вся композиция влезала
const cam0=C.position.clone();
const fit=()=>{const w=box.clientWidth,h=box.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();
  const k=Math.max(1,1.5/C.aspect);C.position.copy(O.target).add(cam0.clone().sub(O.target).multiplyScalar(k));O.update()};
new ResizeObserver(fit).observe(box); fit();
R.setAnimationLoop(()=>{O.update();const up=C.position.y>.01;floor.visible=grid.visible=up;under.intensity=2*THREE.MathUtils.smoothstep(.45-C.position.y,0,.9);R.render(S,C)});   // снизу пол и сетку прячем, чтобы видеть мебель
