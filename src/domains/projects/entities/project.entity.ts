export class ProjectEntity {
    constructor(
      public readonly id: number,
      public readonly uuid: string,
      public readonly name: string,
      public readonly description: string,
      public readonly created_at: Date,
      public readonly updated_at: Date,
    ) {}
  }