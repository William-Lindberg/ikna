# Third-party code in the Ikna web app

Ikna itself is **not** open source and is **not** covered by any licence on this page: Ikna may not be
copied, redistributed or used commercially (see the [Ikna licence](../license.html)). The libraries below
are included unchanged, under their own licences, which are reproduced here and apply only to each library.

| File | Library | Licence | Used for |
|---|---|---|---|
| `vendor/katex/` (katex.min.js, katex.min.css, fonts/) | KaTeX 0.16.22 — https://katex.org | MIT | Showing formulas |
| `vendor/fflate.js` | fflate 0.8.3 — https://github.com/101arrowz/fflate | MIT | Opening and writing Anki files (zip) |
| `vendor/fzstd.js` | fzstd 0.1.1 — https://github.com/101arrowz/fzstd | MIT | Opening Anki files from Anki 2.1.50 and later |
| `vendor/sql-wasm-inline.js` | sql.js 1.15.2 — https://github.com/sql-js/sql.js (includes SQLite, public domain) | MIT | Reading and writing Anki collections |
| `vendor/supabase.js` | supabase-js 2.118.0 — https://github.com/supabase/supabase-js | MIT (`vendor/supabase.LICENSE.txt`) | Optional account and sync |
| `vendor/openai-sdk.js` | OpenAI SDK 7.45.1 (`openai` on npm), bundled for the browser — https://github.com/openai/openai-node | Apache-2.0 (`vendor/openai-sdk.LICENSE.txt`) | Optional AI card maker (OpenAI) |
| `vendor/anthropic-sdk.js` | Anthropic SDK 1.3.0 (`@anthropic-ai/sdk`), bundled for the browser — https://github.com/anthropics/anthropic-sdk-typescript | Apache-2.0 (`vendor/anthropic-sdk.LICENSE.txt`) | Optional AI card maker (Claude) |

The Anki file, KaTeX, sql.js, AI and sync files are only loaded when you use the feature that needs them.

## KaTeX

```
The MIT License (MIT)

Copyright (c) 2013-2020 Khan Academy and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## fflate

```
MIT License

Copyright (c) 2026 Arjun Barrett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.```

## fzstd

```
MIT License

Copyright (c) 2020 Arjun Barrett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.```

## sql.js

```
MIT license
===========

Copyright (c) 2017 sql.js authors (see AUTHORS)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



# Some portions of the Makefile taken from:
Copyright 2017 Ryusei Yamaguchi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.```

## SQLite

SQLite is in the public domain: https://www.sqlite.org/copyright.html


## supabase-js

MIT License, Copyright (c) 2020 Supabase. The full licence text is in `vendor/supabase.LICENSE.txt`.

## OpenAI SDK

Includes the `openai` package © OpenAI, licensed under the Apache License, Version 2.0. The full licence text is in
`vendor/openai-sdk.LICENSE.txt` (also at https://www.apache.org/licenses/LICENSE-2.0). The package was bundled into one
browser file (`vendor/openai-sdk.js`, which sets `window.OpenAI`) without changes to its code.

## Anthropic SDK

Includes `@anthropic-ai/sdk` © Anthropic, PBC, licensed under the Apache License, Version 2.0. The full licence text is in
`vendor/anthropic-sdk.LICENSE.txt` (also at https://www.apache.org/licenses/LICENSE-2.0). The package was bundled into one
browser file (`vendor/anthropic-sdk.js`, which sets `window.Anthropic`) without changes to its code; it keeps the original
copyright banner.
