import { ApiProperty } from '@nestjs/swagger';

export class AgentGetResponseDTO {
  @ApiProperty({
    example: [
      {
        id: '36718b0f-eeeb-413e-8081-9ab2748bd688',
        nome: 'John Doe',
        nivel: 3,
        ultimo_lead_recebido: '2022-03-11 16:30:00',
        score: 10,
      },
    ],
  })
  lista;
}
