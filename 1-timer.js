import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as m,i as p}from"./assets/vendor-BbSUbo7J.js";const e=document.querySelector("button"),h=document.querySelector(".timer");let u,i;e.disabled=!0;m("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(s){console.log(s[0]);const a=Date.now();i=s[0].getTime(),i<a?(p.show({title:"Error",message:"Please choose a date in the future"}),e.disabled=!0):e.disabled=!1}});function v(s){const r=Math.floor(s/864e5),l=Math.floor(s%864e5/36e5),d=Math.floor(s%864e5%36e5/6e4),f=Math.floor(s%864e5%36e5%6e4/1e3);return{days:r,hours:l,minutes:d,seconds:f}}function n(s){return String(s).padStart(2,"0")}e.addEventListener("click",()=>{const s=i;u=setInterval(()=>{const a=Date.now(),o=s-a;if(o<=0){clearInterval(u),e.disabled=!1;return}const t=v(o),c=n(t.days),r=n(t.hours),l=n(t.minutes),d=n(t.seconds);h.innerHTML=`<div class="field">
      <span class="value" data-days>${c}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${r}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${l}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-seconds>${d}</span>
      <span class="label">Seconds</span>
    </div>`,e.disabled=!0},1e3)});
//# sourceMappingURL=1-timer.js.map
