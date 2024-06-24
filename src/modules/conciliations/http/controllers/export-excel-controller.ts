import { prisma } from '@shared/infra/database/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'
import * as XLSX from 'xlsx'

export async function exportWorksheetController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		// Obter dados da tabela Transaction usando Prisma
		const data = await prisma.transaction.findMany()

		// Converter os dados para um formato apropriado para o XLSX
		console.log(data)

		// const worksheet = XLSX.utils.json_to_sheet(data);
		// const workbook = XLSX.utils.book_new();
		// XLSX.utils.book_append_sheet(workbook, worksheet, 'Lançamentos - Obra Fácil');

		// // Gerar o arquivo Excel em buffer
		// const buffer = XLSX.write(workbook, { bookType: 'xls', type: 'buffer' });

		// // Configurar o cabeçalho da resposta para download
		// reply.header('Content-Disposition', 'attachment; filename=lancamentos-obra-facil.xls');
		// reply.header('Content-Type', 'application/vnd.ms-excel');

		// // Enviar o arquivo para o cliente
		// reply.send(buffer);
	} catch (error) {
		console.error('Erro ao exportar tabela para Excel:', error)
		reply.status(500).send('Erro ao exportar tabela para Excel')
	}
}
