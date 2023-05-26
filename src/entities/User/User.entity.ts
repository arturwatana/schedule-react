export type UserProps = {
  email: string;
  fullName: string;
  password: string;
};

export class User {
  email: string;
  fullName: string;
  password: string;

  private constructor(props: UserProps) {
    if (props.email === "") {
      throw new Error("Ops, precisamos saber seu email.");
    }
    if (props.fullName === "") {
      throw new Error("Ops, precisamos saber seu nome.");
    }
    if (props.password === "") {
      throw new Error(
        "Ops, nao precisamos saber sua senha, mas voce precisa se logar."
      );
    }
    if (props.password.length < 6) {
      throw new Error("Ops, sua senha precisa ser maior que 6 digitos.");
    }

    this.email = props.email;
    this.fullName = props.fullName;
    this.password = props.password;
  }

  static create(props: UserProps): User {
    const user = new User(props);
    return user;
  }
}
