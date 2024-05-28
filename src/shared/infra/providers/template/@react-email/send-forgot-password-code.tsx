// import { readFileSync } from 'node:fs'
// import { join } from 'node:path'
import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'
import * as React from 'react'

import type { ISendForgotPasswordVariables } from '@shared/infra/providers/template'

export function SendForgotPasswordTemplate({
	name,
	userEmail,
	resetPasswordLink,
}: ISendForgotPasswordVariables) {
	const previewText = 'Obra Fácil | Recupere sua senha Obra Fácil'

	return (
		<Html lang="pt-BR">
			<Head />

			<Preview>{previewText}</Preview>

			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-gray-300 bg-sky-100/50 rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[32px] flex justify-center w-full text-center">
							<span className="text-2xl mx-axuto text-center">Obra fácil</span>
						</Section>

						<Text className="text-black text-xl font-normal text-center flex justify-center p-0 my-[30px] mx-auto">
							Recuperação de senha
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							Olá {name}! Você solicitou um link para recuperar sua senha no
							Obra Fácil através do email
							<span className="ml-1">{userEmail}</span>.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-sky-600 rounded text-white px-5 py-3 text-[12px] font-semibold no-underline text-center"
								href={resetPasswordLink}
							>
								Recuperar senha
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							ou copie a URL abaixo e cole em seu browser:
							<Link
								href={resetPasswordLink}
								className="ml-1 text-sky-600 no-underline"
							>
								{resetPasswordLink}
							</Link>
						</Text>

						<Hr className="bg-gray-300 h-px my-[26px] mx-0 w-full" />

						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Se você não solicitou esse link de autenticação, apenas ignore
							este e-mail.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
