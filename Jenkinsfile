pipeline {
    agent any
    environment {
        LOCAL_DATA_PATH = 'D:/tevi'
        CRON_FILE_PATH = "${env.LOCAL_DATA_PATH}/cron.json"
    }
    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'  // Cài đặt tất cả các phụ thuộc trong package.json
            }
        }
        stage('Check Node.js Version') {
            steps {
                bat 'node -v'
            }
        }
        stage('Check Files') {
            steps {
                bat "dir ${env.LOCAL_DATA_PATH}"
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def jsonData = bat(
                        script: "node -e \"console.log(JSON.stringify(require('${env.CRON_FILE_PATH}')));\"",
                        returnStdout: true
                    ).trim()

                    def cronConfig = new groovy.json.JsonSlurper().parseText(jsonData)

                    cronConfig.each { entry ->
                        def folderName = entry.folder
                        withEnv(["FOLDER_NAME=${folderName}", "LOCAL_DATA_PATH=${env.LOCAL_DATA_PATH}"]) {

                            bat 'npx playwright test'
                        }
                    }
                }
            }
        }
    }
}
