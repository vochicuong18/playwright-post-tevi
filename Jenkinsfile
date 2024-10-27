pipeline {
    agent any
    environment {
        LOCAL_DATA_PATH = 'D:/tevi'
    }
    stages {

        stage('Install Dependencies') {
            steps {

                bat 'npm install'
            }
        }
        stage('Check Node.js Version') {
            steps {

                bat 'node -v'
            }
        }
        stage('Check Files') {
            steps {

                bat 'dir'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def jsonData = bat(
                        script: 'node -e "console.log(JSON.stringify(require(\'./cron.json\')))"',
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
