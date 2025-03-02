export class CompanyEntity {
    constructor(
      public readonly id: number,
      public readonly uuid?: string,
      public readonly name?: string,
      public readonly domain?: string,
      public readonly created_at?: Date,
      public readonly updated_at?: Date,
    ) {}
  }
