import { ApiProperty } from '@nestjs/swagger';

export class LeadPatchResponseDTO {
  @ApiProperty({
    example: '36718b0f-eeeb-413e-8081-9ab2748bd687',
  })
  id: string;

  @ApiProperty({
    example:
      'https://leadscore.com.br/v1/leads/36718b0f-eeeb-413e-8081-9ab2748bd687',
  })
  url: string;

  @ApiProperty({
    example: 'Lead atualizado com sucesso.',
  })
  mensagem: string;
}
