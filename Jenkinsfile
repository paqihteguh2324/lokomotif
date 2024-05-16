pipeline {
    agent any

    tools {
        // Install the Maven version configured as "jenkins-maven" and add it to the path.
        maven "jenkins-maven"
    }

    

    stages {
        stage('Initialize'){
            def dockerHome = tool 'Docker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }
        stage('Build Maven') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'main', url: 'https://github.com/paqihteguh2324/lokomotif.git'

                // Run Maven on a Unix agent.
                sh "mvn clean package"
            }
        }
        
        stage('Check SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('sonarQube') {
                  sh "mvn clean verify sonar:sonar -Dsonar.projectKey=Lokomotif -Dsonar.projectName='Lokomotif'"
                }
            }
        }
          stage('Build Docker Image') {
            steps {
                // build docker image
                sh "docker build -t paqih/locomotive-scheduler-service ."
            }
        }
        
            stage('Push Image to Docker Hub') {
            steps {
                // load docker hub credentials
                withCredentials([string(credentialsId: 'DOCKER_USER', variable: 'DOCKER_USER_VAR'), string(credentialsId: 'DOCKER_PASS', variable: 'DOCKER_PASS_VAR')]) {
                    // login to docker hub
                    sh "docker login -u ${DOCKER_USER_VAR} -p ${DOCKER_PASS_VAR}"
                }
                
                // push docker image to docker hub
                sh "docker push paqih/locomotive-scheduler-service"
                
                // logout from docker hub
                sh "docker logout"
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'TELE_BOT_TOKEN', variable: 'TELE_BOT_TOKEN_VAR'), string(credentialsId: 'TELE_CHAT_ID', variable: 'TELE_CHAT_ID_VAR')]) {
                sh """
                    curl --request POST \
                      --url https://api.telegram.org/bot${TELE_BOT_TOKEN_VAR}/sendMessage \
                      --header 'Content-Type: application/json' \
                      --data '{"chat_id": ${TELE_CHAT_ID_VAR},"text": "<b>PIPELINE REPORT</b>\n\nStatus: Success\nJob: ${JOB_NAME}\nBuild Number: ${BUILD_NUMBER}
                      ","parse_mode": "HTML"}'
                """   
            }
        }
        
        failure {
            withCredentials([string(credentialsId: 'TELE_BOT_TOKEN', variable: 'TELE_BOT_TOKEN_VAR'), string(credentialsId: 'TELE_CHAT_ID', variable: 'TELE_CHAT_ID_VAR')]) {
                sh """
                    curl --request POST \
                      --url https://api.telegram.org/bot${TELE_BOT_TOKEN_VAR}/sendMessage \
                      --header 'Content-Type: application/json' \
                      --data '{"chat_id": ${TELE_CHAT_ID_VAR},"text": "<b>PIPELINE REPORT</b>\n\nStatus: Failure\nJob: ${JOB_NAME}\nBuild Number: ${BUILD_NUMBER}
                      ","parse_mode": "HTML"}'
                """   
            }
        }
    }
}
