import { model, Schema } from "mongoose";
import { Client } from "src/types/users/client";

const clientSchema = new Schema<Client>({

  userId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Users',
  },

  fullName: {
    type: String,
    required: [true, 'A Client must have a full name.']
  },

  email: {
    type: String,
    required: [true, 'A Client must have an email.']
  },

  photo: {
    type: String,
    default: 'clients/default.jpg',
  },

  description: {
    type: String,
    default: '',
  },
  
  companyName: {
    type: String,
    default: '',
  },

  address: {
    type: String,
    default: '',
  },

  state: {
    type: String,
    default:''
  },

  contact: {
    type: String,
    default: '',
  },
},{
    timestamps: true,
    collection: 'Clients'
});

const Client = model('Clients', clientSchema);

module.exports = Client;
