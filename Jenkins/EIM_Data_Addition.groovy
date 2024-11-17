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
            mail to: "adityasuryawanshi5451@gmail.com",
                 subject: "Jenkins Build SUCCESS: DATA ADDED SUCCESSFULLY IN MONGODB ATLAS",
                 body: "Build success"
        }
    }
}