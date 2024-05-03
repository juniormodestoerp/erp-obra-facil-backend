#!/bin/bash

# Espera até que o banco de dados esteja pronto (opcional)
echo "Aguardando o banco de dados estar pronto..."
sleep 2

# Loop para verificar a prontidão do Prisma
while true; do
    echo "Verificando a prontidão do Prisma..."
    if npx prisma migrate deploy; then
        echo "Prisma está pronto e conectado ao banco de dados."
        break  # Sai do loop se o Prisma estiver pronto
    else
        echo "Prisma não está pronto. Tentando novamente em 10 segundos..."
        sleep 10
    fi
done

# Função para gerar arquivos do Prisma
prisma_generate() {
    echo "Gerando arquivos Prisma..."
    npx prisma generate
}

# Função para empurrar o schema para o banco de dados
prisma_db_push() {
    echo "Empurrando schema para o banco de dados..."
    npx prisma db push
}

# Função para popular o banco de dados
seed_database() {
    echo "Populando banco de dados..."
    npm run database:seed
}

# Executar funções
prisma_generate
prisma_db_push
seed_database
