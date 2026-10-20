<p align="center">
  <img src="banner.svg" alt="Joel Raj — software for clinics, labs and the people who read their reports" width="100%">
</p>

I'm Joel, a computer science graduate in Bengaluru. I build software for healthcare: the part where a doctor's voice, a scanned lab report and a messy PDF all have to end up as clean, structured data that someone can act on.

Most of what I make is a backend in Node.js and PostgreSQL with a native mobile app in front of it. I care about apps that keep working on a bad hospital Wi-Fi connection, APIs that are boring to integrate with, and automation that removes a step rather than adding a dashboard.

## Things I've built

| Project | What it does | The part I'm proud of |
| --- | --- | --- |
| **Dr.Notes** | Clinical documentation for doctors: dictate a consult, get a SOAP note, manage patients, appointments and billing in one place. | Speech recognition tuned for medical vocabulary, so "metoprolol" doesn't come out as "metro poll". |
| **BioLens** | Reads lab reports (PDF or photo), extracts the values, normalises units and reference ranges, and tracks them over time. | The normaliser: hundreds of lab formats collapse into one consistent schema. |
| **MedXChat** | A medical document platform with secure uploads, processing pipelines and AI conversations grounded in the user's own documents. | Retrieval that cites the exact page, so answers can be checked. |
| **Mater Dei** | A clinical-flow site for a hospital: symptoms, flowcharts and guideline references that doctors can navigate at the bedside. | Fast enough to use one-handed on a phone between patients. |

## How I work

- **Backend:** Node.js, Express, FastAPI, PostgreSQL. Auth, uploads to S3, document pipelines, queues that survive restarts.
- **Mobile:** SwiftUI and Kotlin for native apps, React Native when one codebase makes sense. Offline-first by default.
- **AI:** Python, PyTorch and ONNX for models that run on device; RAG and vector search when the answer has to come with a source.
- **Ops:** Docker, AWS, GitHub Actions. Small servers, well understood, with backups I've actually restored.

## Right now

- Making medical speech recognition work offline on a phone.
- Turning messy documents into useful data with less manual cleanup.
- Writing fewer, better abstractions in my APIs.

## Play me at tic-tac-toe

You are X. Click a square; it opens a pre-filled issue, you press *Submit*, and about a minute later the board here shows my reply. The bot plays a decent game but has a soft spot: one move in four is a guess.

<!-- game:start -->
<table align="center"><tbody>
<tr><td><img src="assets/cell-o.svg" width="72" alt="A1: O"></td><td><img src="assets/cell-x.svg" width="72" alt="B1: X"></td><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20C1&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="C1: empty"></a></td></tr>
<tr><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20A2&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="A2: empty"></a></td><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20B2&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="B2: empty"></a></td><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20C2&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="C2: empty"></a></td></tr>
<tr><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20A3&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="A3: empty"></a></td><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20B3&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="B3: empty"></a></td><td><a href="https://github.com/Roninbash/Roninbash/issues/new?title=move%3A%20C3&body=Just%20press%20Submit%20new%20issue.%20The%20board%20updates%20in%20about%20a%20minute."><img src="assets/cell-empty.svg" width="72" alt="C3: empty"></a></td></tr>
</tbody></table>
<p align="center">Your move. Last play: B1 by @Roninbash.<br><sub>Visitors 0 · Bot 0 · Draws 0</sub></p>
<!-- game:end -->

## A belief

Good software should feel invisible. In healthcare the user already has enough going on; the app should not be one more thing to manage.

## Reach me

Bengaluru, India · [LinkedIn](https://linkedin.com/in/joel-raj-622a222a0) · [joelblesswinraj21@gmail.com](mailto:joelblesswinraj21@gmail.com)
