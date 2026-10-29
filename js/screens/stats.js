(function(c){"use strict";const b=c.C,t=c.ui,$=c.store,d=t.esc,m=[["new","New","Not studied yet."],["learning","Learning","Just started."],["young","Young","Remembered for less than 3 weeks."],["mature","Mature","Remembered for 3 weeks or more."],["suspended","Suspended","Set aside; they don't come up."]],v=e=>{const a=e.split("-");return new Date(+a[0],+a[1]-1,+a[2])};function y(e,a){const n=$.db,s=n.decks.some(u=>u.id===a.query.deck)?a.query.deck:"",o=Date.now(),l=b.stats(n,s||null,o);l.answers=t.todayAnswers(n,s||null,o);const i=n.settings.retention;e.innerHTML=`
      <div class="row between wrap">
        <h1>Progress</h1>
        <select id="st-deck" aria-label="Deck" style="max-width:280px">${t.deckOptions({none:"All decks",selected:s})}</select>
      </div>
      ${!l.total&&!l.totalReviews?`<div class="panel empty"><div class="big">\u{1F4C8}</div><p><b>Nothing to show yet.</b></p>
        <p class="muted small">Study a few cards and your progress appears here.</p><a class="btn" href="#/">Go to your decks</a></div>`:g(l,i,o)}`,t.$("#st-deck",e).onchange=u=>{c.replace("#/stats"+(u.target.value?"?deck="+encodeURIComponent(u.target.value):"")),c.refresh()},t.$$(".bars, .heat",e).forEach(u=>t.attachTips(u));const p=t.$(".trouble-list",e);p&&p.addEventListener("click",u=>{const h=u.target.closest("[data-fix]");h&&c.ai.fix(h.dataset.fix).then(r=>{r&&c.refresh()})})}function g(e,a,n){const s=e.answers,o=s.reviews?Math.round(s.correct/s.reviews*100)+"%":"\u2013";return`
      <h2>Today</h2>
      <div class="tiles">
        <div class="tile"><b>${s.reviews}</b><span>${s.reviews===1?"answer":"answers"}</span></div>
        <div class="tile"><b>${e.today.minutes}</b><span>minutes</span></div>
        <div class="tile"><b>${o}</b><span>correct</span></div>
        <div class="tile"><b>${e.streak?"\u{1F525} "+e.streak:"0"}</b><span>${e.streak===1?"day":"days"} in a row</span></div>
      </div>
      ${s.practice?`<p class="muted small">Plus ${t.plural(s.practice,"practice or quiz answer")} (they don't change when cards are due).</p>`:""}
      <p class="muted small">All time: ${t.plural(e.totalReviews,"answer")} in ${d(t.minutes(e.totalMinutes))}, on ${t.plural(e.daysStudied,"day")}.</p>

      <section class="panel">
        <h2>How well you remember</h2>
        ${w(e.retention30,a)}
        ${e.averageRecall!=null?`<p>Right now you'd remember about <b>${t.pct(e.averageRecall)}</b> of the cards you've studied.</p>`:""}
      </section>

      <section class="panel">
        <h2>Your cards</h2>
        ${f(e)}
      </section>

      <section class="panel">
        <h2>Coming up</h2>
        ${k(e.forecast,n)}
      </section>

      <section class="panel">
        <h2>Study calendar</h2>
        ${x(e.heat)}
      </section>

      <section class="panel">
        <h2>Trouble cards</h2>
        ${T(e.trouble)}
      </section>`}function w(e,a){if(e==null)return`<p>Once you review cards from earlier days, you'll see here how much you remember.
        Your target is <b>${t.pct(a)}</b> (change it in <a href="#/settings">Settings</a>).</p>`;const n=e-a,s=n<-.05?"That's below your target. Short daily sessions help most, and so does rewriting cards you keep forgetting.":n>.04?"You're doing better than your target. Nice work!":"That's right on target.";return`<p>In the last 30 days you remembered <b>${t.pct(e)}</b> of your reviews. Your target is <b>${t.pct(a)}</b>.</p>
      <p class="muted small">${d(s)}</p>`}function f(e){const a=e.total||1,n=m.filter(([s])=>e.counts[s]).map(([s,o])=>`<div class="k-${s}" style="flex:${e.counts[s]}" title="${d(o)}: ${e.counts[s]}"></div>`).join("");return`<div class="statebar" role="img" aria-label="${m.map(([s,o])=>o+" "+e.counts[s]).join(", ")}">${n}</div>
      <div class="legend">${m.map(([s,o,l])=>`<div><i class="k-${s}"></i>
        <span><b>${e.counts[s]}</b> ${d(o)} <span class="muted">(${Math.round(e.counts[s]/a*100)}%)</span></span>
        <span class="muted">${d(l)}</span></div>`).join("")}</div>
      <p class="muted small">${t.plural(e.total,"card")} from ${t.plural(e.notes,"note")}.</p>`}function k(e,a){const n=Math.max(1,...e),s=e.slice(0,7).reduce((i,p)=>i+p,0),o=e.reduce((i,p)=>i+p,0),l=i=>i===0?"Today":i===1?"Tomorrow":t.date(b.addDays(a,i)).replace(/,? \d{4}$/,"");return`<p class="small">Cards due in the next 7 days: <b>${s}</b>. Next 30 days: <b>${o}</b>.</p>
      <div class="bars" role="img" aria-label="Cards due each day for the next 30 days">${e.map((i,p)=>`<div class="col" data-tip="${d(l(p)+": "+t.plural(i,"card"))}"><div class="bar" style="height:${i?Math.max(2,i/n*100):0}%"></div></div>`).join("")}</div>
      <div class="bars-axis"><span>Today</span><span>in 2 weeks</span><span>in 30 days</span></div>`}function x(e){const a=window.innerWidth<760,n=e.slice(a?-182:0),s=Math.max(1,...n.map(r=>r.reviews)),l=(v(n[0].day).getDay()+6)%7,i=n.filter(r=>r.reviews).length,p=r=>r?Math.min(4,Math.ceil(r/s*4)):0,u="<div class='pad'></div>".repeat(l)+n.map(r=>{const M=t.date(v(r.day).getTime())+": "+(r.reviews?t.plural(r.reviews,"answer"):"no study");return`<div class="h${p(r.reviews)}" data-tip="${d(M)}"></div>`}).join(""),h=Math.ceil((l+n.length)/7);return`<p class="small">You studied on <b>${t.plural(i,"day")}</b> in the last ${a?"26 weeks":"year"}.</p>
      <div class="heat" style="grid-auto-columns:minmax(0,1fr);grid-template-columns:repeat(${h},minmax(0,1fr))" role="img"
        aria-label="Study calendar: studied on ${i} days">${u}</div>
      <div class="heat-scale"><span>Less</span>${[0,1,2,3,4].map(r=>`<i style="background:var(--heat-${r})"></i>`).join("")}<span>More</span></div>`}function T(e){const a=c.ai.hasKey();return e.length?`<p class="small">These keep slipping away. Try rewriting them, splitting them into smaller cards, or adding an example.</p>
      <div class="trouble-list">${e.map(({card:n,note:s})=>s?`<div class="trouble-item"><a class="trouble-row" href="#/edit/${encodeURIComponent(s.id)}">
        <span class="grow ellipsis">${d(c.rich.oneLine(s.front)||"(image)")}</span>
        <span class="pill bad">forgotten ${d(n.lapses)}\xD7</span></a>${a&&s.type!=="occlusion"?`<button class="icon-btn ai-fix" type="button" data-fix="${d(s.id)}"
          title="Suggest a better version" aria-label="Suggest a better version of this card">\u2728</button>`:""}</div>`:"").join("")}</div>`:'<p class="muted">No trouble cards. Cards you forget again and again show up here.</p>'}c.screens.stats={tab:"stats",title:()=>"Progress",render:y}})(window.Ikna);
