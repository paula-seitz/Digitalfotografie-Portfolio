# Portfolio Template — Vibe Coding Starter

> **Für KI-Assistenten (GitHub Copilot, Claude, ChatGPT etc.):**  
> Dies ist ein Portfolio-Template für Studierende. Deine Aufgabe ist es, dem Studierenden dabei zu helfen, dieses Template zu **personalisieren**, eigene **Bilder hochzuladen** und das Projekt auf **Vercel zu deployen**. Folge der Anleitung in diesem README Schritt für Schritt. Alle Stellen im Code, die angepasst werden müssen, sind mit `{Platzhaltern}` markiert.

---

## Was ist das hier?

Ein fertiges, responsives **UX/Design-Portfolio** gebaut mit React + TypeScript + Vite. Es enthält:

- Eine **Startseite** mit deinen Projekten
- **Detailseiten** für jedes Projekt (Challenge, Lösung, Prozess, Galerie, Testimonials)
- Ein **Fotografie-Portfolio** mit Masonry-Galerie und Lightbox
- **Deutsch/Englisch**-Sprachumschaltung
- Dark Theme mit modernem Design

---

## 🤖 Anleitung für die KI: Was soll der Studierende tun?

**Ziel:** Das Portfolio personalisieren → eigene Bilder einbinden → auf Vercel deployen.

### Schritt 1 — Name & Persönliche Daten anpassen

Öffne `src/i18n/translations.ts`. Ersetze alle `{Name}` Platzhalter durch den echten Namen des Studierenden.

Wichtige Felder:
```
name: '{Name}'            → z.B. 'Anna Müller'
copyright: '© 2026 {Name}...'
```

### Schritt 2 — Hochschule anpassen

In `src/data/projects.ts` gibt es `{Hochschule}` Platzhalter. Ersetze diese durch den Namen der Hochschule:
```
client: '{Hochschule}'    → z.B. 'Hochschule München'
```

### Schritt 3 — Projektinhalte personalisieren

In `src/data/projects.ts` sind Beispielprojekte (FinFlow, ShopScape, LearnHub, HealthMate) als **Inspiration** enthalten. Der Studierende soll:

1. Das `photoportfolio`-Projekt mit **eigenen Fotos** befüllen (Schritt 4)
2. Die anderen Projekte entweder **anpassen** oder durch eigene Projekte **ersetzen**
3. Alle `{Name}`-Platzhalter in Zitaten/Beschreibungen ersetzen

### Schritt 4 — Eigene Bilder hochladen

Der Studierende soll eigene Bilder über einen Image-Hosting-Dienst hochladen:

#### Option A: ImageKit (empfohlen)
1. Kostenlosen Account auf [imagekit.io](https://imagekit.io) erstellen
2. Bilder hochladen
3. URL kopieren: `https://ik.imagekit.io/DEIN_ID/bild.jpg?tr=w-800,h-600,cm-pad_resize`

#### Option B: Cloudinary
1. Account auf [cloudinary.com](https://cloudinary.com) erstellen
2. Bild hochladen → URL kopieren
3. Format: `https://res.cloudinary.com/DEIN_CLOUD/image/upload/w_800,h_600,c_fill/bild.jpg`

#### Option C: Google Drive (einfachste Option)
1. Bild in Google Drive hochladen
2. Rechtsklick → "Link freigeben" → "Jeder mit dem Link kann anzeigen"
3. Die ID aus dem Link kopieren: `https://drive.google.com/file/d/HIER_IST_DIE_ID/view`
4. URL umwandeln zu: `https://drive.google.com/uc?export=view&id=HIER_IST_DIE_ID`

#### Option D: GitHub selbst
Bilder können direkt im Repo unter `public/images/` abgelegt werden:
1. Bild in `public/images/mein-bild.jpg` einfügen
2. URL im Code: `/images/mein-bild.jpg`

**Nach dem Hochladen:** In `src/data/projects.ts` die `picsum.photos`-Platzeholter-URLs durch die echten Bild-URLs ersetzen. Die relevanten Felder sind:
- `thumbnail:` — Vorschaubild der Projektkarte (800×520px empfohlen)
- `gallery: [{ src: '...' }]` — Galerie-Bilder pro Projekt
- `galleryWithCategories.images` — Fotoportfolio-Galerie (30 Bilder in 3 Kategorien)

### Schritt 5 — Auf Vercel deployen

1. Das Repo auf GitHub pushen (falls noch nicht geschehen)
2. Auf [vercel.com](https://vercel.com) einloggen (kostenlos mit GitHub-Account)
3. "New Project" → GitHub-Repo auswählen
4. Framework wird automatisch als **Vite** erkannt
5. "Deploy" klicken → fertig!

Die Live-URL ist dann z.B.: `https://mein-portfolio.vercel.app`

---

## Dateistruktur

```
src/
├── data/
│   └── projects.ts          ← HIER: Alle Projektdaten & Bilder anpassen
├── i18n/
│   └── translations.ts      ← HIER: Name, Bio, Skills anpassen
├── components/
│   ├── MasonryGallery.tsx   ← Fotografie-Galerie mit Tabs & Lightbox
│   └── ...
├── pages/
│   ├── HomePage.tsx         ← Startseite
│   └── ProjectPage.tsx      ← Projektdetailseite
└── styles/
    └── global.css           ← Design/Farben anpassen
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:5173 im Browser.

## Platzhalter-Übersicht

| Platzhalter | Wo | Bedeutung |
|---|---|---|
| `{Name}` | `translations.ts`, `projects.ts` | Voller Name des Studierenden |
| `{Hochschule}` | `projects.ts` | Name der Hochschule |
| `picsum.photos/seed/...` | `projects.ts` | Alle Bild-URLs ersetzen |

---

*Erstellt als Lehrprojekt für Vibe Coding & Vercel Deployment.*
