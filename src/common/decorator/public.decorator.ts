import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'It is public_key';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
