(function(o){"use strict";const p=o.C,s=o.ui,f=o.store,b=s.esc;o.nextDue=function(a,e){const t=f.db,n=p.dayStart(e,t.settings.dayStartHour)+p.DAY,c=a?new Set(p.deckDescendants(t.decks,a)):null,d=new Map(t.notes.map(h=>[h.id,h]));let u=1/0;return t.cards.forEach(h=>{const i=d.get(h.noteId);if(!i||h.suspended||c&&!c.has(i.deckId))return;let l=h.state==="new"?0:Math.max(h.due,h.buriedUntil);l<=e&&(l=n),l<u&&(u=l)}),u===1/0?0:u},o.nextDueText=function(a,e){const t=o.nextDue(a,e);return t?"Next card "+s.dueText(t,e)+".":""};function D(a){return f.db.decks.filter(e=>e.examDate&&p.daysBetween(a,e.examDate)>=0).sort((e,t)=>e.examDate-t.examDate)}o.studyButton=function(a,e,t){const n=s.estimate(f.db,a,t);return`<div class="split">
      <a class="btn big" href="#/study/${encodeURIComponent(a||"all")}"><span>${b(e)}</span>${n?`<span class="est">${b(n)}</span>`:""}</a>
      <button class="btn big split-more" type="button" data-timebox="${b(a||"all")}" aria-label="Study for a set time" title="Study for a set time" aria-haspopup="dialog">${s.icon("chevron")}</button>
    </div>`},o.timeBoxMenu=function(a,e){const t=n=>o.go("#/study/"+encodeURIComponent(e||"all")+(n?"?minutes="+n:""));s.menu(a,[5,10,20].map(n=>({label:n+" minutes",run:()=>t(n)})).concat([{label:"Everything that's due",run:()=>t(0)}]))};let g=null,y="";function S(){const a=o.quick.deckId();return`<section class="quick" aria-label="Quick add">
      <div class="quick-row">
        <textarea id="qa" rows="1" placeholder="Add a card: question = answer" aria-label="Add a card. Write question = answer" aria-describedby="qa-error" autocomplete="off" spellcheck="true"></textarea>
        <button class="btn small" type="button" id="qa-add" hidden>Add</button>
      </div>
      <div class="quick-meta">
        <button class="chip deck-chip" type="button" id="qa-deck" title="Change the deck" aria-label="Deck: ${b(o.quick.deckLabel(a))}. Change it"><span class="ellipsis">${b(o.quick.deckLabel(a))}</span>${s.icon("chevron","sm")}</button>
        <button class="qa-help" type="button" id="qa-help" aria-label="How to write quick cards" title="How to write quick cards">?</button>
        <span class="help grow qa-hint">Enter adds \xB7 <span class="nowrap">Shift+Enter new line</span></span>
      </div>
      <p class="field-error" id="qa-error" role="alert" hidden></p>
    </section>`}function C(a){const e=s.$("#qa",a),t=s.$("#qa-add",a),n=s.$("#qa-error",a);let c=o.quick.deckId();const d=()=>{e.style.height="auto",e.style.height=Math.min(e.scrollHeight+2,220)+"px",t.hidden=!e.value.trim()},u=i=>{n.textContent=i,n.hidden=!i,e.classList.toggle("invalid",!!i)};g?(e.value=g.text,u(g.error),g=null,setTimeout(()=>e.focus(),0)):y&&(e.value=y),y=e.value,d(),e.addEventListener("input",()=>{y=e.value,d(),n.hidden||u("")}),e.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&!i.isComposing?(i.preventDefault(),h()):i.key==="Escape"&&e.value&&(i.preventDefault(),e.value="",y="",d(),u(""))}),t.onclick=h,s.$("#qa-help",a).onclick=()=>o.quick.syntaxDialog().then(()=>e.focus()),s.$("#qa-deck",a).onclick=async()=>{const i=await s.pickDeck("Add quick cards to\u2026",{selected:c,ok:"Use this deck"});if(!i)return;c=i,s.pref.set("lastDeck",i);const l=s.$("#qa-deck",a);l.querySelector(".ellipsis").textContent=o.quick.deckLabel(i),l.setAttribute("aria-label","Deck: "+o.quick.deckLabel(i)+". Change it"),e.focus()};async function h(){const i=e.value;if(!i.trim())return;f.db.decks.some(m=>m.id===c)||(c=o.quick.deckId());const l=p.parseQuickAdd(i);if(!l.cards.length){u(o.quick.errorText(l.errors)),e.focus();return}if(l.cards.length>3&&!await o.quick.confirmMany(l,c)){e.focus();return}const r=o.quick.add(c,l.cards);g={text:o.quick.leftover(i,l.errors),error:o.quick.errorText(l.errors)},g.text||(g={text:"",error:""}),y=g.text,o.refresh(),o.quick.addedToast(r,c);const k=s.$("#qa");k&&k.focus()}}o.refreshIfHome=()=>{const a=o.currentRoute();a&&a.name==="home"&&o.refresh()};function T(a,e){const t=p.comebackStatus(a,e);if(t){const c=s.pref.get("comebackPlan",null),d=c&&c.until===t.until?c.days:t.daysLeft;return`<div class="notice"><span aria-hidden="true">\u{1F9ED}</span><div class="grow"><b>Catching up: day ${Math.max(1,Math.min(d,d-t.daysLeft+1))} of ${d}</b><br>
        <span class="small muted">Up to ${t.perDay} reviews a day until the pile is gone. You can stop this in Settings.</span></div></div>`}const n=p.detectBacklog(a,null,e);return!n||s.pref.get("comebackDismissed",0)===p.dayStart(e,a.settings.dayStartHour)?"":`<div class="notice comeback" role="region" aria-label="Welcome back"><span aria-hidden="true">\u{1F44B}</span><div class="grow">
        <b>Welcome back!</b> You have ${n.overdue} cards waiting. Spread them over ${n.suggestedDays} days?
        <div class="actions" style="margin:8px 0 0"><button class="btn small" type="button" id="cb-spread" data-days="${n.suggestedDays}" data-per="${n.perDay}">Spread them</button>
        <button class="btn small plain" type="button" id="cb-all">Do all now</button></div></div></div>`}function A(a,e){const t=s.$("#cb-spread",a);t&&(t.onclick=()=>{const n=+t.dataset.days,c=+t.dataset.per,d=p.startComeback(f.db,n,Date.now(),c);f.set(d),s.pref.set("comebackPlan",{until:d.settings.comeback&&d.settings.comeback.until,days:n}),s.toast("Okay! About "+c+" reviews a day for the next "+n+" days."),o.refresh()},s.$("#cb-all",a).onclick=()=>{s.pref.set("comebackDismissed",p.dayStart(e,f.db.settings.dayStartHour)),o.refresh()})}function L(a){const e=f.db;if(!e.decks.length)return M(a);const t=Date.now(),n=p.studyCounts(e,null,t),c=s.todayAnswers(e,null,t).reviews,d=c+n.total?Math.round(c/(c+n.total)*100):0,u=s.streakInfo(e,t),h=D(t).map(m=>`<div class="exam-block"><div class="exam"><span aria-hidden="true">\u{1F4C5}</span><a href="#/deck/${b(m.id)}">${b(s.examText(m,t))}</a></div>${s.examPlan(e,m.id,t)}</div>`).join(""),i=s.pref.get("lastBackup",0)||e.notes.reduce((m,$)=>Math.min(m,$.created||t),t),l=e.notes.length>=30&&t-i>30*p.DAY&&t-s.pref.get("backupNag",0)>7*p.DAY;a.innerHTML=`
      ${S()}
      ${T(e,t)}
      <section class="panel today" aria-label="Today">
        ${n.total?`
          <div class="row between wrap">
            <div><div class="big-num">${n.total}</div><div><b>${n.total===1?"card":"cards"} to study today</b></div></div>
            ${s.counts(n)}
          </div>
          ${o.studyButton(null,"Study now",t)}`:`<div><div class="big-num" aria-hidden="true">\u2713</div><p><b>All done for today.</b> ${b(o.nextDueText(null,t))}</p></div>`}
        <div>
          <div class="row between small"><span>Today: ${s.plural(c,"review")} done</span><span class="muted">${d}%</span></div>
          <div class="meter" role="progressbar" aria-label="Today's progress" aria-valuenow="${d}" aria-valuemin="0" aria-valuemax="100"><div style="width:${d}%"></div></div>
        </div>
        ${u.count?`<div class="streak-line small"><b>\u{1F525} ${u.count}</b> <span>${u.count===1?"day":"days"} in a row</span>
          <span class="${u.line.startsWith("Study")?"nudge":"muted"}">\xB7 ${b(u.line)}</span> <a href="#/help?section=streakhelp" class="tiny">How it works</a></div>`:""}
        ${h}
      </section>
      ${l?`<div class="notice warn"><div class="grow">It's been a while since your last backup. Your cards only live in this browser.</div>
        <button class="btn small" id="backupNow" type="button">Back up</button><button class="btn small plain" id="backupLater" type="button">Later</button></div>`:""}
      <div class="row between wrap"><h2>Your decks</h2>${s.countsLegend()}</div>
      <section class="panel decks" aria-label="Decks"></section>
      <div class="actions">
        <button class="btn ghost" type="button" id="newDeck">${s.icon("plus","sm")} New deck</button>
        <a class="btn ghost" href="#/add">Add cards</a>
        <a class="btn ghost" href="#/import">Import</a>
        <a class="btn plain" href="#/help">How does Ikna work?</a>
      </div>`,C(a),A(a,t);const r=s.$(".decks",a);v(r,t),r.addEventListener("click",E);const k=s.$("[data-timebox]",a);k&&(k.onclick=()=>o.timeBoxMenu(k,null)),s.$("#newDeck",a).onclick=()=>o.newDeckDialog(),l&&(s.$("#backupNow",a).onclick=()=>o.data.downloadBackup().then(o.refresh),s.$("#backupLater",a).onclick=()=>{s.pref.set("backupNag",Date.now()),o.refresh()})}function v(a,e){const t=f.db,n=p.deckTree(t.decks),c=new Set(s.pref.get("collapsed",[])),d=new Set(t.decks.map(r=>r.parentId).filter(Boolean)),u=new Map,h=new Map(t.notes.map(r=>[r.id,r.deckId]));t.cards.forEach(r=>{const k=h.get(r.noteId);u.set(k,(u.get(k)||0)+1)});let i=1/0,l="";n.forEach(({deck:r,depth:k})=>{if(k>i)return;i=1/0;const m=!c.has(r.id);d.has(r.id)&&!m&&(i=k);const w=p.deckDescendants(t.decks,r.id).reduce((B,N)=>B+(u.get(N)||0),0),x=p.studyCounts(t,r.id,e),q=w?s.strength(p.deckStrength(t,r.id,e)):"",H=w?x.total?s.counts(x):'<span class="done">Done \u2713</span>':'<span class="muted small no-cards">No cards yet</span>';l+=`<div class="deck-row" style="--depth:${k}">
        ${d.has(r.id)?`<button class="twisty" type="button" data-toggle="${b(r.id)}" aria-expanded="${m}" aria-label="${m?"Collapse":"Expand"} ${b(r.name)}">${s.icon("chevron","sm")}</button>`:d.size?'<span class="spacer"></span>':'<span class="spacer flat"></span>'}
        <a class="deck-link" href="#/deck/${b(r.id)}">
          <span class="deck-emoji" aria-hidden="true">${b(r.emoji)}</span>
          <span class="grow"><span class="deck-name">${b(r.name)}</span><br><span class="deck-sub">${s.plural(w,"card")}${q?" \xB7 "+q:""}</span></span>
        </a>
        ${H}
      </div>`}),a.innerHTML=l}function E(a){const e=a.target.closest("[data-toggle]");if(!e)return;const t=a.currentTarget,n=e.dataset.toggle,c=new Set(s.pref.get("collapsed",[]));c.has(n)?c.delete(n):c.add(n),s.pref.set("collapsed",Array.from(c)),v(t,Date.now());const d=t.querySelector(`[data-toggle="${CSS.escape(n)}"]`);d&&d.focus()}function M(a){a.innerHTML=`
      <section class="panel">
        <h1>Welcome to Ikna \u{1F44B}</h1>
        <p>Ikna helps you remember anything: exam material, facts, definitions, formulas, words or names.
        It shows each card again right before you would forget it, so a few minutes a day is enough.</p>
        <h2>Try a sample deck</h2>
        <p class="help">Pick one or more. You can delete them any time.</p>
        <div class="samples">
          ${p.SAMPLES.map(n=>`
            <label class="sample">
              <input type="checkbox" value="${b(n.id)}"${n.id==="tour"?" checked":""}>
              <span class="emoji" aria-hidden="true">${b(n.emoji)}</span>
              <span class="grow"><b>${b(n.name)}</b>${n.id==="tour"?' <span class="pill ok">Start here</span>':""}<br>
              <span class="muted small">${b(n.desc)}</span></span>
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
      </section>`;const e=s.$("#addSamples",a),t=()=>{const n=s.$$(".samples input:checked",a).length;e.disabled=!n,e.textContent=n>1?"Add "+n+" decks":"Add this deck"};s.$(".samples",a).addEventListener("change",t),t(),e.onclick=()=>{const n=s.$$(".samples input:checked",a).map(c=>c.value);o.addSamples(n)},s.$("#ownDeck",a).onclick=()=>o.newDeckDialog()}o.addSamples=function(a){let e=f.db;a.forEach(t=>{e=p.addSample(e,t).db}),f.set(e),s.toast(a.length===1?"Deck added. Tap Study now to begin.":a.length+" decks added."),o.go("#/")},o.screens.home={tab:"home",render:L}})(window.Ikna);
