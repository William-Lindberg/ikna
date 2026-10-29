(function(u){"use strict";const l=u.C,e=u.ui,b=u.store,c=e.esc,D=s=>b.db.decks.find(o=>o.id===s);function S(s){s.innerHTML=`<div class="empty"><div class="big">\u{1F914}</div><p>This deck doesn't exist any more.</p><a class="btn" href="#/">Go home</a></div>`}function C(s){return`<div class="emoji-grid" role="group" aria-label="Emoji">${l.EMOJIS.map(o=>`<button type="button" data-emoji="${c(o)}" aria-pressed="${o===s}">${c(o)}</button>`).join("")}</div>`}function E(s,o,a){s.addEventListener("click",t=>{const i=t.target.closest("[data-emoji]");i&&(o.value=i.dataset.emoji,e.$$("[data-emoji]",s).forEach(m=>m.setAttribute("aria-pressed",String(m===i))),a(i.dataset.emoji))}),o.addEventListener("input",()=>{e.$$("[data-emoji]",s).forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.emoji===o.value.trim())))})}u.newDeckDialog=function(s,o){const a=b.db.decks.length>0;return e.dialog({title:s?"New subdeck":"New deck",body:`
        <label for="nd-name">Name</label>
        <input type="text" id="nd-name" placeholder="e.g. Biology, Driving theory, Spanish" autocomplete="off" maxlength="80">
        <p class="field-error" id="nd-error" hidden>Give your deck a name.</p>
        <label for="nd-emoji">Emoji</label>
        <input type="text" id="nd-emoji" value="\u{1F4D8}" maxlength="8" style="width:90px">
        ${C("\u{1F4D8}")}
        ${a?`<label for="nd-parent">Inside another deck?</label>
          <select id="nd-parent">${e.deckOptions({selected:s,none:"No, it's a main deck"})}</select>`:""}`,actions:[{label:"Cancel",value:"",kind:"plain"},{label:"Create deck",value:"ok"}],defaultValue:"ok",onOpen:t=>{E(e.$(".emoji-grid",t),e.$("#nd-emoji",t),()=>{}),e.$("#nd-name",t).focus()},validate:t=>{const i=!!e.$("#nd-name",t).value.trim();return e.$("#nd-error",t).hidden=i,i||e.$("#nd-name",t).focus(),i},read:(t,i)=>i==="ok"?{name:e.$("#nd-name",t).value.trim(),emoji:e.$("#nd-emoji",t).value.trim()||"\u{1F4D8}",parentId:a&&e.$("#nd-parent",t).value||null}:null}).then(t=>{if(!t)return null;const i=l.addDeck(b.db,t);return b.set(i.db),o&&o.stay||u.go("#/deck/"+encodeURIComponent(i.deck.id)),i.deck})};const A=[["all","All cards"],["due","Due soon"],["struggling","Trouble cards"],["flagged","Flagged"],["new","New (not studied yet)"],["recent","Added this week"]];u.practiceDialog=function(s,o){const a=b.db,t=s?new Set(l.deckDescendants(a.decks,s)):null,i=l.allTags({notes:a.notes.filter(n=>!t||t.has(n.deckId))}).map(n=>n.tag),m=o==="quiz",r=(n,p)=>l.practiceCards(b.db,{deckId:s,filter:n,tag:p||void 0,shuffle:!1}).length,g=m?l.practiceCards(a,{deckId:s,filter:"all",shuffle:!1})[0]:null,$=g?l.quizChoices(a,g.id,4):null,v=m?$?"Pick the right answer out of "+($.length===4?"four":"a few")+".":"Multiple choice needs at least 3 cards with different answers, so for now you'll get flip cards.":"Go through cards at your own pace.";return e.dialog({title:m?"Quiz yourself":"Practice",body:`
        <p class="muted small">${c(v)} This never changes when cards are due.</p>
        <fieldset style="border:0;padding:0;margin:0">
          <legend class="label">Which cards?</legend>
          <div class="stack">${A.map(([n,p],f)=>`
            <label class="setting" style="padding:8px 0"><span><input type="radio" name="pf" value="${n}"${f===0?" checked":""}> ${c(p)}</span>
            <span class="pill" data-count="${n}"></span></label>`).join("")}</div>
        </fieldset>
        ${i.length?`<label for="pf-tag">Only cards with this tag</label>
          <select id="pf-tag"><option value="">Any tag</option>${i.map(n=>`<option>${c(n)}</option>`).join("")}</select>`:""}
        <label for="pf-limit">How many?</label>
        <select id="pf-limit"><option value="10">10 cards</option><option value="20" selected>20 cards</option><option value="50">50 cards</option><option value="0">All of them</option></select>`,actions:[{label:"Cancel",value:"",kind:"plain"},{label:m?"Start quiz":"Start practice",value:"ok"}],defaultValue:"ok",onOpen:n=>{const p=e.$("#pf-tag",n),f=()=>{const d=p?p.value:"";A.forEach(([k])=>{e.$(`[data-count="${k}"]`,n).textContent=r(k,d)})};p&&(p.onchange=f),f(),e.$('input[name="pf"]',n).focus()},validate:n=>{const p=e.$('input[name="pf"]:checked',n).value;return+e.$(`[data-count="${p}"]`,n).textContent>0?!0:(e.toast("No cards match. Pick another group."),!1)},read:(n,p)=>p==="ok"?{filter:e.$('input[name="pf"]:checked',n).value,tag:e.$("#pf-tag",n)?e.$("#pf-tag",n).value:"",limit:e.$("#pf-limit",n).value}:null}).then(n=>{if(!n)return;const p=new URLSearchParams({mode:m?"quiz":"practice",filter:n.filter,limit:n.limit});n.tag&&p.set("tag",n.tag),u.go("#/study/"+encodeURIComponent(s||"all")+"?"+p.toString())})};function T(s,o){const a=b.db,t=D(o.params[0]);if(!t)return S(s);const i=Date.now(),m=l.studyCounts(a,t.id,i),r=l.stats(a,t.id,i),$=l.deckPath(a.decks,t.id).split(" \u203A ").slice(0,-1).join(" \u203A "),v=l.examDateFor(a.decks,t.id),n=v?l.daysBetween(i,v):-1,p=a.decks.filter(h=>h.parentId===t.id).sort((h,x)=>h.name.localeCompare(x.name)),f=r.total?(r.counts.young+r.counts.mature)/r.total:null,d=h=>encodeURIComponent(h),k=r.total?e.strength(l.deckStrength(a,t.id,i),{big:!0}):"";s.innerHTML=`
      <div class="row"><a class="btn plain small" href="#/">${e.icon("back","sm")} Home</a></div>
      <div class="deck-head">
        <span class="deck-emoji" aria-hidden="true">${c(t.emoji)}</span>
        <div class="grow">
          ${$?`<div class="crumbs">${c($)} \u203A</div>`:""}
          <h1>${c(t.name)}</h1>
          ${k?`<div class="deck-strength">${k}</div>`:""}
        </div>
        <a class="icon-btn" href="#/deck/${d(t.id)}/settings" title="Deck settings" aria-label="Deck settings">${e.icon("gear")}</a>
        <button class="icon-btn" type="button" id="deckMore" title="Share, export or print" aria-label="More: share, export or print" aria-haspopup="dialog">${e.icon("more")}</button>
      </div>
      ${t.description?`<p class="muted">${c(t.description)}</p>`:""}
      ${n>=0?`<div class="notice"><span aria-hidden="true">\u{1F4C5}</span><div class="grow"><b>${c(n===0?"Exam today. Good luck!":n===1?"Exam tomorrow":"Exam in "+n+" days")}</b>
        <span class="muted">(${c(e.date(v))})</span>${e.examPlan(a,t.id,i)||'<br><span class="small">Every card in this deck comes up at least once before then.</span>'}</div></div>`:""}

      <section class="panel">
        ${r.total?`
          <div class="row between wrap">${e.counts(m)}${e.countsLegend()}</div>
          <div style="margin-top:12px">
          ${m.total?u.studyButton(t.id,"Study ("+e.plural(m.total,"card")+")",i):`<p class="center"><b class="done" style="font-size:18px">All done for today \u2713</b><br><span class="muted small">${c(u.nextDueText(t.id,i))}</span></p>`}
          </div>
          <div class="row wrap" style="margin-top:10px">
            <button class="btn ghost grow" type="button" id="practice">Practice</button>
            <button class="btn ghost grow" type="button" id="quiz">Quiz</button>
            <a class="btn ghost grow" href="#/exam/${d(t.id)}" id="examSim">Exam simulation</a>
          </div>
          <p class="help center">Practice, Quiz and Exam simulation never change when cards are due.</p>`:`
          <div class="empty"><div class="big">\u{1F5C2}\uFE0F</div><p><b>This deck has no cards yet.</b></p>
          <p class="muted small">Add your first card, or import a list you already have.</p>
          <div class="actions" style="justify-content:center">
            <a class="btn" href="#/add?deck=${d(t.id)}">Add cards</a><a class="btn ghost" href="#/import?deck=${d(t.id)}">Import</a></div></div>`}
      </section>

      ${r.total?`<section class="panel mini-stats" aria-label="Deck stats">
        <div><b>${r.total}</b><span>cards</span></div>
        <div><b>${e.pct(f)}</b><span>known</span></div>
        <div><b>${e.pct(r.averageRecall)}</b><span>average recall</span></div>
      </section>`:""}

      <div class="actions">
        <a class="btn ghost" href="#/add?deck=${d(t.id)}">${e.icon("plus","sm")} Add cards</a>
        <a class="btn ghost" href="#/browse?deck=${d(t.id)}">Browse this deck</a>
        <a class="btn ghost" href="#/stats?deck=${d(t.id)}">Progress</a>
        <a class="btn plain" href="#/deck/${d(t.id)}/settings">Deck settings</a>
      </div>

      <h2>Subdecks</h2>
      ${p.length?`<section class="panel decks">${p.map(h=>{const x=l.studyCounts(a,h.id,i),y=e.strength(l.deckStrength(a,h.id,i));return`<div class="deck-row"><span class="spacer flat"></span><a class="deck-link" href="#/deck/${d(h.id)}">
          <span class="deck-emoji" aria-hidden="true">${c(h.emoji)}</span><span class="grow"><span class="deck-name">${c(h.name)}</span>${y?`<br><span class="deck-sub">${y}</span>`:""}</span></a>
          ${x.total?e.counts(x):'<span class="done">Done \u2713</span>'}</div>`}).join("")}</section>`:'<p class="muted small">Split a big deck into parts, like chapters. Studying this deck includes its subdecks.</p>'}
      <button class="btn ghost small" type="button" id="addSub">${e.icon("plus","sm")} Add a subdeck</button>`;const j=e.$("#practice",s);j&&(j.onclick=()=>u.practiceDialog(t.id,"practice"),e.$("#quiz",s).onclick=()=>u.practiceDialog(t.id,"quiz")),e.$("#addSub",s).onclick=()=>u.newDeckDialog(t.id),e.$("#deckMore",s).onclick=h=>u.deckMenu(h.currentTarget,t.id);const w=e.$("[data-timebox]",s);w&&(w.onclick=()=>u.timeBoxMenu(w,t.id))}function M(s){const o=b.db.decks,a=o.find(r=>r.id===s),t=Date.now(),i=r=>l.daysBetween(t,r)<0;if(a.examDate){if(!i(a.examDate))return"";const r=a.parentId?l.examDateFor(o,a.parentId):0;return`<div class="notice warn small"><span aria-hidden="true">\u{1F4C5}</span><div class="grow">This exam was on ${c(e.date(a.examDate))}.
        Clear it, or set the date of the next one.${r&&!i(r)?` While it's set, the parent deck's exam on ${c(e.date(r))} isn't used for this deck.`:""}</div></div>`}const m=l.examDateFor(o,a.id);return m?`<p class="help">Uses the exam date of a parent deck: ${c(e.date(m))}${i(m)?" (already passed)":""}.</p>`:""}function z(s,o){const a=D(o.params[0]);if(!a)return S(s);const t=b.db,i=encodeURIComponent(a.id),m=l.deckDescendants(t.decks,a.id);s.innerHTML=`
      <div class="row"><a class="btn plain small" href="#/deck/${i}">${e.icon("back","sm")} <span class="ellipsis">${c(a.name)}</span></a></div>
      <h1>Deck settings</h1>
      <p class="muted small" id="saved" aria-live="polite">Changes are saved automatically.</p>

      <section class="panel">
        <h2>Basics</h2>
        <label for="ds-name">Name</label>
        <input type="text" id="ds-name" value="${c(a.name)}" maxlength="80">
        <label for="ds-emoji">Emoji</label>
        <input type="text" id="ds-emoji" value="${c(a.emoji)}" maxlength="8" style="width:90px">
        ${C(a.emoji)}
        <label for="ds-parent">Inside another deck</label>
        <select id="ds-parent">${e.deckOptions({selected:a.parentId,exclude:m,none:"No, it's a main deck"})}</select>
        <label for="ds-desc">Description</label>
        <textarea id="ds-desc" rows="2" placeholder="What's in this deck? (optional)">${c(a.description)}</textarea>
      </section>

      <section class="panel">
        <h2>Exam date</h2>
        <p class="small muted">Ikna makes sure every card in this deck comes up at least once before this date.
        Subdecks use it too, unless they have their own.</p>
        <div class="row wrap">
          <input type="date" id="ds-exam" value="${e.dateInputValue(a.examDate)}" min="${e.today()}" style="max-width:220px">
          <button class="btn plain" type="button" id="ds-exam-clear"${a.examDate?"":" hidden"}>Clear</button>
        </div>
        <div id="ds-exam-notes">${M(a.id)}</div>
      </section>

      <section class="panel">
        <h2>Studying</h2>
        <label for="ds-new">New cards per day</label>
        <input type="number" id="ds-new" min="0" max="9999" inputmode="numeric" value="${a.newPerDay==null?"":c(a.newPerDay)}"
          placeholder="Same as in Settings (${t.settings.newPerDay})" style="max-width:280px">
        <p class="help">Leave empty to use the setting for all decks.</p>
        <label for="ds-lang">Read aloud in</label>
        <select id="ds-lang" style="max-width:280px">${l.LANGUAGES.map(d=>`<option value="${c(d.code)}"${d.code===a.lang?" selected":""}>${c(d.code?d.name:"Don't read aloud")}</option>`).join("")}</select>
        <p class="help">Adds a \u{1F50A} button to cards in this deck.${e.canSpeak?"":" Your browser can't read aloud, though."}</p>
      </section>

      <section class="panel">
        <h2>More</h2>
        <div class="actions">
          <button class="btn ghost" type="button" id="ds-csv">Export as CSV</button>
          <button class="btn ghost" type="button" id="ds-sub">${e.icon("plus","sm")} Add a subdeck</button>
          <button class="btn danger" type="button" id="ds-delete">Delete deck</button>
        </div>
      </section>`;const r=e.$("#saved",s),g=d=>{b.set(l.updateDeck(b.db,a.id,d)),r.textContent="Saved \u2713"},$=e.$("#ds-name",s);$.onchange=()=>{$.value.trim()?g({name:$.value}):$.value=D(a.id).name};const v=e.$("#ds-emoji",s);E(e.$(".emoji-grid",s),v,d=>g({emoji:d})),v.onchange=()=>g({emoji:v.value.trim()||"\u{1F4D8}"}),e.$("#ds-parent",s).onchange=d=>g({parentId:d.target.value||null}),e.$("#ds-desc",s).onchange=d=>g({description:d.target.value.trim()});const n=e.$("#ds-exam",s),p=e.$("#ds-exam-clear",s),f=d=>{g({examDate:d}),p.hidden=!d,e.$("#ds-exam-notes",s).innerHTML=M(a.id)};n.onchange=()=>f(e.parseDateInput(n.value)),p.onclick=()=>{n.value="",f(0)},e.$("#ds-new",s).onchange=d=>{const k=d.target.value.trim();g({newPerDay:k===""?null:Math.max(0,Math.round(+k)||0)})},e.$("#ds-lang",s).onchange=d=>g({lang:d.target.value}),e.$("#ds-csv",s).onclick=()=>u.data.downloadCSV(a.id),e.$("#ds-sub",s).onclick=()=>u.newDeckDialog(a.id),e.$("#ds-delete",s).onclick=async()=>{const d=b.db,k=new Set(l.deckDescendants(d.decks,a.id)),j=new Set(d.notes.filter(y=>k.has(y.deckId)).map(y=>y.id)),w=d.cards.filter(y=>j.has(y.noteId)).length,h=k.size-1;await e.confirm("Delete \u201C"+a.name+"\u201D?","This deletes "+e.plural(w,"card")+(h?" and "+e.plural(h,"subdeck"):"")+". It can't be undone.",{ok:"Delete deck",danger:!0})&&(b.set(l.deleteDeck(b.db,a.id)),e.toast("Deck deleted."),u.go("#/"))}}u.screens.deck={tab:"home",title:s=>{const o=D(s.params[0]);return o?o.name:"Deck"},render:T},u.screens.deckSettings={tab:"home",title:()=>"Deck settings",render:z}})(window.Ikna);
