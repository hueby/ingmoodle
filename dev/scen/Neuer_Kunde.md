# Neuer Kunde - Features

## Überlegungen
Die Schaltfläche neuer Kunde ist an sich obsolet.
Da Moodle verwendet wird müsste man, wenn Neuer Kunde implementiert werden soll,
Bei neuer Kunde ein **neues Konto in Moodle anlegen**.
In diesem Fall müsste die Ansicht neuer Kunde von der Moodle App aus erreichbar
sein.

Überhaupt wäre es sinnvoll, einen Bereich in die Moodle App zu integrieren,
der nur der Checklisten-App gehört, sodass der Anschein entsteht, es sei eine
eigene App.

## Ansichten - Anforderung

### Neuer Kunde - Anlegen :red_circle:

 - 5 Textfelder
 - 2 Buttons
 - 1 Label mit Datum

Wenig Aufwand (**30min**)

### Checklisten :red_circle:

 - Tabelle mit "Kunden"
 - Bei auswählen einer Tabellenzelle soll eine Unteransicht erscheinen
 - Unteransicht hat 2 Buttons "Identifikation" und "Problemlösung"

Mittlerer Aufwand (**4h**)

### Checklisten - Identifikation :red_circle:

 - Asicht die alle verfügbaren "Umfragen" aus Moodle kategorisiert nach Kursen
   anzeigt.
 - Tabelle

Hoher Aufwand (**8h**)

## Ansichten - Eigenvorstellung

### Kundenübersicht

- Alle registrierten Kunden auflisten

(Kein großer Aufwand)


## Realisierung

- Gedanken
  - Datenmodell
    - mdl_checklists
      - Enthält alle Kunden
  - Die Checklisten werden an sich von den mdl_quiz Tabellen abgespeichert
  - Evtl. noch eine Verbindungstabelle zwischen mdl_checklists und mdl_quiz mit fremdschlüsselverweisen


- Done
  - `ion-side-menu` in www/core/components/sidemenu
  - Iteriert bei allen Handlern
  - Herausfinden was Handler sind
  - handlers kommen aus dem SideMenuDelegate
  - Delegate gefunden in services/delegate.js (function self.updateNavHandlers())
  - Checklisten müssen als Addon beim Side-Menu registiert werden
  - Nehme addons/messages als Vorlage

  - Fehler
  164   007705   error    Uncaught Error: [$injector:unpr] Unknown provider: $mmaChecklistsProvider <- $mmaChecklists

  - Nachtrag: Das Problem, weshalb der Fehler auftritt ist, dass es im lokalen
              (nicht mobilen) Moodle kein Gegenstück fur die Checklists gibt.
              Also müsste dies noch zusätzlich parallel entwickelt werden.
              sad gg
  - Problemlösung: git commit hash: 4e0df2d637e1f0d90bc8d0322e7487112b87eb76 !
  - services/checklists.js war die Lösung.
  - Es wurde als versucht $mmaChecklists zu finden, das aber nirgends definiert war...
  - Jetzt ist es in services/checklists.js in einer Factory definiert.
