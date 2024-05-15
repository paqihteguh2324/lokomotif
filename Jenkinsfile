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
                withSonarQubeEnv('jenkins-sonarqube') {
                    sh "mvn clean verify sonar:sonar"
                    echo "SUCCESS Check SonarQube Code Analysis"
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: false
                echo "Quality Gate check completed"
            }
        }
    }
}
