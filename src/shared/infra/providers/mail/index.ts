import { SendGrid } from './sendgrid'

interface IMailContact {
	name: string
	email: string
}

export interface ISendMail {
	to: IMailContact
	from: IMailContact
	subject: string
	email: string
}

export interface Mail {
	sendMail(data: ISendMail): Promise<void>
}

/**
 * Sempre que não for possível realizar a injeção por dependência,
 * opte por utilizar o padrão MailInstance em vez de instanciar a classe diretamente.
 * Veja abaixo as orientações:
 * Evite: SendGrid.getInstance().sendMail()
 * Preferível: MailInstance.sendMail()
 */
export const MailInstance = SendGrid.getInstance()
