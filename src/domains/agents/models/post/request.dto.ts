import { ENivel } from '@/shared/enums/nivel.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AgentPostRequestDTO {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  nome: string;

  @ApiProperty({
    example: '3',
    required: true,
  })
  nivel: ENivel;
}
