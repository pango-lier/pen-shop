import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';
import { Type } from '../../types/entities/type.entity';
import { Column } from 'typeorm';

export class Manufacturer extends CoreEntity {
  cover_image?: Attachment;
  description?: string;
  image?: Attachment;
  is_approved?: boolean;
  name: string;
  products_count?: number;
  slug?: string;
  socials?: ShopSocials;
  type: Type;
  type_id?: string;
  website?: string;
  language?: string;

  @Column({ type: 'simple-array',nullable:true })
  translated_languages?: string[];
}
