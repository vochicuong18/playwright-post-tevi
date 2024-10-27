pipeline {
    agent any
    environment {
        LOCAL_DATA_PATH = 'D:/tevi'
    }
    stages {
        stage('Check Files') {
            steps {
                bat 'node -v'
                bat 'npm install'
               bat 'dir'
            }
        }
        stage('Run Tests') {
            steps {
                script {

                    def jsonData = sh(
                        script: 'node -e "console.log(JSON.stringify(require(\'./cron.json\')))"',
                        returnStdout: true
                    ).trim()
                    def cronConfig = new groovy.json.JsonSlurper().parseText(jsonData)

                    cronConfig.each { entry ->
                        def folderName = entry.folder
                        withEnv(["FOLDER_NAME=${folderName}", "LOCAL_DATA_PATH=${env.LOCAL_DATA_PATH}"]) {
                            // Chạy Playwright test
                            bat 'npx playwright test'
                        }
                    }
                }
            }
        }
    }
}
