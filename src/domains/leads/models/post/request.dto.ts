import { ApiProperty } from '@nestjs/swagger';

export class LeadPostRequestDTO {
  @ApiProperty({
    example: 'Jane Doe',
    required: true,
  })
  nome: string;

  @ApiProperty({
    example: 5511989896565,
    required: true,
  })
  telefone: number;
}
