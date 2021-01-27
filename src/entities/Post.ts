import { IsEmail, Length } from "class-validator";
import { Entity as TOEntity, Column, Index, BeforeInsert } from "typeorm";

import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from "./Entity";

@TOEntity("posts")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Index()
  @Length(3, 366, {
    message: "Username must be at least three characters long",
  })
  @Column({ unique: true })
  username: string;

  @Column()
  @Length(6, 255)
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
