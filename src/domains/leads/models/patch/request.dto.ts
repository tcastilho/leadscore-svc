import { ApiProperty } from '@nestjs/swagger';

export class LeadPatchRequestDTO {
  @ApiProperty({
    example: '36718b0f-eeeb-413e-8081-9ab2748bd688',
    required: false,
  })
  agentId: string;
}
