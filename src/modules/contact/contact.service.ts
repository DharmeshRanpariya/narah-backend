import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  async create(createContactDto: CreateContactDto) {
    const contact = new this.contactModel(createContactDto);
    return contact.save();
  }

  async findAll() {
    return this.contactModel.find().sort({ createdAt: -1 });
  }
}
