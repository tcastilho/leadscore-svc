import { ApiProperty } from '@nestjs/swagger';

export class AgentPostResponseDTO {
  @ApiProperty({
    example: '36718b0f-eeeb-413e-8081-9ab2748bd688',
  })
  id: string;

  @ApiProperty({
    example:
      'https://leadscore.com.br/v1/agents/36718b0f-eeeb-413e-8081-9ab2748bd688',
  })
  url: string;

  @ApiProperty({
    example: 'Vendedor criado com sucesso.',
  })
  mensagem: string;
}
