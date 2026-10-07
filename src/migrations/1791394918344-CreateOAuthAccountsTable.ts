import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOAuthAccountsTable1791394918344 implements MigrationInterface {
    name = 'CreateOAuthAccountsTable1791394918344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "oauth_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "REL_4c22f13249ce02f89dc6d226e9" UNIQUE ("userId"), CONSTRAINT "PK_710a81523f515b78f894e33bb10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "oauth_accounts" ADD CONSTRAINT "FK_4c22f13249ce02f89dc6d226e9c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oauth_accounts" DROP CONSTRAINT "FK_4c22f13249ce02f89dc6d226e9c"`);
        await queryRunner.query(`DROP TABLE "oauth_accounts"`);
    }

}
