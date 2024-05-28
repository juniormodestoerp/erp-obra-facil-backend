pipeline {
    agent any 

    tools {
        nodejs "node" // Certifique-se de que esta versão do Node.js esteja instalada no Jenkins
        git 'Default'
    }

    environment {
        DATABASE_URL = credentials('DATABASE_URL')
        JWT_SECRET = credentials('JWT_SECRET')
        REDIS_PASS = credentials('REDIS_PASS')
        SEND_GRID_KEY = credentials('SEND_GRID_KEY')
        RESEND_API_KEY = credentials('RESEND_API_KEY')
        CLOUDFLARE_ENDPOINT = credentials('CLOUDFLARE_ENDPOINT')
        CLOUDFLARE_ACCESS_KEY_ID = credentials('CLOUDFLARE_ACCESS_KEY_ID')
        CLOUDFLARE_SECRET_ACCESS_KEY = credentials('CLOUDFLARE_SECRET_ACCESS_KEY')
        BUCKET_NAME = credentials('BUCKET_NAME')
        SENTRY_DSN = credentials('SENTRY_DSN')
        // Variáveis de ambiente públicas
        NODE_ENV = 'development'
        PORT = credentials('PORT')
        REDIS_PORT = credentials('REDIS_PORT')
        REDIS_HOST = credentials('REDIS_HOST')
    
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'pnpm i'
                }
            }
        }

        stage('Database Migration') {
            steps {
                script {
                    sh 'npx prisma db push'
                }
            }
        }


        stage('') {
            steps {
                script {
                    sh 'pnpm build'
                }
            }
        }

        stage('Linting') { // Novo estágio para garantir a qualidade do código
            steps {
                script {
                    sh 'pnpm lint' // Ou o comando que você usa para linting
                }
            }
        }

        stage('Testing') { // Novo estágio para testes automatizados
            steps {
                script {
                    sh 'pnpm test' // Ou o comando que você usa para executar testes
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'pnpm build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh ubuntu@54.237.112.167 "cd /home/ubuntu/ && git pull && pnpm i && pm2 "'
                }
            }
        }
    }
}
