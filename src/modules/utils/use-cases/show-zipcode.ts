import axios from 'axios'

interface Input {
	address: string
}

interface Output {
	zipCode: string
}

interface SearchResponse {
	cep: string
	logradouro: string
	complemento: string
	bairro: string
	localidade: string
	uf: string
	ibge: string
	gia: string
	ddd: string
	siafi: string
}

export class ShowZipCodeUseCase {
	async execute({ address }: Input): Promise<Output> {
		const addressUrl = `https://viacep.com.br/ws/${address}/json/`

		const { data } = await axios.get<SearchResponse>(addressUrl)

		return {
			zipCode: data.cep,
		}
	}
}
