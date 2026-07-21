(function(){
  var btn=document.getElementById('menuBtn'),panel=document.getElementById('navPanel'),ov=document.getElementById('navOverlay');
  function setMenu(open){
    btn.classList.toggle('open',open);panel.classList.toggle('open',open);ov.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open);panel.setAttribute('aria-hidden',!open);
    document.body.style.overflow=open?'hidden':'';
  }
  btn.addEventListener('click',function(){setMenu(!panel.classList.contains('open'));});
  ov.addEventListener('click',function(){setMenu(false);});
  panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});
})();
(function(){
  var cities=["Bordeaux","Caudéran","Mérignac","Pessac","Talence","Bègles","Le Bouscat","Cenon","Lormont","Floirac","Villenave-d'Ornon","Gradignan","Bruges","Eysines","Saint-Médard-en-Jalles","Ambarès-et-Lagrave","Blanquefort","Le Haillan","Arcachon"];
  var list=document.getElementById('citiesList'),ov=document.getElementById('citiesOverlay');
  list.innerHTML=cities.map(function(c){return '<li>'+c+'</li>';}).join('');
  function setC(open){ov.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';}
  document.getElementById('citiesBtn').addEventListener('click',function(){setC(true);});
  document.getElementById('citiesClose').addEventListener('click',function(){setC(false);});
  ov.addEventListener('click',function(e){if(e.target===ov)setC(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setC(false);});
})();
(function(){
  var ov=document.getElementById('legalOverlay');
  function setL(open){ov.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';}
  document.getElementById('legalLink').addEventListener('click',function(e){e.preventDefault();setL(true);});
  document.getElementById('legalClose').addEventListener('click',function(){setL(false);});
  ov.addEventListener('click',function(e){if(e.target===ov)setL(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setL(false);});
})();
(function(){
  var form=document.getElementById('reqForm'),ok=document.getElementById('formOk'),btn=form.querySelector('.req-submit');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    btn.disabled=true;btn.textContent='Envoi…';
    fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))
    }).then(function(r){return r.json();}).then(function(d){
      if(d.success){ok.hidden=false;btn.textContent='Demande envoyée ✓';form.querySelectorAll('input,select,textarea').forEach(function(el){el.disabled=true;});}
      else{btn.disabled=false;btn.textContent='Envoyer ma demande';ok.hidden=false;ok.textContent='Un problème est survenu. Appelez-moi au 07 68 64 25 13.';ok.style.color='#b4442e';}
    }).catch(function(){btn.disabled=false;btn.textContent='Envoyer ma demande';ok.hidden=false;ok.textContent='Un problème est survenu. Appelez-moi au 07 68 64 25 13.';ok.style.color='#b4442e';});
  });
})();
(function(){
  function init(){
    if(!window.L){setTimeout(init,80);return;}
    var center=[44.8378,-0.5792];
    var map=L.map('bxmap',{zoomControl:false,attributionControl:true,scrollWheelZoom:false,dragging:false,doubleClickZoom:false,boxZoom:false,keyboard:false,touchZoom:false}).setView(center,11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'\u00a9 OpenStreetMap contributors',maxZoom:19}).addTo(map);
    L.circle(center,{radius:15000,color:'#c99f2e',weight:2.5,dashArray:'8 7',fillColor:'#c99f2e',fillOpacity:0.12}).addTo(map);
    var pin=L.divIcon({className:'zone-pin',html:'<svg viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg"><path d="M17 1 C8.7 1 2 7.7 2 16 C2 27 17 43 17 43 C17 43 32 27 32 16 C32 7.7 25.3 1 17 1 Z" fill="#1d1f22"/><circle cx="17" cy="16" r="6" fill="#fff"/></svg>',iconSize:[34,44],iconAnchor:[17,44]});
    L.marker(center,{icon:pin,keyboard:false}).addTo(map);
    setTimeout(function(){map.invalidateSize();},200);
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();
