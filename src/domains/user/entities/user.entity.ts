export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly uuid: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    public readonly id_company: number,
  ) {}

  public isPasswordValid(password: string, encryption: { compare: (plain: string, hashed: string) => boolean }): boolean {
    return encryption.compare(password, this.password);
  }
}