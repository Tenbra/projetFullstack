
Les utilisatuers créés par defaut sont :

* login : tenede@bryan.com, mot de pass : password, role : Admin
* login : tene@bryan.com, mot de pass : password, role : Medecin
* login : gautier@klam.com, mot de pass : password, role : Medecin
* login : klam@gautier.com, mot de pass : password, role : Super Admin

Ils sont tous associé au centre no 1

### Les entités 

#### Personnel
Represente un personnel d'un centre et herite de la classe Personne.
Implemente `UserDetails` pour etre pris en compte par Spring Security comme utilisateur.
#### Adresse
Represente l'adresse d'un centre
#### Centre
Represente un centre de vaccination 
#### Reservation
Represente une reservation de vaccination
#### Role
Represente les differents roles : ADMIN, MEDECIN, et SUPER_ADMIN
#### Patient
Represente un patient qui prends rendez-vous
#### Personne
Represente les données de connexion d'un personnel

### Les services

Pour chaque entité, on a un service (classe java annoté `@Service`) qui permet d'effectuer les differentes operations de lecture, d'ecriture, de modification et de suppression d'entité dans la base de données grace à leurs repository.

Nous avons également le service `AuthService.java` pour gerer la connexion des personnels. Ce service permet de connecter un personnel, le charger et le deconnecter. Ce service implemente l'interface ``UserDetailsService`` pour permettre de gérer le chargement des personnels.

### Les controleurs

Pour chaque entité, on a un controleur (classe java annoté `@RestController`) qui permet d'exposer et de traitr les differentes requetes de lecture (methodes annotés `@GetMapping()`), d'ecriture (methodes annotés `@PostMapping()`), de modification (methodes annotés `@PutMapping()`) et de suppression (methodes annotés `@DeleteMapping()`) d'entité grace à leur service.

Ces classes sont egalement annotés de la balise `@CrossOrigin()` permettant à n'importe quel hote d'effectuer des requetes sur cet API (`origins = "*"`) et rend accessible le header Etag necessaire dans le front (`exposedHeaders = "Etag"`).

Le controleur `ReservationController` implemente des Bucket qui permet 10 creations de reservation par minutes.

### Les Configurations

#### Les Etags

Nous avons implementé des Etags dans notre application. Toutes les reponses envoyés par l'API ont un entete ``Etag`` avec un numero permettant d'identifier la ressource.

La classe `MyCustomEtagFilter.java` créé la configuration qui filtre toutes les entetes des requetes à la recherche d'entetes `If-Match` ou `If-None-Match` pour effectuer un traitement.

La class `WebConfig.java` applique le filtre dans notre application.

#### La Sécurité

Nous avons implementé l'authentification Basic sur notre application avec `Spring Security`.

Nous avons créé un filtre `SecurityFilterChain` qui gère les regles d'accès aux differentes ressources de l'API en fonction des roles de celui qui veut y acceder, et qui permet l'acces à toutes les requetes GET vers une API publique.

Les mots de pass sont egalement encodés avec BCrypt
