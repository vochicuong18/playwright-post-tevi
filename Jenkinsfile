pipeline {
    agent any
    environment {
        LOCAL_DATA_PATH = 'D:/tevi'
    }
    stages {
        stage('Run Tests') {
            steps {
                script {
                    def cronConfig = readJSON file: 'cron.json'
                    cronConfig.each { entry ->
                        def folderName = entry.folder
                        withEnv(["FOLDER_NAME=${folderName}", "LOCAL_DATA_PATH=${env.LOCAL_DATA_PATH}"]) {
                            sh 'npx playwright test'
                        }
                    }
                }
            }
        }
    }
}
