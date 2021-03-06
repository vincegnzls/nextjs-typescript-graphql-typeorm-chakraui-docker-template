/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql"
import { FindOneOptions } from "typeorm"
import { User } from "../../entities/User"
import { IContext } from "../../utils/types"

@ObjectType()
class FieldError {
  @Field()
  field?: string
  @Field()
  message?: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: IContext
  ): Promise<User> {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    }).save()

    context.redis.set("userId", user.userId)

    return user
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: IContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Email does not exist.",
          },
        ],
      }
    }

    if (password !== user.password) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password.",
          },
        ],
      }
    }

    context.redis.set("userId", user.userId)

    return { user }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: IContext): Promise<boolean> {
    await context.redis.del("userId")

    return true
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: IContext): Promise<User | null> {
    const userId = await context.redis.get("userId")

    if (!userId) {
      return null
    }

    return await User.findOneOrFail({ where: { userId: parseInt(userId) } })
  }

  @Query(() => User)
  async getUser(@Arg("userId") userId: number): Promise<User> {
    return await User.findOneOrFail({ where: { userId } })
  }
}
