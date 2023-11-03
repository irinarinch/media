(()=>{"use strict";function t(){const t=new Date;return`${t.toLocaleDateString()} ${t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}class e{static create(e,n){return{content:e,time:t(),geo:n}}}class n{static getData(t){t.includes(", ")&&console.log("есть запятая")}static check(t){if(/\[?\-?\d{1,3}\.\d+\, ?\-?\d{1,3}\.\d+\]?/.test(t.trim())){const e=t.split(",");return{latitude:e[0].replace(/\[|\]| /g,""),longitude:e[1].replace(/\[|\]| /g,"")}}return!1}}new class{constructor(t){this.root=t,this.container=document.querySelector(".container"),this.input=document.querySelector(".input"),this.modal=document.querySelector(".modal"),this.modalInput=document.querySelector(".modal-input")}init(){document.addEventListener("submit",(t=>{this.getCurrentPosition(t),this.validate(t)})),document.addEventListener("click",(t=>{t.target.closest(".cancel-btn")&&this.closeModal()}))}getCurrentPosition(t){t.preventDefault(),t.target.closest(".input-container")&&(""!==this.input.value.trim()?navigator.geolocation&&navigator.geolocation.getCurrentPosition((t=>this.handleData(t)),(()=>this.handleError()),{timeout:1e4,enableHighAccuracy:!0,maximumAge:0}):this.input.placeholder="Напишите что-нибудь")}handleData(t){this.render(t.coords),this.input.placeholder=""}handleError(){this.modal.classList.remove("hidden"),this.modalInput.focus()}validate(t){if(t.preventDefault(),!t.target.closest(".modal-form"))return;const{value:e}=this.modalInput,o=document.querySelector(".description"),i=n.check(e);i?(this.render(i),this.closeModal()):o.style.color="red",this.modalInput.oninput=()=>{o.style.color="black"}}closeModal(){this.modal.classList.add("hidden"),this.modalInput.value=""}render(t){const{latitude:n,longitude:o}=t,i=`[${n}, ${o}]`,a=e.create(this.input.value,i);this.addElements(a),this.input.value=""}addElements(t){const e=document.createElement("div");e.classList.add("post");const n=document.createElement("div"),o=document.createElement("div"),i=document.createElement("div");e.appendChild(n),e.appendChild(o),e.appendChild(i),n.className="content",o.className="time",i.className="geo",n.textContent=t.content,o.textContent=t.time,i.textContent=t.geo,this.container.append(e)}}(document.querySelector("#root")).init()})();