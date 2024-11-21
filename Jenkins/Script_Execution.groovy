pipeline {
    agent any
  
    stages {
        stage('Install Python Dependencies') {
            steps {
                script {
                    bat '''
                    echo Installing Python dependencies...
                    pip install -r requirements.txt
                    '''
                }
            }
        }
        
        stage('Run Python Script') {
            steps {
                script {
                    bat 'python Script.py'
                }
            }
        }
    }
    
    post {
        success {
            script {
                // Fetch build logs
                def buildLogs = currentBuild.rawBuild.getLog(1000).join("\n")
                
                // Send email with logs in the body
                mail to: "adityasuryawanshi5451@gmail.com",
                     subject: "Jenkins Build SUCCESS:Python Script Execution Successful",
                     body: """Build succeeded! Here are the build logs:

                     ${buildLogs}
                     
                     Jenkins Job: ${env.JOB_NAME}
                     Build Number: ${env.BUILD_NUMBER}
                     """
            }
        }
        failure {
            script {
                // Fetch build logs
                def buildLogs = currentBuild.rawBuild.getLog(1000).join("\n")
                
                // Send email with logs in the body
                mail to: "adityasuryawanshi5451@gmail.com",
                     subject: "Python Script Execution Failed",
                     body: """Build failed. Here are the build logs:

                     ${buildLogs}
                     
                     Jenkins Job: ${env.JOB_NAME}
                     Build Number: ${env.BUILD_NUMBER}
                     """
            }
        }
    }
}
