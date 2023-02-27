import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export default registerAs('s3', () => ({
  accessKeyId: env.get('AWS_ACCESS_KEY_ID').asString(),
  secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY').asString(),
  region: env.get('AWS_DEFAULT_REGION').asString(),
  bucket: env.get('AWS_BUCKET').asString(),
  folder: env.get('AWS_FOLDER').asString(),
  awsUrl: env.get('AWS_URL').asString(),
  awsCdn: env.get('AWS_CDN').asString(),
  endpoint: env.get('AWS_ENDPOINT').asString(),
}));
