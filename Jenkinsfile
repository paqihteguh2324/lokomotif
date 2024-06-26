pipeline {
    agent any

    tools {
        // Install the Maven version configured as "jenkins-maven" and add it to the path.
        maven "jenkins-maven"
    }

    stages {
        stage('Build Maven') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'main', url: 'https://github.com/paqihteguh2324/lokomotif.git'

                // Run Maven
                bat "mvn -v"
                bat "docker --version"
                bat "mvn clean package"
            }
        }
        
        stage('Check SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('jenkins-sonar') {
                    bat "mvn clean verify sonar:sonar"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // build docker image
                bat "docker build -t paqihteguh23/scheduler-info ."
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                // load docker hub credentials
                withCredentials([string(credentialsId: 'DOCKER_USER', variable: 'DOCKER_USER_VAR'), string(credentialsId: 'DOCKER_PASS', variable: 'DOCKER_PASS_VAR')]) {
                    // login to docker hub
                    bat "docker login -u ${DOCKER_USER_VAR} -p ${DOCKER_PASS_VAR}"
                }
                
                // push docker image to docker hub
                bat "docker push paqihteguh23/scheduler-info"
                
                // logout from docker hub
                bat "docker logout"
            }
        }
    }

           post {
            success {
                withCredentials([string(credentialsId: 'TELE_BOT_TOKEN', variable: 'TELE_BOT_TOKEN_VAR'), string(credentialsId: 'TELE_CHAT_ID', variable: 'TELE_CHAT_ID_VAR')]) {
                    bat ''' curl -s -X POST https://api.telegram.org/bot"%TELE_BOT_TOKEN_VAR%"/sendMessage -d chat_id="%TELE_CHAT_ID_VAR%" -d text="Build Success" '''
                }
            }
            
            failure {
                withCredentials([string(credentialsId: 'TELE_BOT_TOKEN', variable: 'TELE_BOT_TOKEN_VAR'), string(credentialsId: 'TELE_CHAT_ID', variable: 'TELE_CHAT_ID_VAR')]) {
                    bat ''' curl -s -X POST https://api.telegram.org/bot"%TELE_BOT_TOKEN_VAR%"/sendMessage -d chat_id="%TELE_CHAT_ID_VAR%" -d text="Build Failur" '''
            }
        }
    }
}
