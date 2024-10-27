pipeline {
    agent any
    environment {
        LOCAL_DATA_PATH = 'D:/tevi'
        CURRENT_DATE = new Date().format('ddMMyyyy')
        CRON_FILE_PATH = "${env.LOCAL_DATA_PATH}/${env.CURRENT_DATE}/cron.json"
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
        stage('Print Local Data Path') {
            steps {
                bat "echo LOCAL_DATA_PATH is: ${env.LOCAL_DATA_PATH}"
                bat "echo CURRENT_DATE is: ${env.CURRENT_DATE}"
                bat "echo CRON_FILE_PATH is: ${env.CRON_FILE_PATH}"
            }
        }
        stage('Check Files') {
            steps {
                bat "if exist \"${env.CRON_FILE_PATH}\" (echo File exists) else (echo File does not exist)"
            }
        }
        stage('Run Tests') {
                    steps {
                        script {

                            def cronConfig = readJSON file: "${env.CRON_FILE_PATH}"
                            echo "Loaded cron configuration: ${cronConfig}"
                            cronConfig.each { entry ->
                                def folderName = entry.folder
                                echo "Running tests for folder: ${folderName}"

                                echo "Setting environment variables:"
                                echo "FOLDER_NAME=${folderName}"
                                echo "LOCAL_DATA_PATH=${env.LOCAL_DATA_PATH}/${env.CURRENT_DATE}"

                                withEnv(["FOLDER_NAME=${folderName}", "LOCAL_DATA_PATH=${env.LOCAL_DATA_PATH}/${env.CURRENT_DATE}"]) {
                                    bat 'npx playwright test'
                                }
                            }
                        }
                    }
                }
    }
}
