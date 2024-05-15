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
        
        stage('Build Docker Image') {
            steps {
                // build docker image
                sh "docker build -t paqihteguh2324/lokomotif"
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                // load docker hub credentials
                
                // push docker image to docker hub
                sh "docker push paqihteguh2324/lokomotif"
                
            }
        }
    }
