pipeline {
    agent none
    stages {

        stage('Database') {
            agent {
                docker { image 'postgres:14.5' }
            }
            steps {
                sh 'node --version'
            }
        }

        stage('Back-end') {
            agent {
                docker { image 'maven:3.8.1-adoptopenjdk-11' }
            }
            steps {
                sh 'mvn --version'
            }
        }
        
    }
}