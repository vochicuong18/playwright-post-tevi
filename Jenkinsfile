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
                    // Đọc file cron.json
                    def cronFile = readFile(env.JSON_PATH)
                    def cronConfig = new JsonSlurper().parseText(cronFile)

                    // Tạo chuỗi cron từ cấu hình JSON
                    def cronEntries = cronConfig.collect { config ->
                        "${config.time} %FOLDER_PATH=${config.folder}"
                    }.join('\n')

                    // Thiết lập các cron jobs
                    properties([pipelineTriggers([parameterizedCron(cronEntries)])])

                    println("Scheduled jobs with the following cron entries:\n${cronEntries}")
                }
            }
        }

        stage('Run Playwright Tests') {
            when {
                expression { return params.FOLDER_PATH != 'default' } // Chỉ chạy nếu FOLDER_PATH khác 'default'
            }
            steps {
                script {
                    def currentFolder = params.FOLDER_PATH
                    def dataFilePath = "${BASE_PATH}\\${currentFolder}\\data.json"
                    def imgFolderPath = "${BASE_PATH}\\${currentFolder}\\img"

                    // Kiểm tra xem file data.json và thư mục img có tồn tại không
                    if (fileExists(dataFilePath) && fileExists(imgFolderPath)) {
                        def dataFileContent = readFile(dataFilePath)
                        println("Data from ${dataFilePath}: ${dataFileContent}")
                        println("Images folder: ${imgFolderPath}")

                        // Thiết lập biến môi trường và chạy Playwright tests
                        withEnv(["LOCAL_DATA_PATH=${env.BASE_PATH}", "FOLDER_NAME=${currentFolder}"]) {
                            bat """
                                npm install
                                npx playwright test
                            """
                        }
                    } else {
                        error("Data file or image folder not found in ${currentFolder}")
                    }
                }
            }
        }
    }
}
