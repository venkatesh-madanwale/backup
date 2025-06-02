import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { AddCartDto } from '../dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) { }

  // async addToCart(data: AddCartDto) {
  //   const existing = await this.cartModel.findOne({ uid: data.uid, pid: data.pid });
  //   if (existing) {
  //     // await this.cartModel.findByIdAndUpdate(existing._id, { $inc: { qty: 1 } });
  //     // return { msg: 'qty inc' };
  //     const updated = await this.cartModel.findByIdAndUpdate(existing._id, { $inc: { qty: 1 } }, { new: true });
  //     return updated;
  //   } else {
  //     const cartItem = new this.cartModel(data);
  //     // await cartItem.save();
  //     // return { msg: 'prod added to cart' };
  //     const saved = await cartItem.save();
  //     return saved;
  //   }
  // }

  async addToCart(data: AddCartDto) {
    const existing = await this.cartModel.findOne({ uid: data.uid, pid: data.pid });
    if (existing) {
      const updated = await this.cartModel.findByIdAndUpdate(existing._id, { $inc: { qty: 1 } }, { new: true });
      return updated;
    } else {
      const cartItem = new this.cartModel(data);
      const saved = await cartItem.save();
      return saved;
    }
  }

  async getCart(uid: string) {
    return this.cartModel.find({ uid });
  }

  async increment(cid: string) {
    await this.cartModel.findByIdAndUpdate(cid, { $inc: { qty: 1 } });
    return { msg: 'cart inc' };
  }

  async decrement(cid: string) {
    const item = await this.cartModel.findById(cid);
    if (item && item.qty > 1) {
      await this.cartModel.findByIdAndUpdate(cid, { $inc: { qty: -1 } });
      return { msg: 'cart dec' };
    } else if (item) {
      return { msg: 'min qty reached' };
    } else {
      return { msg: 'item not found' };
    }
  }

  async deleteItem(cid: string) {
    await this.cartModel.findByIdAndDelete(cid);
    return { msg: 'prod del from cart' };
  }
}