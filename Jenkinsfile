pipeline {
    agent any

    tools {
        // Install the Maven version configured as "jenkins-maven" and add it to the path.
        maven "jenkins-maven"
    }

    stages {
        stage('Download and Install Maven') {
            steps {
                sh 'wget https://dlcdn.apache.org/maven/maven-4/4.0.0/binaries/apache-maven-4.0.0-bin.zip -O maven.zip'
                sh 'unzip maven.zip'
                sh 'export MAVEN_HOME=/path/to/maven/bin' // Optional
                sh 'mvn -v' // Verify installation
            }
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
