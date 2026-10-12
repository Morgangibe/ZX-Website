/* Código compartido por index.html y las páginas internas:
   textos ES/EN del pie y del banner de cookies, cambio de idioma en páginas legales
   y gestión del consentimiento (localStorage 'zx-consent'). Sin dependencias. */
(function(){
'use strict';
var D={
es:{skip:'Saltar al contenido',home:'Volver al inicio',
 f_about:'Estudio de IA, software y diseño web a medida.',f_nav:'Navegación',f_legal:'Legal',f_contact:'Contacto',
 n_demos:'Demos',n_services:'Servicios',n_webs:'Diseño web',n_work:'Proyectos',n_process:'Método',n_contact:'Formulario de contacto',
 l_aviso:'Aviso legal',l_priv:'Política de privacidad',l_cook:'Política de cookies',l_cond:'Condiciones de uso',l_contact:'Datos de contacto',l_cookset:'Configurar cookies',
 rights:'Todos los derechos reservados.',
 draft:'<b>Borrador pendiente de revisión por abogado.</b> Este texto es una propuesta de trabajo, no asesoramiento legal. Los campos resaltados como PENDIENTE son datos que la empresa debe completar.',
 ck_title:'Tu privacidad',ck_text:'Usamos almacenamiento técnico necesario para que la web funcione (idioma y tu elección de cookies). No cargamos analítica ni publicidad sin tu permiso. Puedes aceptar, rechazar o elegir por categorías.',
 ck_more:'Más información en la política de cookies',ck_accept:'Aceptar todo',ck_reject:'Rechazar todo',ck_config:'Configurar',ck_save:'Guardar selección',
 ck_nec:'Necesarias',ck_nec_d:'Idioma elegido y registro de tu consentimiento. Siempre activas.',ck_ana:'Analítica',ck_ana_d:'Medir visitas de forma agregada. Ahora mismo no se usa ninguna herramienta de analítica.',
 ck_mkt:'Marketing',ck_mkt_d:'Publicidad y remarketing. Ahora mismo no se usa.',ck_on:'Siempre activas',ck_label:'Preferencias de cookies'},
en:{skip:'Skip to content',home:'Back to home',
 f_about:'AI, software and custom web design studio.',f_nav:'Navigation',f_legal:'Legal',f_contact:'Contact',
 n_demos:'Demos',n_services:'Services',n_webs:'Web design',n_work:'Work',n_process:'Process',n_contact:'Contact form',
 l_aviso:'Legal notice',l_priv:'Privacy policy',l_cook:'Cookie policy',l_cond:'Terms of use',l_contact:'Contact details',l_cookset:'Cookie settings',
 rights:'All rights reserved.',
 draft:'<b>Draft pending review by a lawyer.</b> This text is a working proposal, not legal advice. Fields highlighted as PENDING are details the company must fill in.',
 ck_title:'Your privacy',ck_text:'We use technical storage that is strictly necessary for the site to work (language and your cookie choice). We do not load analytics or advertising without your permission. You can accept, reject or choose by category.',
 ck_more:'More information in the cookie policy',ck_accept:'Accept all',ck_reject:'Reject all',ck_config:'Customise',ck_save:'Save selection',
 ck_nec:'Necessary',ck_nec_d:'Chosen language and a record of your consent. Always on.',ck_ana:'Analytics',ck_ana_d:'Measure visits in aggregate. No analytics tool is used at the moment.',
 ck_mkt:'Marketing',ck_mkt_d:'Advertising and remarketing. Not used at the moment.',ck_on:'Always on',ck_label:'Cookie preferences'}
};
var KEY='zx-consent',VER=1,MAXAGE=365*864e5;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function curLang(){var s=store('zxl');if(s==='es'||s==='en')return s;return (navigator.language||'es').slice(0,2)==='es'?'es':'en'}
var L=curLang();
function tr(k){return D[L][k]}

/* ---- textos del pie y de las páginas internas ---- */
function apply(l){
 if(l)L=l;
 document.documentElement.lang=L;
 var n=document.querySelectorAll('[data-zs]');
 for(var i=0;i<n.length;i++){var v=D[L][n[i].getAttribute('data-zs')];if(v!==undefined){if(n[i].hasAttribute('data-zs-html'))n[i].innerHTML=v;else n[i].textContent=v}}
 var b=document.getElementById('lang');if(b&&document.body.hasAttribute('data-pg'))b.textContent=L==='es'?'EN':'ES';
 var tt=document.body.getAttribute('data-t-'+L);if(tt)document.title=tt;
 var y=document.querySelectorAll('.js-year');for(var j=0;j<y.length;j++)y[j].textContent=new Date().getFullYear();
 renderBanner();
}
window.zxApply=apply;

/* ---- consentimiento ---- */
var listeners=[];
function read(){
 try{var o=JSON.parse(store(KEY)||'null');
  if(!o||o.v!==VER||!o.ts||Date.now()-o.ts>MAXAGE)return null;return o}catch(e){return null}
}
function save(a,m){
 var o={v:VER,ts:Date.now(),necessary:true,analytics:!!a,marketing:!!m};
 store(KEY,JSON.stringify(o));
 for(var i=0;i<listeners.length;i++){try{listeners[i](o)}catch(e){}}
 return o;
}
window.zxConsent={
 get:function(){return read()},
 has:function(c){var o=read();return !!(o&&o[c])},
 onChange:function(fn){listeners.push(fn)},
 open:function(){openBanner(true)}
};

/* ---- banner ---- */
var box=null,view='main',opener=null,forced=false;
function build(){
 box=document.createElement('div');box.className='ck';box.id='zx-ck';box.hidden=true;
 box.setAttribute('role','dialog');box.setAttribute('aria-labelledby','zx-ck-t');box.setAttribute('aria-describedby','zx-ck-d');
 box.innerHTML='<h2 id="zx-ck-t"></h2><p id="zx-ck-d"></p>'+
  '<div class="ck-cfg" id="zx-ck-cfg" hidden>'+
  '<div class="ck-cat"><b data-k="ck_nec"></b><span class="al" data-k="ck_on"></span><span class="d" data-k="ck_nec_d"></span></div>'+
  '<div class="ck-cat"><b data-k="ck_ana"></b><label><input type="checkbox" id="zx-ck-a"></label><span class="d" data-k="ck_ana_d"></span></div>'+
  '<div class="ck-cat"><b data-k="ck_mkt"></b><label><input type="checkbox" id="zx-ck-m"></label><span class="d" data-k="ck_mkt_d"></span></div></div>'+
  '<p><a href="cookies.html" data-k="ck_more"></a></p>'+
  '<div class="ck-act"><button type="button" class="ck-b p" data-a="acc"></button><button type="button" class="ck-b p" data-a="rej"></button>'+
  '<button type="button" class="ck-b" data-a="cfg"></button><button type="button" class="ck-b p" data-a="sav" hidden></button></div>';
 document.body.appendChild(box);
 box.addEventListener('click',function(e){
  var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(!a)return;
  if(a==='acc')done(true,true);
  else if(a==='rej')done(false,false);
  else if(a==='cfg'){view='cfg';renderBanner();document.getElementById('zx-ck-a').focus()}
  else if(a==='sav')done(document.getElementById('zx-ck-a').checked,document.getElementById('zx-ck-m').checked);
 });
 box.addEventListener('keydown',function(e){if(e.key==='Escape'&&forced)close()});
}
function renderBanner(){
 if(!box)return;
 var all=box.querySelectorAll('[data-k]');
 for(var i=0;i<all.length;i++)all[i].textContent=tr(all[i].getAttribute('data-k'));
 document.getElementById('zx-ck-t').textContent=tr('ck_title');
 document.getElementById('zx-ck-d').textContent=tr('ck_text');
 box.setAttribute('aria-label',tr('ck_label'));
 var cfg=view==='cfg';
 document.getElementById('zx-ck-cfg').hidden=!cfg;
 var bt=box.querySelectorAll('.ck-act button');
 for(var j=0;j<bt.length;j++){var a=bt[j].getAttribute('data-a');
  if(a==='acc')bt[j].textContent=tr('ck_accept');
  if(a==='rej')bt[j].textContent=tr('ck_reject');
  if(a==='cfg'){bt[j].textContent=tr('ck_config');bt[j].hidden=cfg}
  if(a==='sav'){bt[j].textContent=tr('ck_save');bt[j].hidden=!cfg}}
}
function openBanner(fromSettings){
 if(!box)build();
 forced=!!fromSettings;
 opener=fromSettings?document.activeElement:null;
 var o=read();
 document.getElementById('zx-ck-a').checked=!!(o&&o.analytics);
 document.getElementById('zx-ck-m').checked=!!(o&&o.marketing);
 view=fromSettings?'cfg':'main';
 box.hidden=false;renderBanner();
 if(fromSettings){var f=box.querySelector('input');if(f)f.focus()}
}
function close(){
 if(box)box.hidden=true;
 if(opener&&opener.focus)opener.focus();
 opener=null;forced=false;
}
function done(a,m){save(a,m);close()}

/* ---- arranque ---- */
function init(){
 var pg=document.body.hasAttribute('data-pg');
 if(pg){
  var b=document.getElementById('lang');
  if(b)b.addEventListener('click',function(){var n=L==='es'?'en':'es';store('zxl',n);apply(n)});
 }
 var s=document.querySelectorAll('[data-cookie-settings]');
 for(var i=0;i<s.length;i++)s[i].addEventListener('click',function(){openBanner(true)});
 apply();
 if(!read())openBanner(false);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
