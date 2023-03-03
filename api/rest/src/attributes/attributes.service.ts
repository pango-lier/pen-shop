import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import attributesJson from '@db/attributes.json';
import { Attribute } from './entities/attribute.entity';
import { plainToClass } from 'class-transformer';
import { AttributeStore } from './attributes.store';
import { GetAttributesArgs, GetProductsDto } from './dto/get-attributes.dto';

const attributes = plainToClass(Attribute, attributesJson);

@Injectable()
export class AttributesService {
  constructor(private readonly attributeStore: AttributeStore) {}

  private attributes: Attribute[] = attributes;

  create(createAttributeDto: CreateAttributeDto) {
    return this.attributeStore.create(createAttributeDto);
  }

  findAll(attribute: GetProductsDto) {
    return this.attributeStore.all(attribute);
  }

  findOne(param: string) {
    console.log(param);
    return this.attributeStore.findByIdOrSlug(param);
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return this.attributeStore.update(id, updateAttributeDto);
  }

  remove(id: number) {
    return this.attributeStore.softDelete(id);
  }
}
