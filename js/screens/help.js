(function(t){"use strict";const i=t.ui,s=[["how","How it works"],["buttons","The 4 buttons"],["types","Card types"],["pictures","Hiding parts of a picture"],["quick","Quick adding"],["formatting","Formatting"],["math","Formulas"],["sounds","Sounds"],["sharing","Sharing, Anki, printing"],["modes","Study, Practice, Quiz"],["exams","Exam dates & plan"],["examsim","Exam simulation"],["comeback","After a break"],["streakhelp","Your streak"],["aihelp","AI card maker"],["synchelp","Account and sync"],["search","Searching"],["keys","Keyboard shortcuts"],["tips","Good cards"]];function o(d,e){d.innerHTML=`
      <h1>Help &amp; guide</h1>
      <nav class="toc" aria-label="Sections">${s.map(([n,r])=>`<a class="chip" href="#/help?section=${n}">${r}</a>`).join("")}</nav>

      <section class="panel" id="how">
        <h2>How spaced repetition works</h2>
        <p>You forget things on a curve: fast at first, then slower. Ikna shows each card again right before you would forget it.
        Every time you remember, the gap grows (a day, a week, a month\u2026), so a few minutes a day keeps a lot in your head.</p>
      </section>

      <section class="panel" id="buttons">
        <h2>What the 4 buttons mean</h2>
        <p>First try to remember the answer, then show it and be honest:</p>
        <table class="cheat"><tbody>
          <tr><td style="color:var(--again)">Forgot</td><td>You didn't remember. The card comes back in a few minutes.</td></tr>
          <tr><td style="color:var(--hard)">Hard</td><td>You got it, but it took effort. The next gap grows a little.</td></tr>
          <tr><td style="color:var(--good)">Got it</td><td>You remembered. This is the normal button.</td></tr>
          <tr><td style="color:var(--easy)">Easy</td><td>It came instantly. The card jumps much further ahead.</td></tr>
        </tbody></table>
        <p class="small muted">The time under each button says when you'll see the card again.</p>
      </section>

      <section class="panel" id="types">
        <h2>The card types</h2>
        <table class="cheat"><tbody>
          <tr><td>Basic</td><td>Question on the front, answer on the back. <span class="muted">\u201CWhat does the liver make?\u201D \u2192 \u201CBile\u201D</span></td></tr>
          <tr><td>Both ways</td><td>Two cards: front \u2192 back and back \u2192 front. Great for terms and definitions. <span class="muted">\u201Cmitosis\u201D \u21C4 \u201Ccell division\u201D</span></td></tr>
          <tr><td>Type the answer</td><td>You type the answer and Ikna checks it, forgiving small typos and accents. <span class="muted">\u201CAu\u201D \u2192 you type \u201CGold\u201D</span></td></tr>
          <tr><td>Fill in the blank</td><td>Hide words in a sentence with {{double curly brackets}}. Each blank becomes its own card.
            <span class="muted">\u201CThe {{heart}} pumps {{blood}}.\u201D makes 2 cards.</span></td></tr>
          <tr><td>Hide parts of an image</td><td>Draw boxes over parts of a picture. Each box becomes its own card: what's under it?
            <span class="muted">A diagram of the heart with 6 boxes makes 6 cards.</span></td></tr>
        </tbody></table>
      </section>

      <section class="panel" id="pictures">
        <h2>Hiding parts of a picture</h2>
        <p>Great for diagrams, maps and anything with labels. On the Add screen, pick <b>Hide parts of an image</b>, then choose, paste or
        take a photo. (Or add a photo with <b>\u{1F4F7} Photo</b> and tap <b>Hide parts of this image</b>.)</p>
        <ul>
          <li><b>Drag</b> over each part to hide. Drag a box to move it, or its corner to make it bigger or smaller. The \xD7 next to a box deletes it.</li>
          <li>Give boxes a <b>label</b> (optional): it's shown when you reveal the answer, and lets you use Quiz.</li>
          <li><b>Hide one at a time</b> covers only the box being asked. <b>Hide all, ask one</b> covers every box, so the other parts can't give the answer away.</li>
          <li>When studying, the box you're asked about is coloured and shows \u201C?\u201D. Show the answer to see what's underneath. \u{1F50D} shows the picture bigger.</li>
        </ul>
        <p class="small muted">To change the boxes later, open the card in Browse. Each box keeps its own progress.</p>
      </section>

      <section class="panel" id="quick">
        <h2>Quick adding</h2>
        <p>Type a card straight into the bar at the top of Home, or use the <b>Quick</b> tab on the Add screen. Write one card per line;
        paste a whole list to add many at once (Ikna shows them first when there are more than 3).</p>
        ${t.quick.syntaxTable()}
        <p class="small muted">The deck is the one you used last. Tap its name to change it. On the Add screen, you can also tap words in a
        Fill in the blank sentence to hide them, add a photo as the front, or paste a list from a spreadsheet.</p>
      </section>

      <section class="panel" id="formatting">
        <h2>Formatting</h2>
        <p class="small">Use the toolbar, or type these yourself:</p>
        <table class="cheat"><tbody>
          <tr><td>**bold**</td><td><b>bold</b></td></tr>
          <tr><td>*italic*</td><td><i>italic</i></td></tr>
          <tr><td>__underline__</td><td><u>underline</u></td></tr>
          <tr><td>~~strike~~</td><td><s>strike</s></td></tr>
          <tr><td>==highlight==</td><td><mark>highlight</mark></td></tr>
          <tr><td>\`code\`</td><td><code>code</code></td></tr>
          <tr><td>- item</td><td>a bullet list (1. for numbers)</td></tr>
          <tr><td># Heading</td><td>a heading (## and ### are smaller)</td></tr>
          <tr><td>&gt; quote</td><td>a quote</td></tr>
          <tr><td>---</td><td>a line</td></tr>
          <tr><td>[text](https://\u2026)</td><td>a link</td></tr>
          <tr><td>![](https://\u2026)</td><td>an image from the web (or use the image button, paste or drop a picture)</td></tr>
          <tr><td>{{answer}}</td><td>a blank (Fill in the blank cards)</td></tr>
          <tr><td>{{answer::hint}}</td><td>a blank with a hint shown in place of the dots</td></tr>
          <tr><td>{{c1::\u2026}} {{c1::\u2026}}</td><td>numbered blanks: blanks with the same number are hidden together on one card</td></tr>
          <tr><td>$x^2$</td><td>a formula (see <a href="#/help?section=math">Formulas</a>)</td></tr>
          <tr><td>\\*</td><td>a backslash shows the next character as it is</td></tr>
        </tbody></table>
      </section>

      <section class="panel" id="math">
        <h2>Formulas</h2>
        <p>Write formulas the way most maths tools do (LaTeX), and Ikna shows them typeset. The <b>\u2211 Formula</b> button on the Add screen gets you started.</p>
        <table class="cheat"><tbody>
          <tr><td>$x^2 + y^2$</td><td>a formula inside a sentence</td></tr>
          <tr><td>$$\\frac{a}{b}$$</td><td>on a line of its own: a big formula, centred</td></tr>
          <tr><td>\\frac{a}{b} \xB7 \\sqrt{x} \xB7 x_1</td><td>a fraction, a square root, a small number below</td></tr>
          <tr><td>\\alpha \\beta \\pi \\Delta</td><td>Greek letters</td></tr>
          <tr><td>\\le \\ge \\ne \\times \\to</td><td>\u2264 \u2265 \u2260 \xD7 \u2192</td></tr>
          <tr><td>\\$</td><td>a dollar sign that isn't a formula</td></tr>
        </tbody></table>
        <p class="small muted">Prices like \u201C$5 and $10\u201D stay as they are. A blank can sit inside a formula: $E = {{mc^2}}$.</p>
      </section>

      <section class="panel" id="sounds">
        <h2>Sounds</h2>
        <p>Cards can play sounds, for example pronunciation in decks from Anki. Tap <b>\u25B6\uFE0E Play sound</b> on the card.
        With <b>Read cards aloud automatically</b> on (Settings), the sound plays by itself when the card appears.</p>
        <p class="small muted">Sounds are kept in this browser with your pictures, and they're part of your backups. Recording your own sounds works in the Android app.</p>
      </section>

      <section class="panel" id="sharing">
        <h2>Sharing, Anki and printing</h2>
        <p><b>Share a deck:</b> open the deck, tap <b>\u2022\u2022\u2022</b> and choose <b>Share deck</b>. You get a .ikna file with the cards, pictures and sounds
        (not your progress). Send it to a friend; they open it under <b>Import \u2192 Open shared deck</b>. If they already have a deck with that
        name, Ikna asks whether to add the new cards to it or keep both.</p>
        <p><b>From Anki:</b> in Anki choose File \u2192 Export \u2192 Anki Deck Package (.apkg). In Ikna go to <b>Import \u2192 Anki deck</b>. You see what's
        inside first, and can keep your Anki progress. Pictures, sounds, subdecks and fill-in-the-blank cards come along; cards with a custom
        design keep their text.</p>
        <p><b>To Anki:</b> deck <b>\u2022\u2022\u2022</b> \u2192 <b>Export for Anki</b> makes an .apkg file with your cards and progress. In Anki choose File \u2192 Import.</p>
        <p><b>Print or save as PDF:</b> deck <b>\u2022\u2022\u2022</b> \u2192 <b>Print or save as PDF</b>. Pick a cheat sheet (a list) or paper flashcards
        (8 per page, print double-sided and flip on the long edge), with or without the answers.</p>
      </section>

      <section class="panel" id="modes">
        <h2>Study, Practice and Quiz</h2>
        <p><b>Study</b> is the main thing: the cards that are due today, scheduled for you. Do it every day.</p>
        <p><b>Practice</b> lets you go through any cards (all, due soon, trouble cards, flagged, new, added this week or a tag)
        whenever you like. It never changes when cards are due.</p>
        <p><b>Quiz</b> asks multiple-choice questions made from your other cards. It doesn't change when cards are due either.</p>
      </section>

      <section class="panel" id="exams">
        <h2>Exam dates</h2>
        <p>Open a deck, go to <b>Deck settings</b> and set the <b>exam date</b>. Ikna then makes sure every card in that deck comes up
        at least once before the exam, and Home shows a countdown. Use Practice the evening before to go through everything once more.</p>
        <p><b>The study plan</b> on the deck (and on Home) says how many new cards a day get you through everything in time, for example
        \u201CStudy 34 new cards a day to see everything before 14 June.\u201D It adjusts by itself as you go. The bar shows how many cards you've seen.</p>
        <p class="small muted">With <b>Speed up new cards when an exam is coming</b> on (Settings), Ikna shows more new cards a day when that's
        needed to finish in time.</p>
      </section>

      <section class="panel" id="examsim">
        <h2>Exam simulation</h2>
        <p>Open a deck and choose <b>Exam simulation</b>. Pick how many questions, a time limit and the style: multiple choice, typing the
        answer, or a mix. During the exam you don't see the answers. Flag questions you're unsure about and go back with Previous.</p>
        <p>At the end you get your score, how long it took and every question you got wrong with the right answer. One tap practises just
        those. An exam never changes when cards are due.</p>
      </section>

      <section class="panel" id="comeback">
        <h2>Coming back after a break</h2>
        <p>Missed a few days? When a big pile of cards is waiting, Home offers to <b>spread them over a few days</b>. Each day you get a
        manageable part (Home shows \u201CCatching up: day 2 of 5\u201D). You can also do them all at once.
        Stop catching up any time in Settings; it also ends by itself.</p>
      </section>

      <section class="panel" id="streakhelp">
        <h2>Your streak</h2>
        <p>\u{1F525} counts the days in a row you studied. It's gentle: <b>one rest day a week</b> doesn't break it. Home shows whether your rest day is
        still free this week, and reminds you when today counts.</p>
      </section>

      <section class="panel" id="aihelp">
        <h2>AI card maker (optional)</h2>
        <p>With your own API key from <b>OpenAI</b> or <b>Anthropic (Claude)</b>, Ikna can:</p>
        <ul>
          <li><b>Make cards from your notes</b>: Add \u2192 <b>\u2728 From notes</b>. Paste text or add a photo of a page, choose how many cards, then tick
            the ones you want. You can fix each card before adding it.</li>
          <li><b>Explain a card</b>: while studying, after showing the answer, \u2022\u2022\u2022 \u2192 <b>\u2728 Explain this</b>. You can add the explanation to the card's notes.</li>
          <li><b>Fix a trouble card</b>: <b>\u2728 Suggest a better version</b> rewrites a card you keep forgetting, or splits it into smaller cards.</li>
        </ul>
        <p><b>What's sent:</b> only the notes, photo or card you're working on, and only when you press an \u2728 button. It goes straight from
          this browser to the company you chose. Nothing goes to Ikna.</p>
        <p><b>Cost:</b> you pay the AI company directly. Most actions cost less than a cent to a few cents; Ikna shows a rough price before you
          make cards and the real one afterwards. \u201CCheapest\u201D in Settings costs much less.</p>
        <p><b>Your key:</b> it's kept only in this browser. It's never put in backups, exports or sync, and it's never shown to anyone else.
          Remove it any time in <a href="#/settings?section=ai">Settings \u2192 AI card maker</a>. Without a key, the \u2728 buttons stay hidden.</p>
      </section>

      <section class="panel" id="synchelp">
        <h2>Account and sync (optional)</h2>
        <p>Sign in under <a href="#/settings?section=account">Settings \u2192 Account and sync</a> with your email (we send you a link, no password)
          or with Google. Ikna then keeps your cards, progress and settings the same on your phone and computer.</p>
        <ul>
          <li>It syncs by itself: when you open Ikna, a few seconds after a change, after studying and every few minutes.</li>
          <li>The dot at the top shows how it's going: <b style="color:var(--good)">green</b> synced, <b style="color:var(--accent)">blinking</b> syncing,
            <b class="muted">grey</b> offline, <b style="color:var(--again)">red</b> a problem. Tap it for details.</li>
          <li>The first time you sign in on a device that already has cards, they're combined with your account. Nothing is deleted.</li>
          <li>If you change the same card on two devices, the newest change wins.</li>
          <li><b>Download my data</b> gives you everything in one file. <b>Delete my account</b> removes your account and the cards stored online;
            the cards on your device stay.</li>
        </ul>
        <p class="small"><a href="privacy.html" target="_blank" rel="noopener">Privacy policy</a></p>
      </section>

      <section class="panel" id="search">
        <h2>Searching</h2>
        <table class="cheat"><tbody>
          <tr><td>heart blood</td><td>cards with both words</td></tr>
          <tr><td>"red blood cell"</td><td>this exact phrase</td></tr>
          <tr><td>-blood</td><td>cards without this word</td></tr>
          <tr><td>tag:exam</td><td>cards with this tag</td></tr>
          <tr><td>deck:biology</td><td>cards in decks whose name contains this</td></tr>
          <tr><td>is:due is:new is:learning is:review</td><td>by where they are in learning</td></tr>
          <tr><td>is:flagged is:suspended is:trouble is:buried</td><td>flagged, suspended, trouble cards, or skipped until tomorrow</td></tr>
        </tbody></table>
      </section>

      <section class="panel" id="keys">
        <h2>Keyboard shortcuts</h2>
        <table class="cheat"><tbody>
          <tr><td><kbd>Space</kbd> / <kbd>Enter</kbd></td><td>Show the answer, then answer \u201CGot it\u201D (or the suggested button)</td></tr>
          <tr><td><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd></td><td>Forgot, Hard, Got it, Easy. In Practice: 1 Still learning, 2 Got it. In a Quiz: pick an answer</td></tr>
          <tr><td><kbd>Z</kbd></td><td>Undo the last answer</td></tr>
          <tr><td><kbd>E</kbd></td><td>Edit the card</td></tr>
          <tr><td><kbd>F</kbd></td><td>Flag or unflag the card</td></tr>
          <tr><td><kbd>R</kbd></td><td>Read aloud (decks with a language)</td></tr>
          <tr><td><kbd>I</kbd></td><td>Card info</td></tr>
          <tr><td><kbd>A</kbd></td><td>Add a new card while studying (you come back to the same card)</td></tr>
          <tr><td><kbd>\u2190</kbd> <kbd>\u2192</kbd></td><td>Previous and next question in an exam simulation</td></tr>
          <tr><td><kbd>Esc</kbd></td><td>Stop studying. On a \u201Ctype the answer\u201D card, Esc first leaves the answer box so the letter shortcuts work</td></tr>
          <tr><td><kbd>Ctrl</kbd>/<kbd>\u2318</kbd> + <kbd>Enter</kbd></td><td>Add or save a card (also on the Quick tab)</td></tr>
          <tr><td><kbd>Enter</kbd></td><td>Add the card in the quick-add bar on Home (<kbd>Shift</kbd>+<kbd>Enter</kbd> for a new line)</td></tr>
          <tr><td><kbd>Ctrl</kbd>/<kbd>\u2318</kbd> + <kbd>B</kbd> / <kbd>I</kbd></td><td>Bold or italic while writing a card</td></tr>
          <tr><td><kbd>/</kbd></td><td>Jump to the search box in Browse</td></tr>
        </tbody></table>
      </section>

      <section class="panel" id="tips">
        <h2>Tips for good cards</h2>
        <ul>
          <li><b>One fact per card.</b> Small cards are quicker and stick better.</li>
          <li><b>Keep it short.</b> If an answer is a list, split it or use Fill in the blank.</li>
          <li><b>Use Fill in the blank for sentences</b> and definitions you want to know word for word.</li>
          <li><b>Add images.</b> A diagram or photo is often easier to remember than words.</li>
          <li><b>Write in your own words</b>, and add an example in the notes.</li>
          <li><b>Trouble cards</b> (forgotten again and again) usually need rewriting, not more repetition.</li>
        </ul>
      </section>

      <section class="panel">
        <h2>Your data</h2>
        <p class="small">Ikna keeps everything in this browser (and in your account, if you turn on sync). Make a backup in Settings now and then;
          a backup also opens in the Android app. <a href="privacy.html" target="_blank" rel="noopener">Privacy</a></p>
      </section>`;const a=e.query.section&&document.getElementById(e.query.section);a&&setTimeout(()=>a.scrollIntoView({block:"start"}),0)}t.screens.help={tab:"settings",title:()=>"Help",render:o}})(window.Ikna);
