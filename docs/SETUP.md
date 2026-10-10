# OpenAI Decisions for Meta ad research

## Configure and run

```sh
npm ci
npm run setup
```

Set these in the local `.env`, then restart:

```dotenv
OPENAI_API_KEY=your_key_here
ANALYSIS_PROVIDER=openai
```

Keys never go to the browser, exports or GitHub. Keep `.env` ignored.

```sh
npm start
```

Open http://127.0.0.1:5194. The default **Demo results** report is populated immediately, without keys, in the light Creator Lab style. Its findings are calculated from synthetic dates and labels. Public inspiration images, when installed locally, illustrate the interface; those images have not been classified by OpenAI. Copy and briefs belong to a fictional haircare example. Use format/hook filters, click a thumbnail or point, inspect the breakdown, and explore linked briefs. **Replay demo run** starts the fixture animation. No provider is called and no saved batch is replaced.

For real research, choose **Import ads**. Start with five real creative images or videos. Install FFmpeg and ffprobe for resizing and video sampling. No Apify call is required for uploads or JSON imports.

Click **Analyze / retry unfinished**. The real classifier uses the dedicated [Decisions endpoint](https://developers.openai.com/api/docs/guides/decisions), with `gpt-6-luna`. Images are inline base64 data, not hosted URLs. The model receives copy, available speech, explicit notes and the submitted images. Dates, active status and outcome metadata are excluded from classification.

Static ads contribute one resized image. Videos contribute up to four frames at the opening and later timestamps. Frame sampling is not complete video analysis. Optional Fireworks or Groq configuration adds speech transcription; Decisions itself does not transcribe audio. Static ads need no speech key or OCR pass.

## Get Meta data

Import an Ad Library JSON export or configure `APIFY_TOKEN` and use **Meta collection** with public Ad Library/page URLs. Collection has its own spending cap and does not automatically start AI analysis. The Apify connector remains beta pending a paid live test. If a launch response is uncertain, attach the existing run instead of paying to start it again.

The local inspiration-image gallery is separate from real campaign records. Its images do not have verified campaign start dates or performance, so it must not be used to claim measured winners.

## What the labels mean

Seven named choice questions return format, hook, angle, offer, proof, objection and CTA. Uncertain and refused answers remain unknown. Confidence describes the classification, not sales or survival odds.

The app joins dates and active status afterward. Its 60-day share is **active ads whose reported start is at least 60 days old, divided by dated active ads in that group**. It is a snapshot association, not a longitudinal survival rate. Missing dates are excluded from the denominator. There is no ROAS, revenue, spend or conversion data in this system.

Filter format and hook, or click a pattern row. Change the comparison dimension between format, hook, offer and angle. Clicking a creative updates the side inspector. **All labels & evidence** opens the labels, actual analysed frame images and timestamps, copy, available transcript and original Ad Library link. The report compares patterns with the snapshot average and proposes an original test, not a performance prediction.

## Briefs

Decisions scores clarity, brand fit and support for claims against explicit rubrics. It does not write prose. Configure the separate compatible writer to generate original briefs, or use the clearly labelled editable outlines. These scores are not predicted ad performance.

## Costs and provenance

At the documented base rate, Decisions costs $0.10 per million input tokens. The display estimates that charge from returned usage. Missing usage remains unknown; regional/long-context premiums, Apify, speech and writer costs are excluded. Do not reuse the Jev demo's 17-cent claim. Measure the real run first.

Requests cache against both text and actual image bytes. Unchanged requests reuse local results at zero new estimated charge. An uncertain request is not automatically retried because it may already have been billed. Legacy Jev runs retain provider metadata and are reclassified only when you explicitly press Analyze with OpenAI configured.

Exports include provider, model, analysis version, visual sample count, timestamps and estimated analysis costs. They exclude API keys, local frame paths and binary images.

## Screen sequence for the reel

1. Open the real research dashboard with the completed batch visible.
2. Show the creative wall and map together. Describe the actual number of collected/classified ads.
3. Switch the comparison dimension to hook or format. Select a measured pattern with enough examples.
4. Open a source creative. Show the exact frames sent to Decisions, timestamps and returned labels.
5. Open its original Ad Library link to ground the example.
6. Show the actual estimated Decisions cost and state what it excludes.
7. Show an original outline or writer draft with rubric review, then the setup guide.

The recording page at `/variations.html` remains a simulation, even with OpenAI branding. It must not be represented as the live run. The dashboard at `/` opens in Demo results. Switch to Import ads or Meta collection to inspect actual local results.

## Validation status

Local syntax checks and 13 tests passed, including actual FFmpeg image/video extraction, mocked Decisions responses, persisted results, safe frame previews, cache reuse, refusal handling and unknown usage. No paid OpenAI Decisions or Apify end-to-end run has yet been performed for this migration.

## Install FFmpeg

Mac with Homebrew: `brew install ffmpeg`. Windows with WinGet: `winget install --id Gyan.FFmpeg --exact`. Ubuntu/Debian: `sudo apt install ffmpeg`. Reopen your terminal and run `npm run doctor`. Both ffmpeg and ffprobe must be available.

## Optional writer

Set `LLM_BASE_URL`, `LLM_API_KEY` and `LLM_MODEL` to an OpenAI-compatible chat-completions provider and an available model that supports JSON-object responses. The transcription key does not enable this stage. Without these settings, briefs are explicitly editable outlines.

## Troubleshooting

- Missing key or HTTP 401/403: check local .env spelling, provider access and billing, then restart. Doctor checks presence, not authentication.
- HTTP 429: check provider quota and retry unfinished records after fixing it.
- Missing media: Meta CDN links expire; upload the original local file or refresh the export.
- Unknown format: inspect submitted frames. A still image or sparse samples may not establish the format.
- Port already in use: stop the other preview or set a different PORT in .env.
- Never retry an uncertain paid launch blindly; inspect the provider run first.

## Safe AI setup prompt

> Set up https://github.com/artemnovitckii/openai-decisions-marketing locally. Read README.md, docs/SETUP.md and docs/PRIVACY.md. Install dependencies, run setup, doctor, checks and tests, then start the no-key demo. Do not print secrets. For real analysis, ask me to add OPENAI_API_KEY to my local .env and start with five uploaded images. Do not launch paid collection without my instruction. Report exactly what was verified.
