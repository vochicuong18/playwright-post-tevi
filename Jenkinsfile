import groovy.json.JsonSlurper

pipeline {
    agent any
    environment {
        BASE_PATH = "D:\\tevi\\${new Date().format('ddMMyyyy')}"
        JSON_PATH = "${BASE_PATH}\\cron.json"
    }
    parameters {
        string(name: 'FOLDER_PATH', defaultValue: 'default', description: 'Folder path to use for test data')
    }
    stages {
        stage('Configure Cron Jobs') {
            steps {
                script {
                    println("Reading cron configuration from: ${env.JSON_PATH}")

                    def cronFile = readFile(env.JSON_PATH)
                    def cronConfig = new JsonSlurper().parseText(cronFile)
                    
                    println("Cron configuration data: ${cronConfig}")

                    def cronEntries = cronConfig.collect { config ->
                        "${config.time} %FOLDER_PATH=${env.BASE_PATH}\\${config.folder}"
                    }.join('\n')
                    
                    println("Generated cron entries:\n${cronEntries}")

                    properties([
                        pipelineTriggers([parameterizedCron(cronEntries)])
                    ])
                    
                    println("Scheduled jobs with the following cron entries:\n${cronEntries}")
                }
            }
        }

        stage('Run Playwright Tests') {
            when {
                expression { return params.FOLDER_PATH != 'default' }
            }
            steps {
                script {
                    def currentFolder = params.FOLDER_PATH
                    def dataFilePath = "${currentFolder}\\data.json"
                    def imgFolderPath = "${currentFolder}\\img"

                    println("Current test folder: ${currentFolder}")
                    println("Data file path: ${dataFilePath}")
                    println("Image folder path: ${imgFolderPath}")

                    if (fileExists(dataFilePath) && fileExists(imgFolderPath)) {
                        def dataFileContent = readFile(dataFilePath)
                        println("Data from ${dataFilePath}: ${dataFileContent}")
                        println("Images folder: ${imgFolderPath}")

                        println("Running Playwright tests with data from folder: ${currentFolder}")
                        bat """
                            set DATA_FOLDER=${currentFolder}
                            npx playwright test
                        """
                    } else {
                        error("Data file or image folder not found in ${currentFolder}")
                    }
                }
            }
        }
    }
}
