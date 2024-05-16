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
