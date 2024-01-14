# NobodysPerfectFrontend

--Spiel anlegen--
1.Schritt: Wenn keine Spiele in der Liste vorhanden sind, kann der Spieler eine neues Spiel erstellen.
            ->http://localhost:5173/
2.Schritt: Sobald der Spieler den Button mit dem Plus betätigt, so wird dieser weitergeleitet auf die "Create Game"-Seite, wo er den Spielnamen und den GameCreatorNamen festlegen kann.
            ->http://localhost:5173/game/create
3.Schritt: Nachdem er seine Daten eingegeben hat, befindet er sich nun in der Lobby.
            ->http://localhost:5173/game/:id/:playerid
4.Schritt: Um die erste Runde zu starten, drückt der Spieler GET ANSWER. Dadurch wird durch ChatGPT ein Song beschrieben und dem Spieler 4 Anwortmöglichkeiten vorgelegt.
5.Schritt: Wenn er die richtige Antwort/Song auswählt, dann wird seine aktuelle Punktzahl +1 gerechnet. Wählt er die falsche Antwort, so bekommt er keinen Punkt.


--Spiel beitreten--
1.Schritt: In der angezeigten Spielliste kann der Spieler auf erstellte Spiele klicken.
            ->http://localhost:5173/
2.Schritt: Nachdem er ein Spiel sich ausgewählt hat, kann er nun seinen Spielernamen eingeben und dem Spiel beitreten.
            ->http://localhost:5173/game/:id
3.Schritt: Sobald alle Spieler in der Lobby sind, ist der Spielablauf gleich. 

Anmerkungen: Nur der GameCreator kann das Spiel löschen über den Knopf <Delete Game>