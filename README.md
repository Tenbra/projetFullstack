

## Mise en Production : Sans Docker

### Base de données : Postgres
* Installer un serveur de base de donnée Postgres avec les informations : User = postgres et Password = postgre
* Créer une base de donnée nommé : `covid-db`
* le serveur doit bien etre exposé sur le port 5432

### Build en local 

#### Backend : Gradle
Pour lancer le build du backend :
* Se placer dans le dossier back
* executer la commande : `gradle build -x test --no-daemon`
* Si tout c'est bien passé, le .jar est disponible dans le dossier : `build/libs/`
Pour le lancer, utilisez la commande : `java -jar covid-api-0.0.1-SNAPSHOT.jar`
Une fois lancé, le backend est disponible sur le lien : http://localhost:8080

#### FrontEnd : Angular
Pour lancer le build du frontend :
* Se placer dans le dossier front
* executer la commande : `ng build`
* Si tout c'est bien passé, le build est disponible dans le dossier : `dist/covid-front/`
Pour le lancer, le copier dans le repertoire html d'un serveur nginx et remplacer la configuration par defaut par celle du fichier `front/nginx.conf`

##  Mise En Production : Docker

Si Vous avez Docker d'installé sur votre machine : 
* Placez vous dans le repertoire "/projetFullstack"
* Verifiez que vous avez bien le fichier `docker-compose.yml` et les dossiers `back` et `front`
* Executez la commande suivante pour lancer le projet : `docker-compose up --build `
* Une fois lancé, sans erreurs, nous avons l'application qui est deployé et disponible sur l'hote http://localhost:4200



