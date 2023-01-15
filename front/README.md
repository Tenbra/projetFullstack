## Structure des modules

### app-auth
Dans ce module, on retrouve les page de connexion, son module de routage et les modules qu'il importe
### app-private
Danc ce module, on retrouve les composents reservés aux personnels privé, son module de routage et les modules qu'il implemente
### app-public
Danc ce module, on retrouve les composents publiques, accessibles a tous, son module de routage et les modules qu'il implemente
### core
Dans ce module, on retrouve les guards, les intercepteurs, le modele de données et les differents services
### shared
Danc ce module, on retrouve les composents qui sont partagés avec les autres modules et les modules qu'il implemente. ce module n'a pas de module de routage.

## Les Pages

### Pages publiques :

Quand vous arrivez sur la page publique, vous pourrez choisir le centre de vaccination que vous voulez. Dans la zone de recherche il faut taper le nom de la ville.
Ensuite intervient l'inscription, avec nom, prénom, adresse email et la date. Suite à cette réservation arrive une page de confirmation qui notifie que la réservation a bien été prise en compte.

### Pages privates : 

Quand vous arrivez sur la première page, il faut se connecter avec un identifiant et un mot de passe. Pour utiliser un compte admin il faut le compte ci :  
Pour le super-admin il faut ce compte : 
Arrivé à la page home, à gauche se trouve un menu où on peut accéder à toutes les pages : centres, mon centre, planning et config.

#### Page centres : 

Sur cette page, un super admin peut modifier et supprimer un centre. On peut aussi voir les personnels qui sont affiliés à ce centre.

#### Page mon centre : 



#### Page planning : 

#### Page Config : 


## Les services

Pour chaque requete GET, on sauvegarde l'etag dans une variable et pour la prochaine requetes GET ou PUT, on utilise cet etag.

### Le service d'authentification
C'est avec ce service qu'un personnel se connecte ou se deconnecte au Backend
### Le service public
C'est avec ce service qu'un patient peut effectuer des requetes vers l'API public du backend.
### Le serice privé
C'est avec ce service qu'un personnel connecté peut effectuer certaines requetes vers l'API privée du backend.


## Les Guards

### AuthGuard
Ce guard verifie si un personnel est connecté avant de charger les pages privées
### LoginGuard
Ce guard verifie si un personnel est connecté et dans ce cas, il n'a plus acces à la page de login
### Roleguard
Ce guard verifie si un personnel connecté a les droits necessaires pour acceder à un menu 
## Les Intercepteurs
Nous avons un seul intercepteur : `AdminInterceptor`. Cet intercepteur ajoute le header `Authorization` pour l'authorisation Basic pour identifier chaque requete au niveau du backend. Et egalement le header `X-Requested-With` pour ne plus afficher le formulaire par defaut de Spring Security pour l'authentification.

