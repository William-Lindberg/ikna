(function(a){"use strict";const h=a.C,t=a.ui,o=a.store,i=t.esc,u=(e,l)=>o.set(h.updateSettings(o.db,{[e]:l}));function y(e){return"Ikna will aim for you to remember "+Math.round(e*100)+"% of cards when they come up. "+(e>=.93?"That's high: expect a lot more reviews.":e<=.8?"That's low: fewer reviews, but you'll forget more.":"Higher means more reviews.")}function x(e){const n=e.trim().split(/[\s,]+/).filter(Boolean).map(Number);return n.every(p=>isFinite(p)&&p>0&&p<=10080)?n:null}const T=e=>new Date(2e3,0,1,e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});function E(e,l){const n=o.db.settings;e.innerHTML=`
      <div class="row between wrap"><h1>Settings</h1><a class="small" href="#/help">Help &amp; guide</a></div>

      <section class="panel">
        <h2>Daily limits</h2>
        <label class="setting"><span>New cards per day<br><span class="help">For all decks together. A deck can have its own limit.</span></span>
          <input type="number" id="s-new" min="0" max="9999" inputmode="numeric" value="${n.newPerDay}"></label>
        <label class="setting"><span>Most reviews per day<br><span class="help">Extra reviews wait until tomorrow.</span></span>
          <input type="number" id="s-rev" min="0" max="99999" inputmode="numeric" value="${n.maxReviews}"></label>
      </section>

      <section class="panel">
        <h2>Memory target</h2>
        <div class="row"><input type="range" id="s-ret" min="75" max="97" step="1" value="${Math.round(n.retention*100)}" aria-describedby="s-ret-text" class="grow">
          <b id="s-ret-val" style="width:48px;text-align:right">${Math.round(n.retention*100)}%</b></div>
        <p class="small" id="s-ret-text">${i(y(n.retention))}</p>
      </section>

      <section class="panel">
        <h2>Studying</h2>
        <label class="setting"><span>Show the time under the answer buttons<br><span class="help">e.g. \u201C3 days\u201D under Got it.</span></span>
          <input type="checkbox" id="s-int"${n.showIntervals?" checked":""}></label>
        <label class="setting"><span>Read cards aloud automatically<br><span class="help">Only for decks with a read-aloud language (in Deck settings).</span></span>
          <input type="checkbox" id="s-speak"${n.autoSpeak?" checked":""}></label>
        <label class="setting"><span>Don't show related cards on the same day<br><span class="help">e.g. the two sides of a \u201CBoth ways\u201D card, or blanks from one sentence.</span></span>
          <input type="checkbox" id="s-bury"${n.burySiblings?" checked":""}></label>
        <label class="setting"><span>Next day starts at<br><span class="help">So late-night study still counts for today.</span></span>
          <select id="s-day">${Array.from({length:24},(s,r)=>`<option value="${r}"${r===n.dayStartHour?" selected":""}>${i(T(r))}</option>`).join("")}</select></label>
        <label class="setting"><span>Speed up new cards when an exam is coming<br><span class="help">Shows more new cards a day when needed to see a whole deck before its exam date.</span></span>
          <input type="checkbox" id="s-boost"${n.examBoost!==!1?" checked":""}></label>
        <label class="setting"><span>Show card tips<br><span class="help">Gentle hints under the fields while you write a card, like \u201Cthis answer is a long list\u201D.</span></span>
          <input type="checkbox" id="s-tips"${n.showTips!==!1?" checked":""}></label>
        <label class="setting"><span>Trouble card after<br><span class="help">Times forgotten before Ikna suggests rewriting a card.</span></span>
          <input type="number" id="s-leech" min="2" max="99" inputmode="numeric" value="${n.leechThreshold}"></label>
      </section>

      ${A()}

      ${a.sync.panel()}

      ${a.ai.settingsPanel()}

      <section class="panel">
        <h2>Look</h2>
        <div class="setting"><span id="theme-label">Theme</span>
          <div class="seg" role="group" aria-labelledby="theme-label">${[["system","System"],["light","Light"],["dark","Dark"]].map(([s,r])=>`<button type="button" data-theme-opt="${s}" aria-pressed="${n.theme===s}">${r}</button>`).join("")}</div></div>
      </section>

      <section class="panel">
        <details>
          <summary>Advanced</summary>
          <p class="small muted">Waiting times, in minutes, before a new card (learning) or a forgotten card (relearning) comes back.
          Separate them with spaces.</p>
          <label for="s-learn">Learning steps</label>
          <input type="text" id="s-learn" value="${i(n.learnSteps.join(" "))}" inputmode="decimal" style="max-width:240px">
          <p class="field-error" id="s-learn-err" hidden>Use numbers of minutes, like \u201C1 10\u201D.</p>
          <label for="s-relearn">Relearning steps</label>
          <input type="text" id="s-relearn" value="${i(n.relearnSteps.join(" "))}" inputmode="decimal" style="max-width:240px">
          <p class="field-error" id="s-relearn-err" hidden>Use numbers of minutes, like \u201C10\u201D.</p>
        </details>
      </section>

      <section class="panel">
        <h2>Your data</h2>
        <p class="small muted">Your cards are kept in this browser${o.usingFallback?" (in a small storage area, so back up often)":""}${a.sync.user()?" and synced with your account":""}. No tracking.</p>
        <div class="actions">
          <button class="btn" type="button" id="d-backup">Back up</button>
          <button class="btn ghost" type="button" id="d-restore">Restore</button>
          <button class="btn ghost" type="button" id="d-csv">Export CSV</button>
          <a class="btn ghost" href="#/import">Import</a>
          <button class="btn ghost" type="button" id="d-samples">Add sample decks</button>
          <button class="btn danger" type="button" id="d-erase">Erase everything</button>
        </div>
        ${k()}
      </section>

      <section class="panel">
        <h2>About Ikna</h2>
        <p>Version ${i(a.VERSION)}</p>
        <p class="small">Free to use for personal and non-commercial learning. Not open source.</p>
        <p class="small"><a href="${i(a.REPO_URL)}" target="_blank" rel="noopener noreferrer">Ikna on GitHub</a> \xB7
        <a href="${i(a.REPO_URL)}/releases/latest" target="_blank" rel="noopener noreferrer">Android app</a> \xB7
        <a href="#/help">Help &amp; guide</a> \xB7
        <a href="privacy.html" target="_blank" rel="noopener">Privacy</a></p>
        <p class="help">Uses open-source libraries; see <a href="vendor/LICENSES.md" target="_blank" rel="noopener">their licences</a>.</p>
      </section>`;const p=(s,r,d,g)=>{const c=t.$(s,e);c.onchange=()=>{const $=Math.round(+c.value);if(!isFinite($)||c.value===""){c.value=o.db.settings[r];return}const S=Math.min(g,Math.max(d,$));c.value=S,u(r,S),t.toast("Saved")}};p("#s-new","newPerDay",0,9999),p("#s-rev","maxReviews",0,99999),p("#s-leech","leechThreshold",2,99);const b=t.$("#s-ret",e);b.oninput=()=>{const s=+b.value/100;t.$("#s-ret-val",e).textContent=b.value+"%",t.$("#s-ret-text",e).textContent=y(s)},b.onchange=()=>u("retention",+b.value/100);const m=(s,r)=>{t.$(s,e).onchange=d=>u(r,d.target.checked)};m("#s-int","showIntervals"),m("#s-speak","autoSpeak"),m("#s-bury","burySiblings"),m("#s-boost","examBoost"),m("#s-tips","showTips");const w=t.$("#s-cb-stop",e);w&&(w.onclick=()=>{o.set(h.stopComeback(o.db)),t.toast("Stopped catching up. All waiting cards are back."),a.refresh()}),t.$("#s-day",e).onchange=s=>u("dayStartHour",+s.target.value),t.$$("[data-theme-opt]",e).forEach(s=>{s.onclick=()=>{u("theme",s.dataset.themeOpt),a.applyTheme(s.dataset.themeOpt),t.$$("[data-theme-opt]",e).forEach(r=>r.setAttribute("aria-pressed",String(r===s)))}});const f=(s,r)=>{const d=t.$(s,e),g=t.$(s+"-err",e);d.onchange=()=>{const c=x(d.value);g.hidden=!!c,d.classList.toggle("invalid",!c),c&&(u(r,c),d.value=c.join(" "),t.toast("Saved"))}};f("#s-learn","learnSteps"),f("#s-relearn","relearnSteps"),t.$("#d-backup",e).onclick=()=>a.data.downloadBackup().then(()=>{const s=t.$("#last-backup",e);s&&(s.outerHTML=k())}),t.$("#d-restore",e).onclick=async()=>{const s=await t.pickFile(".json,application/json");s&&await a.data.restoreFile(s)&&(a.applyTheme(o.db.settings.theme),a.go("#/"))},t.$("#d-csv",e).onclick=()=>a.data.downloadCSV(null),t.$("#d-samples",e).onclick=L,t.$("#d-erase",e).onclick=M,a.sync.wirePanel(e),a.ai.wireSettings(e);const v=l&&l.query.section&&document.getElementById(l.query.section);v&&setTimeout(()=>v.scrollIntoView({block:"start"}),0)}function A(){const e=h.comebackStatus(o.db,Date.now());return e?`<section class="panel">
        <h2>Catching up</h2>
        <p class="small">Ikna is spreading your waiting cards over the next ${t.plural(e.daysLeft,"day")}: up to ${e.perDay} reviews a day.
          It stops by itself on ${i(t.date(e.until-h.DAY))}.</p>
        <button class="btn ghost" type="button" id="s-cb-stop">Stop catching up</button>
      </section>`:""}function k(){const e=t.pref.get("lastBackup",0);return`<p class="help" id="last-backup">${e?"Last backup from this browser: "+i(t.date(e))+".":"You haven't made a backup from this browser yet."}</p>`}function L(){const e=new Set(o.db.decks.map(l=>l.name));t.dialog({title:"Add sample decks",body:`<div class="samples" style="grid-template-columns:1fr">${h.SAMPLES.map(l=>`
        <label class="sample"><input type="checkbox" value="${i(l.id)}">
          <span class="emoji" aria-hidden="true">${i(l.emoji)}</span>
          <span class="grow"><b>${i(l.name)}</b>${e.has(l.name)?' <span class="pill">already added</span>':""}<br><span class="muted small">${i(l.desc)}</span></span></label>`).join("")}</div>`,actions:[{label:"Cancel",value:"",kind:"plain"},{label:"Add",value:"ok"}],read:(l,n)=>n==="ok"?t.$$("input:checked",l).map(p=>p.value):[]}).then(l=>{l.length&&a.addSamples(l)})}async function M(){const e=o.db;!await t.confirm("Erase everything?","This deletes all "+t.plural(e.decks.length,"deck")+", "+t.plural(e.cards.length,"card")+", your progress and images from this browser. Make a backup first if you might want them back."+(a.sync.user()?" You're signed in, so your cards come back from your account at the next sync. To clear this device for good, sign out and choose \u201CRemove them\u201D.":""),{ok:"Continue",danger:!0})||!await t.confirm("Are you sure?","This can't be undone.",{ok:"Erase everything",danger:!0})||(await o.eraseAll(),a.applyTheme(o.db.settings.theme),t.toast("Everything was erased."),a.go("#/"))}a.screens.settings={tab:"settings",title:()=>"Settings",render:E}})(window.Ikna);
