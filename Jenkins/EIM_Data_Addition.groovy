pipeline {
    agent any
  
    stages {
        stage('Download NPM Packages') {
            steps {
                script {
                    bat '''
                    echo Installing NPM packages...
                    npm install
                    '''
                }
            }
        }
        
        stage('Run Scripts') {
            steps {
                script {
                    bat 'node CreateRecords.js'
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
                     subject: "Jenkins Build SUCCESS: DATA ADDED SUCCESSFULLY IN MONGODB ATLAS",
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
                     subject: "Jenkins Build FAILURE: Error adding data to MongoDB Atlas",
                     body: """Build failed. Here are the build logs:

                     ${buildLogs}
                     
                     Jenkins Job: ${env.JOB_NAME}
                     Build Number: ${env.BUILD_NUMBER}
                     """
            }
        }
    }
}