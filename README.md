# Wache

Persönliche Einsatz-Übersicht fürs iPad: Telefonlisten mit Farbmarkierung, wichtige Infos, AAO und Meldebilder als PDF, Suche über alles, PIN-Sperre.

- Läuft als Web-App (Safari → Teilen → „Zum Home-Bildschirm“), danach auch offline.
- **Alle Einträge, PDFs und die PIN werden nur auf dem iPad gespeichert** (IndexedDB). In diesem Repository liegen keine persönlichen Daten.
- Sicherung: Einstellungen → „Sicherung erstellen“ und in der Dateien-App ablegen.

Technik: reines HTML/CSS/JavaScript ohne Build-Schritt. PDF-Anzeige mit [PDF.js](https://mozilla.github.io/pdf.js/) 3.11.174 (Apache-2.0, siehe `vendor/PDFJS-LICENSE`).

Bei Änderungen an App-Dateien die Versionsnummer `CACHE` in `sw.js` erhöhen, damit das iPad die neue Version lädt.
