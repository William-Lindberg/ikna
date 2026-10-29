(function(c){"use strict";const h=c.C,e=c.ui,f=c.store,p=e.esc,L=[["auto","Automatic"],["basic","Basic"],["reverse","Both ways"],["type","Type the answer"],["cloze","Fill in the blank"]],$=8;let l=null,m={rows:[],sep:","},w=0,r=null;function C(t,o){l=t;const n=f.db,i=n.decks.some(s=>s.id===o.query.deck)?o.query.deck:"";t.innerHTML=`
      <h1>Import &amp; export</h1>
      <section class="panel" id="decks-in">
        <h2>Anki and shared decks</h2>
        <p class="small">Bring in a whole deck: cards, pictures and sounds, and from Anki also your progress.</p>
        <div class="actions">
          <button class="btn" type="button" id="im-anki">Anki deck (.apkg)</button>
          <button class="btn ghost" type="button" id="im-shared">Open shared deck (.ikna)</button>
        </div>
        <div id="anki" aria-live="polite"></div>
      </section>

      <section class="panel">
        <h2>Import a list</h2>
        <p class="small">Paste a list or choose a file. Each line becomes a card: the front, then the back.
        A third column becomes notes, a fourth becomes tags.</p>
        <div class="dropzone" id="im-drop">
          <button class="btn ghost" type="button" id="im-file">Choose a file</button>
          <span class="small"> or drop a .csv, .tsv or .txt file here</span>
          <div class="small" id="im-filename"></div>
        </div>
        <label for="im-text">Or paste here</label>
        <textarea id="im-text" class="mono" rows="6" placeholder="mitochondria&#9;the cell's power plant&#10;Capital of Peru = Lima&#10;The {{heart}} pumps blood."></textarea>

        <div class="grid2">
          <div>
            <label for="im-sep">Columns are separated by</label>
            <select id="im-sep">${h.SEPARATORS.map(s=>`<option value="${p(s.id)}">${p(s.name)}</option>`).join("")}</select>
          </div>
          <div>
            <label for="im-type">Card type</label>
            <select id="im-type">${L.map(([s,d])=>`<option value="${s}">${p(d)}</option>`).join("")}</select>
            <p class="help">Automatic: Fill in the blank for lines with {{\u2026}}, Basic for the rest.</p>
          </div>
          <div>
            <label for="im-deck">Into deck</label>
            <select id="im-deck">${e.deckOptions({selected:i})}<option value="__new"${n.decks.length?"":" selected"}>\uFF0B A new deck</option></select>
            <div id="im-newdeck"${n.decks.length?" hidden":""}>
              <label for="im-deckname">New deck name</label>
              <input type="text" id="im-deckname" placeholder="e.g. Biology chapter 3" maxlength="80">
            </div>
          </div>
          <div>
            <label for="im-tags">Add tags (optional)</label>
            <input type="text" id="im-tags" placeholder="e.g. imported exam" autocomplete="off">
          </div>
        </div>

        <h3>Preview</h3>
        <div id="im-preview"><p class="muted small">Paste text or choose a file to see what will be imported.</p></div>
        <div class="save-bar"><button class="btn" type="button" id="im-go" disabled>Import</button></div>
      </section>

      <section class="panel">
        <h2>Bringing cards from other apps</h2>
        <h3>Anki</h3>
        <p class="small">In Anki, choose <b>File \u2192 Export</b>, pick <b>Anki Deck Package (.apkg)</b> (tick \u201CInclude scheduling information\u201D to keep
        your progress) and export. Then choose <b>Anki deck (.apkg)</b> above. A whole collection (.colpkg) works too.
        Fill-in-the-blank cards ({{c1::\u2026}}) stay fill in the blank.</p>
        <h3>Quizlet</h3>
        <p class="small">Open your set, choose <b>\u22EF \u2192 Export</b>. Keep <b>Tab</b> between term and definition and <b>New line</b> between rows.
        Copy the text and paste it above.</p>
        <h3>Excel, Numbers or Google Sheets</h3>
        <p class="small">Put the fronts in one column and the backs in the next. Select both columns, copy, and paste above.
        Or save the sheet as CSV and choose the file.</p>
      </section>

      <section class="panel">
        <h2>Export</h2>
        <p class="small">A <b>backup</b> keeps everything (cards, progress, images and settings). It also opens in the Ikna Android app.</p>
        <div class="actions">
          <button class="btn" type="button" id="ex-backup">Download backup</button>
          <button class="btn ghost" type="button" id="ex-restore">Restore a backup</button>
        </div>
        <p class="small">A <b>CSV file</b> opens in Excel or Google Sheets (text only, no progress).</p>
        <div class="row wrap">
          <select id="ex-deck" style="max-width:320px">${e.deckOptions({none:"All decks",selected:i})}</select>
          <button class="btn ghost" type="button" id="ex-csv">Export CSV</button>
        </div>
      </section>`;const a=e.$("#im-text",t);a.addEventListener("input",()=>{e.$("#im-filename",t).textContent="",j()}),["#im-sep","#im-type"].forEach(s=>{e.$(s,t).onchange=y}),e.$("#im-deck",t).onchange=s=>{e.$("#im-newdeck",t).hidden=s.target.value!=="__new",s.target.value==="__new"&&e.$("#im-deckname",t).focus()},e.$("#im-file",t).onclick=async()=>{const s=await e.pickFile(".csv,.tsv,.txt,.json,.apkg,.colpkg,.ikna,text/plain,text/csv");s&&T(s)},e.$("#im-anki",t).onclick=async()=>{const s=await e.pickFile(".apkg,.colpkg");s&&S(s)},e.$("#im-shared",t).onclick=async()=>{const s=await e.pickFile(".ikna,application/json");s&&A(s)},r&&r.job&&!r.busy&&g();const b=e.$("#im-drop",t);[b,a].forEach(s=>{s.addEventListener("dragover",d=>{!d.dataTransfer||Array.from(d.dataTransfer.types).indexOf("Files")<0||(d.preventDefault(),b.classList.add("drop"))}),s.addEventListener("dragleave",()=>b.classList.remove("drop")),s.addEventListener("drop",d=>{b.classList.remove("drop");const u=d.dataTransfer&&d.dataTransfer.files[0];u&&(d.preventDefault(),T(u))})}),e.$("#im-go",t).onclick=I,e.$("#ex-backup",t).onclick=()=>c.data.downloadBackup(),e.$("#ex-restore",t).onclick=async()=>{const s=await e.pickFile(".json,application/json");s&&await c.data.restoreFile(s)&&c.go("#/")},e.$("#ex-csv",t).onclick=()=>c.data.downloadCSV(e.$("#ex-deck",t).value||null)}async function A(t){const o=await c.openSharedDeck(t);o&&c.go("#/deck/"+encodeURIComponent(o))}async function T(t){if(/\.(apkg|colpkg)$/i.test(t.name)){S(t);return}if(/\.ikna$/i.test(t.name)){A(t);return}if(/\.json$/i.test(t.name)||t.type==="application/json"){await c.data.restoreFile(t)&&c.go("#/");return}if(t.size>20*1024*1024){e.toast("That file is too big (over 20 MB).");return}let o="";try{o=await e.readText(t)}catch{e.toast("Couldn't read that file.");return}l&&(e.$("#im-text",l).value=o,e.$("#im-filename",l).textContent="Loaded \u201C"+t.name+"\u201D.",/\.tsv$/i.test(t.name)&&(e.$("#im-sep",l).value="	"),e.$("#im-deckname",l).value||(e.$("#im-deckname",l).value=t.name.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ")),y())}function j(){clearTimeout(w),w=setTimeout(y,200)}function E(t,o){return t.reduce((n,i)=>{const a=o==="auto"?/\{\{[^}]*\S[^}]*\}\}/.test(i.front)?"cloze":"basic":o;return n+h.cardOrds({type:a,front:i.front}).length},0)}function y(){if(!l)return;const t=e.$("#im-text",l).value,o=e.$("#im-preview",l),n=e.$("#im-go",l);if(!t.trim()){m={rows:[],sep:","},o.innerHTML='<p class="muted small">Paste text or choose a file to see what will be imported.</p>',n.disabled=!0,n.textContent="Import";return}const i=e.$("#im-sep",l).value;m=h.parseImport(t,i);const a=e.$("#im-type",l).value,b=(h.SEPARATORS.find(k=>k.id===m.sep)||{name:JSON.stringify(m.sep)}).name,s=m.rows;if(!s.length){o.innerHTML=`<div class="notice warn small"><div class="grow">No cards found. Each line needs a front and a back
        separated by the same character (tab, comma, \u201C = \u201D\u2026). Try another separator.</div></div>`,n.disabled=!0,n.textContent="Import";return}const d=k=>p(c.rich.oneLine(k)).slice(0,200)||"<span class='muted'>\u2013</span>";o.innerHTML=`
      <p class="small">${e.plural(s.length,"card")} found${i==="auto"?" \xB7 columns separated by: "+p(b):""}.</p>
      <div class="table-wrap"><table class="preview-table">
        <thead><tr><th>Front</th><th>Back</th><th>Notes</th><th>Tags</th></tr></thead>
        <tbody>${s.slice(0,$).map(k=>`<tr><td>${d(k.front)}</td><td>${d(k.back)}</td><td>${d(k.extra)}</td><td>${p(k.tags.join(" "))}</td></tr>`).join("")}</tbody>
      </table></div>
      ${s.length>$?`<p class="help">\u2026and ${s.length-$} more.</p>`:""}`;const u=E(s,a);n.disabled=!1,n.textContent=u===s.length?"Import "+e.plural(u,"card"):"Import "+e.plural(s.length,"note")+" ("+u+" cards)"}function I(){if(!m.rows.length)return;let t=f.db,o=e.$("#im-deck",l).value;if(o==="__new"||!o){const i=e.$("#im-deckname",l).value.trim();if(!i){e.toast("Give the new deck a name."),e.$("#im-deckname",l).focus();return}const a=h.addDeck(t,{name:i});t=a.db,o=a.deck.id}const n=h.importRows(t,m.rows,o,e.$("#im-type",l).value,e.$("#im-tags",l).value);f.set(n.db),m={rows:[],sep:m.sep},e.$("#im-go",l).disabled=!0,e.toast("Imported "+e.plural(n.added,"note")+"."),c.go("#/deck/"+encodeURIComponent(o))}const P={basic:"Basic",reverse:"Both ways",type:"Type the answer",cloze:"Fill in the blank",occlusion:"Hide parts of an image"},v=()=>l&&e.$("#anki",l);function x(t,o){const n=v();if(!n)return;let i=e.$(".anki-progress",n);i||(n.innerHTML=`<div class="anki-progress"><p class="small" data-role="text"></p>
        <div class="meter" role="progressbar" aria-label="Importing" aria-valuemin="0" aria-valuemax="100"><div style="width:0%"></div></div></div>`,i=e.$(".anki-progress",n));const a=Math.round(Math.max(0,Math.min(1,t))*100);e.$('[data-role="text"]',i).textContent=o,e.$(".meter",i).setAttribute("aria-valuenow",String(a)),e.$(".meter > div",i).style.width=a+"%"}async function S(t){if(r&&r.busy)return;if(t.size>1024*1024*1024){e.toast("That file is too big (over 1 GB).");return}r={job:null,busy:!0};const o=l&&e.$("#decks-in",l);o&&o.scrollIntoView({block:"start"});try{r.job=await c.readAnki(t,x),r.busy=!1,g()}catch(n){r=null;const i=v();i&&(i.innerHTML=`<div class="notice bad small"><div class="grow">${p(n&&n.message&&!/^(bad|out of memory|file is not a database)/i.test(n.message)?n.message:"This file couldn't be read. Is it an Anki deck (.apkg or .colpkg)?")}</div></div>`)}}function g(){const t=v();if(!t||!r||!r.job)return;const o=r.job,n=e.$("#ak-parent",t),i={keepProgress:e.$("#ak-keep",t)?e.$("#ak-keep",t).checked:!0,parentId:n&&n.value||null},a=o.preview(i).info;if(!a.notes){t.innerHTML=`<div class="notice warn small"><div class="grow">This Anki file has no cards Ikna can use.${a.skipped?" "+p(e.plural(a.skipped,"note"))+" were empty.":""}</div></div>`,r=null;return}const b=Object.keys(a.types).map(u=>`${p(P[u]||u)} <b>${a.types[u].toLocaleString()}</b>`).join(" \xB7 "),s=a.topNames.slice(0,4).map(p).join(", ")+(a.topNames.length>4?" and "+(a.topNames.length-4)+" more":""),d=[a.images?e.plural(a.images,"picture"):"",a.sounds?e.plural(a.sounds,"sound"):""].filter(Boolean).join(" and ");t.innerHTML=`
      <div class="anki-preview">
        <h3 style="margin-top:12px">${p(o.fileName)}</h3>
        <div class="mini-stats">
          <div><b>${a.cards.toLocaleString()}</b><span>cards</span></div>
          <div><b>${a.decks.toLocaleString()}</b><span>${a.decks===1?"deck":"decks"}</span></div>
          <div><b>${a.withProgress.toLocaleString()}</b><span>with progress</span></div>
        </div>
        <p class="small">${a.decks===1?"Deck":"Decks"}: ${s}</p>
        <p class="small">Card types: ${b}</p>
        ${d?`<p class="small">Also ${p(d)}.</p>`:""}
        ${a.warnings.length?`<div class="notice warn small"><div class="grow">${a.warnings.map(u=>`<p style="margin:0 0 4px">${p(u)}</p>`).join("")}</div></div>`:""}
        <label class="setting"><span>Keep my Anki progress<br><span class="help">Cards stay as well known as they were in Anki. Off: every card starts as new.</span></span>
          <input type="checkbox" id="ak-keep"${i.keepProgress?" checked":""}${a.withProgress?"":" disabled"}></label>
        <label for="ak-parent">Put the decks</label>
        <select id="ak-parent">${e.deckOptions({none:"At the top level",selected:i.parentId})}</select>
        <div class="save-bar">
          <button class="btn" type="button" id="ak-go">Import ${a.cards.toLocaleString()} ${a.cards===1?"card":"cards"}</button>
          <button class="btn plain" type="button" id="ak-cancel">Cancel</button>
        </div>
      </div>`,e.$("#ak-parent",t).onchange=g,e.$("#ak-cancel",t).onclick=()=>{r=null,t.innerHTML=""},e.$("#ak-go",t).onclick=()=>M({keepProgress:e.$("#ak-keep",t).checked,parentId:e.$("#ak-parent",t).value||null})}async function M(t){if(!r||r.busy)return;r.busy=!0;const o=r.job;x(0,"Starting\u2026");let n;try{n=await o.run(t,x)}catch{r.busy=!1,e.toast("Something went wrong while importing. Nothing was added."),g();return}r=null;const i=n.res.report.cards;e.toast("Imported "+i.toLocaleString()+(i===1?" card":" cards")+" from Anki."+(n.full?" Some pictures didn't fit in this browser's storage.":""));const a=v();a&&(a.innerHTML=""),l&&c.go(n.deckId?"#/deck/"+encodeURIComponent(n.deckId):"#/")}c.screens.import={tab:"home",title:()=>"Import & export",render:C,leave(){clearTimeout(w),l=null}}})(window.Ikna);
