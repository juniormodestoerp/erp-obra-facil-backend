import axios from 'axios'

interface Input {
	zipCode: string
}

export interface Output {
	state: string
	city: string
	neighborhood?: string
	street?: string
}

interface SearchResponse {
	cep: string
	logradouro?: string
	complemento?: string
	bairro?: string
	localidade: string
	uf: string
	ibge?: string
	gia?: string
	ddd?: string
	siafi?: string
}

export class ShowAddressUseCase {
	async execute({ zipCode }: Input): Promise<Output> {
		const zipCodeUrl = `https://viacep.com.br/ws/${zipCode}/json/`

		const { data } = await axios.get<SearchResponse>(zipCodeUrl)

		const { uf, localidade, bairro, logradouro } = data

		return {
			state: uf,
			city: localidade,
			neighborhood: bairro,
			street: logradouro,
		}
	}
}
