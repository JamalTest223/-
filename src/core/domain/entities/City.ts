import { User } from "@prisma/client";

export class City {
  constructor(public id: string, public name: string) {}
}
