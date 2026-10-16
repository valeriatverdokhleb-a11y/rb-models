// Скрипт главной r-bureau.ru для Тильды (блок 4840660701 подключает этот файл)

window.RALX={1000:'#CDBA88',1001:'#D0B084',1002:'#D2AA6D',1003:'#F9A800',1004:'#E2B007',1005:'#CB8E00',1006:'#E29000',1007:'#E88C00',1011:'#AF8A54',1012:'#D9C022',1013:'#E3D9C6',1014:'#DDC49A',1015:'#E6D2B5',1016:'#EAF044',1017:'#F4B752',1018:'#F3E03B',1019:'#A4957D',1020:'#9A9464',1021:'#F6B600',1023:'#F7B500',1024:'#B89C50',1026:'#FFFF00',1027:'#A38C15',1028:'#FF9B00',1032:'#E2A300',1033:'#FAAB21',1034:'#EDAB56',1035:'#A29985',1036:'#927549',1037:'#EEA205',2000:'#DA6E00',2001:'#BA481B',2002:'#C63927',2003:'#FA842B',2004:'#E75B12',2005:'#FF4912',2007:'#FFA421',2008:'#ED6B21',2009:'#E15501',2010:'#D4652F',2011:'#E26E0E',2012:'#DB6A50',2013:'#954527',2017:'#FA4402',3000:'#A72920',3001:'#9B2423',3002:'#9B2321',3003:'#861A22',3005:'#59191F',3007:'#3E2022',3009:'#6D332C',3011:'#7E292C',3012:'#CB8D73',3013:'#9C322E',3014:'#D47479',3015:'#D79FA6',3016:'#AC4034',3017:'#D3545F',3018:'#D14152',3020:'#BB1E10',3022:'#CC6855',3024:'#FF2D21',3026:'#FF0000',3027:'#B42041',3028:'#CC2C24',3031:'#A63437',3032:'#711521',3033:'#B24C43',4001:'#8A5A83',4002:'#933D50',4003:'#C45F8C',4004:'#691639',4005:'#83639D',4006:'#992572',4007:'#4A203B',4008:'#884D84',4009:'#A38995',4010:'#C63678',4011:'#8773A1',4012:'#6B6880',5000:'#384E6F',5001:'#0F4C64',5002:'#00387B',5003:'#2A3756',5004:'#191E28',5005:'#005387',5007:'#41678D',5008:'#313C48',5009:'#2E5978',5010:'#004F7C',5011:'#1A2B3C',5012:'#3481B8',5014:'#6C7C98',5015:'#2874B2',5017:'#005A8C',5018:'#21888F',5019:'#005E83',5020:'#0B4151',5021:'#07737A',5022:'#222D5A',5023:'#4D668E',5024:'#6A93B0',5025:'#296478',5026:'#102C54',6000:'#3C7460',6001:'#366735',6002:'#325928',6003:'#50533C',6004:'#024442',6005:'#114232',6006:'#3C392E',6007:'#2C3222',6008:'#37342A',6009:'#27352A',6010:'#4D6F39',6011:'#6C7C59',6012:'#303D3A',6013:'#7D765A',6014:'#474135',6015:'#3D3D36',6016:'#00694C',6017:'#587F40',6018:'#61993B',6019:'#B9CEAC',6020:'#37422F',6021:'#8A9977',6022:'#3A3327',6024:'#008351',6025:'#5E6E3B',6026:'#005F4E',6027:'#7EBAB5',6028:'#315442',6029:'#006F3D',6032:'#237F52',6033:'#46877F',6034:'#7AACAC',6035:'#194D25',6036:'#04574B',6037:'#008B29',6038:'#00B51A',6039:'#B3C53F',7000:'#7A888E',7001:'#8F999F',7002:'#817863',7003:'#7A7669',7005:'#6B716F',7006:'#756F61',7008:'#745E3D',7009:'#5D6058',7010:'#585C56',7011:'#555D61',7012:'#575D5E',7013:'#575044',7015:'#51565C',7016:'#383E42',7021:'#2F3234',7022:'#4B4D46',7023:'#818479',7024:'#474A50',7026:'#374244',7030:'#939388',7031:'#5B686D',7032:'#B5B0A1',7033:'#818979',7034:'#91886F',7035:'#CBD0CC',7036:'#9A9697',7037:'#7A7B7A',7038:'#B4B8B0',7039:'#6B685E',7040:'#9DA3A6',7042:'#8F9695',7043:'#4E5451',7044:'#BDBDB2',7045:'#8D9194',7046:'#82898E',7047:'#CFD0CF',7048:'#888175',8000:'#89693E',8001:'#99622D',8002:'#794D3E',8003:'#7E4B26',8004:'#8F4E35',8007:'#6F4A2F',8008:'#6E4A23',8011:'#5A3A29',8012:'#66332B',8014:'#4A3526',8015:'#633A34',8016:'#492A1F',8017:'#442F29',8019:'#3F3A3A',8022:'#211F20',8023:'#A65E2F',8024:'#765038',8025:'#755C49',8028:'#4E3B2B',8029:'#773C27',9001:'#E9E0D2',9002:'#D7D5CB',9003:'#F4F8F4',9004:'#2E3032',9005:'#0E0E10',9006:'#A1A1A0',9007:'#878683',9010:'#F7F9EF',9011:'#292C2F',9012:'#FFFDE6',9016:'#F7FBF5',9017:'#2A2D2F',9018:'#C7CAC3',9022:'#9C9C9C',9023:'#7E8182',9020:'#FDFDFD',6031:'#485746',8027:'#504938',9021:'#01050E',1039:'#CEC19E',1040:'#BBAC81',6040:'#827E58',7050:'#82887A',8031:'#B49D7B'};
(function(){
const PRJIMG={p1:'https://static.tildacdn.com/tild6639-3336-4961-b064-643835386434/prj_p1.jpg',p2:'https://static.tildacdn.com/tild6161-6561-4336-b336-643333653838/prj_p2.jpg',p4:'https://static.tildacdn.com/tild3964-3739-4331-a465-373162623735/prj_p4.jpg',p5:'https://static.tildacdn.com/tild6539-6236-4234-b833-323161303965/prj_p5.jpg',p6:'https://static.tildacdn.com/tild3837-6635-4664-b837-336238616537/prj_p6.jpg',p7:'https://static.tildacdn.com/tild3736-3233-4435-b564-306232316161/prj_p7.jpg',p8:'https://static.tildacdn.com/tild6236-3430-4966-a237-306531306638/prj_p8.jpg'};
const RPIMG={black:'https://static.tildacdn.com/tild3565-3765-4335-b738-306665373530/rp_black.jpg',blue:'https://static.tildacdn.com/tild6233-3033-4335-a662-396130623331/rp_blue.jpg',cobalt:'https://static.tildacdn.com/tild3533-3066-4437-b032-636361393534/rp_cobalt.jpg',grey:'https://static.tildacdn.com/tild3266-3937-4334-b765-326438343536/rp_grey.jpg',translucent:'https://static.tildacdn.com/tild6134-3636-4231-a263-373665633339/rp_translucent.jpg',wb:'https://static.tildacdn.com/tild6363-3633-4534-b439-646632633165/rp_wb.jpg',white:'https://static.tildacdn.com/tild6638-6538-4736-b630-653563313231/rp_white.jpg'};
const $=id=>document.getElementById(id);
document.querySelectorAll('.start .cell').forEach(c=>{const im=c.querySelector('img');let tx=0,ty=0,cx=0,cy=0,raf=0,on=false;
const tick=()=>{cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;im.style.setProperty('--x',cx+'px');im.style.setProperty('--y',cy+'px');if(on||Math.abs(tx-cx)+Math.abs(ty-cy)>.5)raf=requestAnimationFrame(tick);else raf=0};
const at=e=>{const r=c.getBoundingClientRect();return [e.clientX-r.left+16,e.clientY-r.top+16]};
c.addEventListener('mouseenter',e=>{[tx,ty]=at(e);cx=tx;cy=ty;on=true;if(!raf)tick()});
c.addEventListener('mousemove',e=>{[tx,ty]=at(e)});
c.addEventListener('mouseleave',()=>{on=false});
});
const fit=()=>document.documentElement.style.setProperty('--mh',$('menu').offsetHeight+'px'); fit(); addEventListener('resize',fit);
document.querySelectorAll('.rbw .rb-h1,.rbw .rb-num').forEach(e=>{const h=e.innerHTML;e.innerHTML=e.classList.contains('rb-num')?h.replace(/^(\S+)\s(.+)$/,'$1<u>$2</u>'):h.replace(/^_\s/,'')});
document.documentElement.classList.add('tN','cB');fit();
const P=[['p2','Брест','Кофейня Паше'],['p6','Нижний Новгород','Министерство Завтраков'],['p7','Омск','Skuratov Coffee'],['p8','Пермь','Проект Рыбы'],['p4','Москва','Йогурт-бар Эконика'],['p5','Москва','Чайная Нитка'],['p1','Алматы','Six Coffee Wine']];
$('prj').innerHTML=P.map(([f,c,n])=>`<a class="cell"><img src="${PRJIMG[f]}" alt="${c}, ${n}"><span class="rb-cap">${c}</span><span class="rb-body">${n}</span></a>`).join('');
document.querySelectorAll('#cat a').forEach(a=>{a.onmouseenter=()=>{$('catN').innerHTML=a.dataset.n+'<sup>['+a.dataset.c+']</sup>';$('catN').classList.add('on')};a.onmouseleave=()=>$('catN').classList.remove('on')});
const CH={
'ЭЛЕМЕНТ':{arm:true,soft:true,mat:['сталь','нержавейка'],fab:()=>soft},
'ДУГА':{ver:['S','M'],def:'M',lab:v=>'ДУГА '+v,mat:['сталь','нержавейка'],fab:()=>false},
'УГОЛ':{mat:['сталь','нержавейка'],fab:()=>true},
'БЕЗ НАЗВАНИЯ':{ver:['стул','табурет'],mat:['сталь'],fab:()=>true}
};
const TB={
'СТОЛ 6':{size:[400,700],shape:true,base:true},
'СТОЛ 11':{size:[700,1100],shape:false,base:true},
'НА ТРЁХ НОЖКАХ':{size:false,shape:false,base:false}
};
window.baseOf=(m,s,sq)=>m==='СТОЛ 6'?(sq?(s<500?400:s<700?450:500):(s<500?400:450)):(s<800?450:s<1000?500:600);
const TOP=['МДФ','сталь','переработанный пластик RePanel','нержавейка'];
const PL=[['белый, цветная крошка','white'],['белый, чёрная крошка','wb'],['серый, белая крошка','grey'],['синий, белая крошка','cobalt'],['чёрный, цветная крошка','black'],['полупрозрачный, цветная крошка','translucent',1],['прозрачный, голубая крошка','blue',1]];
let plI=0;
const RAL=[['9005','чёрный'],['6003','оливковый'],['7038','агатовый серый'],['3011','коричнево-красный'],['5005','сигнальный синий'],['9016','белый'],['2009','оранжевый']].map(([k,n])=>[k,window.RALX[k],n]);
const OTHER='другой RAL…';
const fill=(el,list,def,lab)=>{const v=el.value;el.innerHTML=list.map(x=>`<option value="${x}">${lab?lab(x):x}</option>`).join('');if(list.includes(v))el.value=v;else if(def)el.value=def};
const ralOpts=RAL.map(r=>`RAL ${r[0]} · ${r[2]}`).concat(OTHER);
['chRal','tbRal','topRal'].forEach(id=>fill($(id),ralOpts));
const muted=(h,l)=>{const L=14+l*.72,S=34*(1-Math.abs(l-50)/80);return `hsl(${h} ${S.toFixed(0)}% ${L.toFixed(0)}%)`};
const fabTrack=()=>{const h=+$('fabH').value,l=+$('fabL').value;
$('fabH').style.background=`linear-gradient(90deg,${[0,60,120,180,240,300,359].map(x=>muted(x,l)).join(',')})`;
$('fabL').style.background=`linear-gradient(90deg,${muted(h,0)},${muted(h,50)},${muted(h,100)})`};
const swatch=(el,list,cur,bg,on)=>{el.innerHTML=list.map((x,i)=>`<a class="${i===cur?'on':''}" title="${x[0]}" style="background:${bg(x,i)}"></a>`).join('');[...el.children].forEach((a,i)=>a.onclick=()=>{on(i);draw();document.dispatchEvent(new Event('cfg'))})};
fill($('chM'),Object.keys(CH));fill($('tbM'),Object.keys(TB));fill($('tbMat'),TOP);
let arm=true,soft=false,chPl=false;window.chPlI=0;
const show=(id,on)=>$(id).hidden=!on;
const ralOf=(sel,inp)=>sel.value===OTHER?(inp.value.length===4?inp.value:'—'):sel.value.slice(4,8);
const RALK=Object.keys(window.RALX).map(Number);
function ralCheck(inp){const x=$(inp.id+'X'),v=inp.value,bad=v.length===4&&!window.RALX[v];x.hidden=!bad;if(!bad)return;
const n=RALK.reduce((a,b)=>Math.abs(b-v)<Math.abs(a-v)?b:a);
x.innerHTML=`такого цвета в палитре нет. может быть, вы имели в виду <a>RAL ${n}</a>?`;
x.querySelector('a').onclick=()=>{inp.value=n;inp.dispatchEvent(new Event('input'))}}
window.nCh=2;
const seatMax=()=>{const t=TB[$('tbM').value],s=t.size?(+$('tbSize').value||600):700,sq=t.shape&&$('tbTop').value==='квадрат';
return sq?(s<=550?2:s<=650?3:4):(s<=550?2:s<700?3:s<900?4:s<1000?5:6)};
const seatMin=(n,sq)=>sq?(n<=2?0:n===3?551:n===4?651:null):[0,0,0,551,700,900,1000][n];
document.querySelectorAll('#chN button').forEach(b=>b.onclick=()=>{if(b.classList.contains('off'))return;window.nCh=+b.dataset.n;draw();document.dispatchEvent(new Event('seats'))});
function draw(){
{const mx=seatMax();if(window.nCh>mx)window.nCh=mx;
const sq=TB[$('tbM').value].shape&&$('tbTop').value==='квадрат';
document.querySelectorAll('#chN button').forEach(b=>{const n=+b.dataset.n,off=n>mx,m=seatMin(n,sq);b.classList.toggle('off',off);b.setAttribute('aria-disabled',off);b.classList.toggle('on',n===window.nCh);
b.dataset.tip=!off?'':m!=null?`будет тесно, выберите стол от ${m} мм`:`будет тесно, выберите круглый стол от ${seatMin(n,false)} мм`})}
arm=$('chA').value==='добавить';soft=$('chS').value==='обивка';chPl=$('chS').value==='переработанный пластик RePanel';
const m=$('chM').value,c=CH[m];
show('rVer',!!c.ver);if(c.ver)fill($('chV'),c.ver,c.def,c.lab);
const v=c.ver?$('chV').value:'';
show('rArm',!!c.arm);show('rSoft',!!c.soft);show('rChPl',!!c.soft&&chPl);
if(c.soft&&chPl){swatch($('chPlSw'),PL,window.chPlI,x=>`url(${RPIMG[x[1]]}) center/cover`,i=>window.chPlI=i);$('chPlN').textContent=PL[window.chPlI][0]}
const mats=typeof c.mat==='function'?c.mat(v):c.mat;fill($('chMat'),mats);
const steel=$('chMat').value==='сталь';
show('rChRal',steel);show('rChRalIn',steel&&$('chRal').value===OTHER);
show('rFab',c.fab(v)&&steel);
['chRalIn','topRalIn','tbRalIn'].forEach(id=>ralCheck($(id)));
const cr=ralOf($('chRal'),$('chRalIn'));
$('chDot').style.background=(RAL.find(r=>r[0]===cr)||[,window.RALX[cr]||'#fff'])[1];
const contrast=c.fab(v)&&(!steel||$('chFab').value==='сделать контрастной');
show('rFabSw',contrast);fabTrack();$('rFabSw').querySelector('label').textContent=steel?'Свой цвет':'Цвет обивки';
const fc=muted(+$('fabH').value,+$('fabL').value);
$('fabDot').style.background=contrast?fc:(steel?$('chDot').style.background:'#b8b8b6');
const t=TB[$('tbM').value];
show('rSize',!!t.size);show('rTop',t.shape);show('rBase',t.base);
if(t.size)$('tbSizeR').textContent=t.size[0]+'–'+t.size[1];
if(!t.shape)$('tbTop').value='круг';
const tm=$('tbMat').value,mdf=tm==='МДФ',pl=tm==='переработанный пластик RePanel',topRal=mdf||tm==='сталь',tsteel=$('tbBaseMat').value==='сталь';
show('rTopRal',topRal);show('rTopRalIn',topRal&&$('topRal').value===OTHER);show('rPl',pl);
show('rTbRal',tsteel);show('rTbRalIn',tsteel&&$('tbRal').value===OTHER);
const tr=ralOf($('tbRal'),$('tbRalIn')),topr=ralOf($('topRal'),$('topRalIn'));
$('tbDot').style.background=(RAL.find(r=>r[0]===tr)||[,window.RALX[tr]||'#fff'])[1];
$('topDot').style.background=(RAL.find(r=>r[0]===topr)||[,window.RALX[topr]||'#fff'])[1];
swatch($('plSw'),PL,plI,x=>`url(${RPIMG[x[1]]}) center/cover`,i=>plI=i);$('plN').textContent=PL[plI][0];
const chName=[window.nCh+(window.nCh<5?' стула':' стульев'),m==='БЕЗ НАЗВАНИЯ'?v+' БЕЗ НАЗВАНИЯ':m==='ДУГА'?'ДУГА '+v:m==='ЭЛЕМЕНТ'&&soft?'ЭЛЕМЕНТ СОФТ':m,
c.arm?(arm?'с подлокотниками':'без подлокотников'):'',c.soft&&chPl?'спинка и сиденье — пластик RePanel, '+PL[window.chPlI][0]:'',steel?'RAL '+cr:'нержавейка',c.fab(v)?(contrast?(steel?'обивка контрастная (подбор по цвету)':'обивка (подбор по цвету)'):'обивка в тон'):''].filter(Boolean).join(' · ');
const bD=t.base?window.baseOf($('tbM').value,+$('tbSize').value,$('tbTop').value==='квадрат'):0;
const tbName=[$('tbM').value,t.size?$('tbSize').value+' мм':'круг Ø700 мм',t.shape?$('tbTop').value.toLowerCase():'',
t.base?'основание '+($('tbBase').value==='квадрат'?'квадрат '+bD:'круг Ø'+bD)+' мм':'',
'столешница '+(topRal?tm+' RAL '+topr:pl?'пластик RePanel, '+PL[plI][0]:'нержавейка'),'подстолье '+(tsteel?'сталь RAL '+tr:'нержавеющая сталь')].filter(Boolean).join(' · ');
$('chB').textContent=m==='ЭЛЕМЕНТ'&&soft?'ЭЛЕМЕНТ СОФТ':m+(v?' '+v.toUpperCase():'');$('tbB').textContent=$('tbM').value;
window.cfgText=chName+' + '+tbName+'.';
}
document.querySelectorAll('#cfg2 .grp').forEach(g=>g.querySelector('.gh').onclick=()=>document.querySelectorAll('#cfg2 .grp').forEach(x=>x.classList.toggle('open',x===g)));
document.querySelectorAll('#cfg2 select,#cfg2 input').forEach(e=>e.addEventListener(e.tagName==='INPUT'?'input':'change',()=>{if(e.tagName==='INPUT'&&e.type!=='range')e.value=e.value.replace(/\D/g,'');draw()}));
const note=t=>{$('tbSizeN').textContent=t;$('tbSizeN').hidden=false};
const refresh=()=>{draw();document.dispatchEvent(new Event('cfg'))};
function modelFix(){const t=TB[$('tbM').value];if(!t.size)return;const n=+$('tbSize').value,v=Math.min(t.size[1],Math.max(t.size[0],n));
if(v===n)return;$('tbSize').value=v;note(`${$('tbM').value} — от ${t.size[0]} до ${t.size[1]} мм, поставили ${v}`);refresh()}
function sizeFix(){const t=TB[$('tbM').value];if(!t.size)return;const n=+$('tbSize').value;
if(n>=t.size[0]&&n<=t.size[1])return;
const alt=Object.keys(TB).find(k=>TB[k].size&&n>=TB[k].size[0]&&n<=TB[k].size[1]);
if(alt){$('tbM').value=alt;refresh();$('tbM').dispatchEvent(new Event('change'));return}
const lo=Math.min(...Object.values(TB).filter(x=>x.size).map(x=>x.size[0])),hi=Math.max(...Object.values(TB).filter(x=>x.size).map(x=>x.size[1])),v=Math.min(hi,Math.max(lo,n));
const k=Object.keys(TB).find(k=>TB[k].size&&v>=TB[k].size[0]&&v<=TB[k].size[1]);
$('tbSize').value=v;note(`делаем от ${lo} до ${hi} мм — поставили ${v}`);
if(k!==$('tbM').value){$('tbM').value=k;refresh();$('tbM').dispatchEvent(new Event('change'))}else refresh()}
$('tbSize').addEventListener('input',()=>$('tbSizeN').hidden=true);
$('tbSize').addEventListener('change',sizeFix);$('tbM').addEventListener('change',modelFix);
draw();
const RALPOP=[['9005','Глубокий чёрный'],['6003','Оливковый'],['7038','Агатовый серый'],['3011','Коричнево-красный'],['5005','Сигнальный синий'],['9016','Транспортный белый'],['7033','Цементно-серый'],['2009','Транспортный оранжевый'],['7035','Светло-серый'],['3020','Транспортный красный'],['7045','Телегрей 1'],['6013','Тростниково-зелёный'],['7037','Пыльно-серый'],['6021','Бледно-зелёный']];
$('ralRun').innerHTML=[...RALPOP,...RALPOP].map(([c,n])=>`<div class="rc"><span class="tag">RAL ${c}</span><i style="background:${window.RALX[c]||'#ccc'}"></i><span class="nm">${n}</span></div>`).join('');
(()=>{const run=document.querySelector('.ralb .run'),tr=$('ralRun');let x=0,t0=0,drag=null;const SPEED=60;
const loop=t=>{const dt=t0?Math.min(t-t0,50):0;t0=t;if(!drag)x-=SPEED*dt/1000;const h=tr.scrollWidth/2;if(h){x%=h;if(x>0)x-=h}tr.style.transform=`translateX(${x}px)`;requestAnimationFrame(loop)};requestAnimationFrame(loop);
run.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();x-=e.deltaX}},{passive:false});
run.addEventListener('pointerdown',e=>{drag={x0:e.clientX,s:x};run.setPointerCapture(e.pointerId)});
run.addEventListener('pointermove',e=>{if(drag)x=drag.s+e.clientX-drag.x0});
['pointerup','pointercancel'].forEach(k=>run.addEventListener(k,()=>drag=null));
})();
document.querySelectorAll('.rbw').forEach(root=>{const re=/(^|[\s(«„])([а-яёa-z]{1,2}|для|без|над|под|при|про|что|как|или|это|его|все|всё|наш|нам|вас)\s+/gi;
const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,select,option,textarea')?2:1});
let n;while(n=w.nextNode()){let t=n.nodeValue;if(!t.trim())continue;t=t.replace(re,'$1$2 ').replace(re,'$1$2 ').replace(/\s—/g,' —');n.nodeValue=t}});
$('pdOk').onchange=e=>$('send').disabled=!e.target.checked;
const gridHeads=()=>{const W=document.documentElement.clientWidth,pg=20,g=24,cw=(W-2*pg-4*g)/5;
document.querySelectorAll('.rbw .head').forEach(h=>{const t=h.querySelector('.rb-h1');const e=t.getBoundingClientRect().right;let c=pg;for(let i=0;i<5;i++){c=pg+i*(cw+g);if(c>=e+24)break}
const b=h.querySelector('.btn'),room=b?b.getBoundingClientRect().left-c:1e9;
if(c-e<=110&&room>=120)h.style.setProperty('--ml',(c-e)+'px');else h.style.removeProperty('--ml')})};
gridHeads();addEventListener('resize',gridHeads);document.fonts&&document.fonts.ready.then(gridHeads);
// данные и функции, которые нужны 3D-конструктору (cfg3d.js — модуль, внутрь этой обёртки ему не заглянуть)
Object.defineProperties(window,{TB:{get:()=>TB},RAL:{get:()=>RAL},PL:{get:()=>PL},plI:{get:()=>plI},draw:{get:()=>draw}});
})();
