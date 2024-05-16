pipeline {
    agent any

    tools {
        // Install the Maven version configured as "jenkins-maven" and add it to the path.
        maven "jenkins-maven"
    }

    stages {
 
        stage('Build Maven') {
          echo "Build Success"
        }
        
        stage('Check SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('jenkins-sonarqube') {
                 
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
