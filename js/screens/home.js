(function(o){"use strict";const l=o.C,n=o.ui,f=o.store,b=n.esc;o.nextDue=function(a,e){const t=f.db,s=l.dayStart(e,t.settings.dayStartHour)+l.DAY,c=a?new Set(l.deckDescendants(t.decks,a)):null,u=new Map(t.notes.map(h=>[h.id,h]));let p=1/0;return t.cards.forEach(h=>{const i=u.get(h.noteId);if(!i||h.suspended||c&&!c.has(i.deckId))return;let r=h.state==="new"?0:Math.max(h.due,h.buriedUntil);r<=e&&(r=s),r<p&&(p=r)}),p===1/0?0:p},o.nextDueText=function(a,e){const t=o.nextDue(a,e);return t?"Next card "+n.dueText(t,e)+".":""};function D(a){return f.db.decks.filter(e=>e.examDate&&l.daysBetween(a,e.examDate)>=0).sort((e,t)=>e.examDate-t.examDate)}o.studyButton=function(a,e,t){const s=n.estimate(f.db,a,t);return`<div class="split">
      <a class="btn big" href="#/study/${encodeURIComponent(a||"all")}"><span>${b(e)}</span>${s?`<span class="est">${b(s)}</span>`:""}</a>
      <button class="btn big split-more" type="button" data-timebox="${b(a||"all")}" aria-label="Study for a set time" title="Study for a set time" aria-haspopup="dialog">${n.icon("chevron")}</button>
    </div>`},o.timeBoxMenu=function(a,e){const t=s=>o.go("#/study/"+encodeURIComponent(e||"all")+(s?"?minutes="+s:""));n.menu(a,[5,10,20].map(s=>({label:s+" minutes",run:()=>t(s)})).concat([{label:"Everything that's due",run:()=>t(0)}]))};let y=null,g="";function S(){const a=o.quick.deckId();return`<section class="quick" aria-label="Quick add">
      <div class="quick-row">
        <textarea id="qa" rows="1" placeholder="Add a card: question = answer" aria-label="Add a card. Write question = answer" aria-describedby="qa-error" autocomplete="off" spellcheck="true"></textarea>
        <button class="btn small" type="button" id="qa-add" hidden>Add</button>
      </div>
      <div class="quick-meta">
        <button class="chip deck-chip" type="button" id="qa-deck" title="Change the deck" aria-label="Deck: ${b(o.quick.deckLabel(a))}. Change it"><span class="ellipsis">${b(o.quick.deckLabel(a))}</span>${n.icon("chevron","sm")}</button>
        <button class="qa-help" type="button" id="qa-help" aria-label="How to write quick cards" title="How to write quick cards">?</button>
        <span class="help grow qa-hint">Enter adds \xB7 <span class="nowrap">Shift+Enter new line</span></span>
      </div>
      <p class="field-error" id="qa-error" role="alert" hidden></p>
    </section>`}function C(a){const e=n.$("#qa",a),t=n.$("#qa-add",a),s=n.$("#qa-error",a);let c=o.quick.deckId();const u=()=>{e.style.height="auto",e.style.height=Math.min(e.scrollHeight+2,220)+"px",t.hidden=!e.value.trim()},p=i=>{s.textContent=i,s.hidden=!i,e.classList.toggle("invalid",!!i)};y?(e.value=y.text,p(y.error),y=null,setTimeout(()=>e.focus(),0)):g&&(e.value=g),g=e.value,u(),e.addEventListener("input",()=>{g=e.value,u(),s.hidden||p("")}),e.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&!i.isComposing?(i.preventDefault(),h()):i.key==="Escape"&&e.value&&(i.preventDefault(),e.value="",g="",u(),p(""))}),t.onclick=h,n.$("#qa-help",a).onclick=()=>o.quick.syntaxDialog().then(()=>e.focus()),n.$("#qa-deck",a).onclick=async()=>{const i=await n.pickDeck("Add quick cards to\u2026",{selected:c,ok:"Use this deck"});if(!i)return;c=i,n.pref.set("lastDeck",i);const r=n.$("#qa-deck",a);r.querySelector(".ellipsis").textContent=o.quick.deckLabel(i),r.setAttribute("aria-label","Deck: "+o.quick.deckLabel(i)+". Change it"),e.focus()};async function h(){const i=e.value;if(!i.trim())return;f.db.decks.some(m=>m.id===c)||(c=o.quick.deckId());const r=l.parseQuickAdd(i);if(!r.cards.length){p(o.quick.errorText(r.errors)),e.focus();return}if(r.cards.length>3&&!await o.quick.confirmMany(r,c)){e.focus();return}const d=o.quick.add(c,r.cards);y={text:o.quick.leftover(i,r.errors),error:o.quick.errorText(r.errors)},y.text||(y={text:"",error:""}),g=y.text,o.refresh(),o.quick.addedToast(d,c);const k=n.$("#qa");k&&k.focus()}}o.refreshIfHome=()=>{const a=o.currentRoute();a&&a.name==="home"&&o.refresh()};function T(a,e){const t=l.comebackStatus(a,e);if(t){const c=t.days||t.daysLeft;return`<div class="notice"><span aria-hidden="true">\u{1F9ED}</span><div class="grow"><b>Catching up: day ${t.day||1} of ${c}</b><br>
        <span class="small muted">Up to ${t.perDay} reviews a day until the pile is gone. You can stop this in Settings.</span></div></div>`}const s=l.detectBacklog(a,null,e);return!s||n.pref.get("comebackDismissed",0)===l.dayStart(e,a.settings.dayStartHour)?"":`<div class="notice comeback" role="region" aria-label="Welcome back"><span aria-hidden="true">\u{1F44B}</span><div class="grow">
        <b>Welcome back!</b> You have ${s.overdue} cards waiting. Spread them over ${s.suggestedDays} days?
        <div class="actions" style="margin:8px 0 0"><button class="btn small" type="button" id="cb-spread" data-days="${s.suggestedDays}" data-per="${s.perDay}">Spread them</button>
        <button class="btn small plain" type="button" id="cb-all">Do all now</button></div></div></div>`}function A(a,e){const t=n.$("#cb-spread",a);t&&(t.onclick=()=>{const s=+t.dataset.days,c=+t.dataset.per,u=l.startComeback(f.db,s,Date.now(),c);f.set(u),n.toast("Okay! About "+c+" reviews a day for the next "+s+" days."),o.refresh()},n.$("#cb-all",a).onclick=()=>{n.pref.set("comebackDismissed",l.dayStart(e,f.db.settings.dayStartHour)),o.refresh()})}function L(a){const e=f.db;if(!e.decks.length)return M(a);const t=Date.now(),s=l.studyCounts(e,null,t),c=n.todayAnswers(e,null,t).reviews,u=c+s.total?Math.round(c/(c+s.total)*100):0,p=n.streakInfo(e,t),h=D(t).map(m=>`<div class="exam-block"><div class="exam"><span aria-hidden="true">\u{1F4C5}</span><a href="#/deck/${b(m.id)}">${b(n.examText(m,t))}</a></div>${n.examPlan(e,m.id,t)}</div>`).join(""),i=n.pref.get("lastBackup",0)||e.notes.reduce((m,$)=>Math.min(m,$.created||t),t),r=e.notes.length>=30&&t-i>30*l.DAY&&t-n.pref.get("backupNag",0)>7*l.DAY;a.innerHTML=`
      ${S()}
      ${T(e,t)}
      <section class="panel today" aria-label="Today">
        ${s.total?`
          <div class="row between wrap">
            <div><div class="big-num">${s.total}</div><div><b>${s.total===1?"card":"cards"} to study today</b></div></div>
            ${n.counts(s)}
          </div>
          ${o.studyButton(null,"Study now",t)}`:`<div><div class="big-num" aria-hidden="true">\u2713</div><p><b>All done for today.</b> ${b(o.nextDueText(null,t))}</p></div>`}
        <div>
          <div class="row between small"><span>Today: ${n.plural(c,"review")} done</span><span class="muted">${u}%</span></div>
          <div class="meter" role="progressbar" aria-label="Today's progress" aria-valuenow="${u}" aria-valuemin="0" aria-valuemax="100"><div style="width:${u}%"></div></div>
        </div>
        ${p.count?`<div class="streak-line small"><b>\u{1F525} ${p.count}</b> <span>${p.count===1?"day":"days"} in a row</span>
          <span class="${p.line.startsWith("Study")?"nudge":"muted"}">\xB7 ${b(p.line)}</span> <a href="#/help?section=streakhelp" class="tiny">How it works</a></div>`:""}
        ${h}
      </section>
      ${r?`<div class="notice warn"><div class="grow">It's been a while since your last backup. Your cards only live in this browser.</div>
        <button class="btn small" id="backupNow" type="button">Back up</button><button class="btn small plain" id="backupLater" type="button">Later</button></div>`:""}
      <div class="row between wrap"><h2>Your decks</h2>${n.countsLegend()}</div>
      <section class="panel decks" aria-label="Decks"></section>
      <div class="actions">
        <button class="btn ghost" type="button" id="newDeck">${n.icon("plus","sm")} New deck</button>
        <a class="btn ghost" href="#/add">Add cards</a>
        <a class="btn ghost" href="#/import">Import</a>
        <a class="btn plain" href="#/help">How does Ikna work?</a>
      </div>`,C(a),A(a,t);const d=n.$(".decks",a);v(d,t),d.addEventListener("click",E);const k=n.$("[data-timebox]",a);k&&(k.onclick=()=>o.timeBoxMenu(k,null)),n.$("#newDeck",a).onclick=()=>o.newDeckDialog(),r&&(n.$("#backupNow",a).onclick=()=>o.data.downloadBackup().then(o.refresh),n.$("#backupLater",a).onclick=()=>{n.pref.set("backupNag",Date.now()),o.refresh()})}function v(a,e){const t=f.db,s=l.deckTree(t.decks),c=new Set(n.pref.get("collapsed",[])),u=new Set(t.decks.map(d=>d.parentId).filter(Boolean)),p=new Map,h=new Map(t.notes.map(d=>[d.id,d.deckId]));t.cards.forEach(d=>{const k=h.get(d.noteId);p.set(k,(p.get(k)||0)+1)});let i=1/0,r="";s.forEach(({deck:d,depth:k})=>{if(k>i)return;i=1/0;const m=!c.has(d.id);u.has(d.id)&&!m&&(i=k);const w=l.deckDescendants(t.decks,d.id).reduce((B,N)=>B+(p.get(N)||0),0),x=l.studyCounts(t,d.id,e),q=w?n.strength(l.deckStrength(t,d.id,e)):"",H=w?x.total?n.counts(x):'<span class="done">Done \u2713</span>':'<span class="muted small no-cards">No cards yet</span>';r+=`<div class="deck-row" style="--depth:${k}">
        ${u.has(d.id)?`<button class="twisty" type="button" data-toggle="${b(d.id)}" aria-expanded="${m}" aria-label="${m?"Collapse":"Expand"} ${b(d.name)}">${n.icon("chevron","sm")}</button>`:u.size?'<span class="spacer"></span>':'<span class="spacer flat"></span>'}
        <a class="deck-link" href="#/deck/${b(d.id)}">
          <span class="deck-emoji" aria-hidden="true">${b(d.emoji)}</span>
          <span class="grow"><span class="deck-name">${b(d.name)}</span><br><span class="deck-sub">${n.plural(w,"card")}${q?" \xB7 "+q:""}</span></span>
        </a>
        ${H}
      </div>`}),a.innerHTML=r}function E(a){const e=a.target.closest("[data-toggle]");if(!e)return;const t=a.currentTarget,s=e.dataset.toggle,c=new Set(n.pref.get("collapsed",[]));c.has(s)?c.delete(s):c.add(s),n.pref.set("collapsed",Array.from(c)),v(t,Date.now());const u=t.querySelector(`[data-toggle="${CSS.escape(s)}"]`);u&&u.focus()}function M(a){a.innerHTML=`
      <section class="panel">
        <h1>Welcome to Ikna \u{1F44B}</h1>
        <p>Ikna helps you remember anything: exam material, facts, definitions, formulas, words or names.
        It shows each card again right before you would forget it, so a few minutes a day is enough.</p>
        <h2>Try a sample deck</h2>
        <p class="help">Pick one or more. You can delete them any time.</p>
        <div class="samples">
          ${l.SAMPLES.map(s=>`
            <label class="sample">
              <input type="checkbox" value="${b(s.id)}"${s.id==="tour"?" checked":""}>
              <span class="emoji" aria-hidden="true">${b(s.emoji)}</span>
              <span class="grow"><b>${b(s.name)}</b>${s.id==="tour"?' <span class="pill ok">Start here</span>':""}<br>
              <span class="muted small">${b(s.desc)}</span></span>
            </label>`).join("")}
        </div>
        <button class="btn" type="button" id="addSamples">Add selected decks</button>
        <h2>Or start with your own cards</h2>
        <div class="actions">
          <button class="btn ghost" type="button" id="ownDeck">Create my own deck</button>
          <a class="btn ghost" href="#/import">Import from Anki / Quizlet / a spreadsheet</a>
        </div>
        <p class="help">Already used Ikna on another device? <a href="#/settings">Restore a backup</a> in Settings.</p>
      </section>
      <section class="panel">
        <h2>How it works</h2>
        <ol class="small">
          <li>Make cards: a question on the front, the answer on the back. Or hide words in a sentence.</li>
          <li>Each day, Ikna gives you the cards that are due. Try to remember, then show the answer.</li>
          <li>Say how it went. Cards you know come back less often; cards you forgot come back soon.</li>
        </ol>
        <a href="#/help">Read the short guide</a>
      </section>`;const e=n.$("#addSamples",a),t=()=>{const s=n.$$(".samples input:checked",a).length;e.disabled=!s,e.textContent=s>1?"Add "+s+" decks":"Add this deck"};n.$(".samples",a).addEventListener("change",t),t(),e.onclick=()=>{const s=n.$$(".samples input:checked",a).map(c=>c.value);o.addSamples(s)},n.$("#ownDeck",a).onclick=()=>o.newDeckDialog()}o.addSamples=function(a){let e=f.db;a.forEach(t=>{e=l.addSample(e,t).db}),f.set(e),n.toast(a.length===1?"Deck added. Tap Study now to begin.":a.length+" decks added."),o.go("#/")},o.screens.home={tab:"home",render:L}})(window.Ikna);
