import { Utils } from '@core/utils/string'

import { CustomerPayload } from '@modules/customer/dtos/customer-payload'
import { CustomerConfig } from '@modules/customer/entities/customer-config'

import { MailInstance } from '@shared/infra/providers/mail'
import { QueueProps, Runnable } from '@shared/infra/providers/queue'
import { templateProvider } from '@shared/infra/providers/template/template'
import { jobs } from '@shared/infra/queue/jobs'

interface DataJob {
  customer: CustomerPayload
  customerConfig: CustomerConfig
  customerId: string
  name: string
  commonName: string
  email: string
  code: string
}

export class UserSendVerificationCodeEmail extends Runnable {
  get key() {
    return jobs.UserSendVerificationCodeEmail.key
  }

  async run({ data }: QueueProps): Promise<void> {
    const raw = data as DataJob

    const customer = raw.customer.data
    const customerConfig = raw.customer.config

    const html = await templateProvider.parse({
      template: 'user/verification-code.hbs',
      variables: {
        code: raw.code,
        logo: customerConfig?.logoDark || '',
        customerName: customer.name,
        customerPrefixDisplayName: customer.prefixDisplayName,
        customerDisplayName: customer.displayName,
        customerDocument: Utils.FormatDocument(customer.document),
        customerAddress: customerConfig?.address || '',
        customerWebsite: customerConfig?.site,
        phone: Utils.FormatPhone(customerConfig?.phone || ''),
        email: customerConfig?.email,
        name: raw.commonName,
        colors: {
          ...customerConfig?.colors,
        },
      },
    })

    MailInstance.sendMail({
      to: {
        name: raw.commonName,
        email: raw.email,
      },
      from: {
        name: customer.displayName,
        email: 'nao-responda@stric.com.br',
      },
      subject: 'Código de verificação de E-mail',
      email: html,
    })
  }
}
