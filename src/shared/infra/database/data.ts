export interface ISettingOption {
	id: string
	userId: string
	fieldName: string
	isFieldEnable: boolean
	isFieldRequired: boolean
	title: string
	description: string
}

export const settingsOptions: ISettingOption[] = [
	{
		id: '1d132d36-ee83-47c3-aeaa-de9c6a68e575',
		userId: '',
		fieldName: 'competenceDate',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Data de competência',
		description:
			'Define o momento específico do direito ao recebimento de uma receita.',
	},
	{
		id: 'b7cffeb2-3038-4950-9feb-5efd9ced0cb3',
		userId: '',
		fieldName: 'center',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Centros de custo e lucros',
		description:
			'Identifica o setor empresarial que incide custos e/ou gera receita, avaliado pelo lucro resultante.',
	},
	{
		id: 'aab16add-c98f-46a6-9c4a-54bd6a4ec549',
		userId: '',
		fieldName: 'tags',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Tags',
		description:
			'Categoriza lançamentos para organização e facilidade de acesso.',
	},
	// {
	// 	id: 'ef5502fe-053b-4b96-ab6a-e29bac122550',
	// 	userId: '',
	// 	fieldName: 'enablePasswordProtection',
	// 	isFieldEnable: true,
	// 	isFieldRequired: false,
	// 	title: 'Habilitar senha para exclusão de cadastros',
	// 	description:
	// 		'Adiciona uma camada de segurança exigindo senha para excluir itens dos cadastros.',
	// },
	// {
	// 	id: 'fdf8e077-1c1c-4dbe-a659-a6e05fa11f2a',
	// 	userId: '',
	// 	fieldName: 'installmentConfiguration',
	// 	isFieldEnable: true,
	// 	isFieldRequired: false,
	// 	title: 'Configuração de parcelamento',
	// 	description:
	// 		'Permite a escolha do valor da parcela individual ou o valor total como padrão em lançamentos parcelados.',
	// },
	// {
	// 	id: 'c850fd74-4086-4958-b5a1-2283dfae3955',
	// 	userId: '',
	// 	fieldName: 'includeResidualBalancesInReports',
	// 	isFieldEnable: true,
	// 	isFieldRequired: false,
	// 	title: 'Inclusão de saldos residuais nos relatórios de caixa',
	// 	description:
	// 		'Inclui saldos remanescentes de metas de receitas e despesas nos relatórios de caixa.',
	// },
	{
		id: 'b7f0c3ec-4c2d-4d1d-8f3c-dfe8a8b57689',
		userId: '',
		fieldName: 'card',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Cartão',
		description:
			'Permite adicionar um cartão específicos aos lançamentos.',
	},
	{
		id: 'cfdaee47-ae55-45bc-83e1-39cbc81a6d78',
		userId: '',
		fieldName: 'method',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Formas de pagamento',
		description:
			'Permite adicionar métodos de pagamento específicos aos lançamentos.',
	},
	{
		id: '4b6e1fef-0703-4977-bd37-54b910b8c7a5',
		userId: '',
		fieldName: 'documentNumber',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Número de documento',
		description:
			'Facilita a identificação e rastreamento de transações pelo número do documento.',
	},
	// {
	// 	id: 'c37a86ce-246e-4623-aa81-624abccaea50',
	// 	userId: '',
	// 	fieldName: 'enableReceiptExpenseGoals',
	// 	isFieldEnable: true,
	// 	isFieldRequired: false,
	// 	title: 'Metas de receitas e despesas',
	// 	description:
	// 		'Inclui no valor realizado apenas lançamentos de categorias com metas definidas para receitas e despesas.',
	// },
	{
		id: '2036cac2-365c-408c-be4c-91fc4b4fb2b3',
		userId: '',
		fieldName: 'contact',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Contatos',
		description:
			'Associa lançamentos a contatos específicos para melhor organização e rastreamento.',
	},
	{
		id: '354e3be6-fb8a-4127-9125-9bd623b53452',
		userId: '',
		fieldName: 'project',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Projetos',
		description:
			'Associa cada lançamento a um projeto específico para maior organização e rastreabilidade.',
	},
	{
		id: '4a4a60f1-2118-4a14-918c-d41d3488894c',
		userId: '',
		fieldName: 'notes',
		isFieldEnable: true,
		isFieldRequired: false,
		title: 'Observações',
		description:
			'Destinado a comentários adicionais ou detalhes relevantes sobre o lançamento.',
	},
	// {
	// 	id: 'f7274eca-55f5-4de1-bb65-dc7619bcc06a',
	// 	userId: '',
	// 	fieldName: 'showPending',
	// 	isFieldEnable: true,
	// 	isFieldRequired: false,
	// 	title: 'Exibir os lançamentos pendentes no presente',
	// 	description:
	// 		'Controla a exibição de lançamentos pendentes baseando-se na data de vencimento ou na data atual.',
	// },
]
