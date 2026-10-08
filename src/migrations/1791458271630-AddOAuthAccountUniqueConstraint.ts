import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOAuthAccountUniqueConstraint1791458271630 implements MigrationInterface {
    name = 'AddOAuthAccountUniqueConstraint1791458271630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oauth_accounts" ADD CONSTRAINT "UQ_55ee94ed9b32a787a45a9e9572f" UNIQUE ("provider", "providerAccountId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oauth_accounts" DROP CONSTRAINT "UQ_55ee94ed9b32a787a45a9e9572f"`);
    }

}
