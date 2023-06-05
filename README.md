# TMPS_all
     Design patterns reprezintă soluții recurente la probleme comune întâlnite în dezvoltarea software-ului. Acestea sunt utilizate pentru a oferi structură, flexibilitate și modularitate în cadrul unei aplicații. În cazul aplicației noastre, am implementat 10 design patterns care abordează diferite aspecte ale sistemului de gestionare a evenimentelor într-un calendar. În continuare, voi explica în general de ce este utilizat fiecare dintre acești 10 patternuri.

**Singleton Pattern:**
      Singleton Pattern este utilizat pentru a se asigura că există o singură instanță a unei clase în întreaga aplicație. Acest pattern este folosit pentru clasele care trebuie să aibă o unică instanță și oferă acces global la acea instanță. În cazul nostru, Singleton Pattern este utilizat pentru a asigura că avem o singură instanță a clasei de gestionare a listei de evenimente.

**Factory Method Pattern:**
      Factory Method Pattern oferă o modalitate de creare a obiectelor fără a specifica clasa exactă a obiectului care va fi creat. În loc să folosim constructori direcți, acest pattern utilizează o metodă de fabrică pentru a crea obiecte. În aplicația dată, Factory Method Pattern este utilizat pentru a crea obiecte de tip eveniment, indiferent dacă acestea sunt evenimente simple sau evenimente cu termen limită.

**Abstract Factory Pattern:**
      Abstract Factory Pattern furnizează o interfață pentru crearea familii de obiecte conexe, fără a specifica clasele concrete ale acestor obiecte. Acest pattern ne permite să creăm obiecte care sunt legate între ele sau depind una de cealaltă, folosind o fabrică abstractă. În cazul nostru, Abstract Factory Pattern este utilizat pentru a crea diferite tipuri de liste de evenimente.

**Decorator Pattern:**
      Decorator Pattern este utilizat pentru a adăuga funcționalități suplimentare la un obiect existent, fără a modifica structura sa de bază. Acest pattern permite extinderea comportamentului unui obiect prin încapsularea acestuia într-un decorator, care oferă funcționalități adiționale. În aplicația dată, Decorator Pattern este folosit pentru a adăuga prioritate la evenimente.

**Adapter Pattern:**
      Adapter Pattern este utilizat pentru a conecta două clase sau interfețe care nu se potrivesc între ele. Acest pattern permite convertirea interfeței unei clase într-o altă interfață pe care o așteaptă un client. În aplicația dată, Adapter Pattern este utilizat pentru a adapta o clasă existentă de evenimente la o interfață comună.

**Bridge Pattern:**
      Bridge Pattern separă abstractizarea de implementare, permițându-le să evolueze independent unul de celălalt. Acest pattern este folosit pentru a gestiona o relație complexă între două clase prin intermediul unei abstracții. În cazul nostru, Bridge Pattern este utilizat pentru a permite gestionarea diferitelor tipuri de evenimente și a detaliilor specifice ale acestora.

**Facade Pattern:**
     Facade Pattern oferă o interfață simplificată pentru a accesa un sistem complex sau un set de clase. Acest pattern ascunde complexitatea din spatele unei interfețe simple și unificate, permițând utilizatorilor să interacționeze cu sistemul fără a cunoaște detaliile interne. În aplicația dată, Facade Pattern este utilizat pentru a oferi o interfață simplificată pentru adăugarea și sortarea evenimentelor.

**Observer Pattern:**
     Observer Pattern este folosit pentru a stabili o relație de tip observator-subiect între obiecte. Acest pattern permite notificarea automată a observatorilor atunci când se produce o schimbare în starea subiectului. În aplicația dată, Observer Pattern este utilizat pentru a notifica observatorii despre modificările din lista de evenimente și pentru a permite reacționarea și actualizarea acestora.

**Command Pattern:**
     Command Pattern separă o comandă de executarea sa, permițând manipularea și stocarea acesteia ca un obiect. Acest pattern este folosit pentru a encapsula o operație sau o acțiune într-un obiect, permițând astfel efectuarea acelei acțiuni într-un moment ulterior sau de către un alt obiect. În aplicația dată, Command Pattern este utilizat pentru a stoca și executa comenzi legate de operațiile asupra listei de evenimente.

**Strategy Pattern:**
     Strategy Pattern permite schimbarea algoritmului sau strategiei utilizate de un obiect fără a afecta obiectul în sine. Acest pattern este utilizat pentru a separa logica specifică a algoritmului de clasa principală, permițând utilizarea și schimbarea facilă a diferitelor strategii. În aplicația dată, Strategy Pattern este utilizat pentru a oferi diferite strategii de sortare a listei de evenimente, precum sortarea după nume sau sortarea după dată.
