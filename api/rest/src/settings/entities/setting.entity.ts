import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column } from 'typeorm';

export class SettingsOptions {
  siteTitle: string;
  siteSubtitle: string;
  useOtp: boolean;
  currency: string;
  minimumOrderAmount: number;
  walletToCurrencyRatio: number;
  signupPoints: number;
  deliveryTime: DeliveryTime[];
  logo: Attachment;
  taxClass: string;
  shippingClass: string;
  seo: SeoSettings;
  google?: GoogleSettings;
  facebook?: FacebookSettings;
  contactDetails: ContactDetails;
  paymentGateway: string;
  maximumQuestionLimit: number;
}

export class DeliveryTime {
  title: string;
  description: string;
}

export class SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Attachment;
  twitterHandle?: string;
  twitterCardType?: string;
  metaTags?: string;
  canonicalUrl?: string;
}

export class GoogleSettings {
  isEnable: boolean;
  tagManagerId: string;
}

export class FacebookSettings {
  isEnable: boolean;
  appId: string;
  pageId: string;
}

export class ContactDetails {
  socials: ShopSocials[];
  contact: string;
  location: Location;
  website: string;
}

export class ShopSocials {
  icon: string;
  url: string;
}

export class Location {
  lat: number;
  lng: number;
  city?: string;
  state: string;
  country: string;
  zip?: string;
  formattedAddress: string;
}


export class Setting extends CoreEntity {
  @Column({ type: 'json' })
  options: SettingsOptions;
  
  @Column({ type: 'string', length: 4 })
  language: string;

  @Column({ type: 'json', array: true })
  translated_languages: string[];
}

