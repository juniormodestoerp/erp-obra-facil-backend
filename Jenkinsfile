pipeline {
    agent any
    tools {
        nodejs "node"
        git 'Default'
    }
    environment {
        // Variáveis de ambiente que são definidas como credenciais no Jenkins
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
                checkout scm  // Faz o checkout do código fonte do repositório SCM configurado
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Usando sh para executar comandos shell em ambientes Unix/Linux
                    sh 'pnpm install'
                }
            }
        }

        stage('Database Migration') {
            steps {
                script {
                    sh 'npx prisma db push'  // Executa migrations do Prisma
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'pnpm build'  // Comando de build do projeto
                }
            }
        }

        stage('SSH - Navigate to Project Directory') {
            steps {
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh username@hostname "cd /path/to/project"'
                }
            }
        }

        stage('SSH - Git Pull') {
            steps {
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh username@hostname "git pull"'
                }
            }
        }

        stage('SSH - Install Dependencies on Remote') {
            steps {
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh username@hostname "npm install"'
                }
            }
        }

        stage('SSH - Restart Application') {
            steps {
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh ubuntu@54.237.112.167 "pm2 restart all"'
                }
            }
        }
    }
}
