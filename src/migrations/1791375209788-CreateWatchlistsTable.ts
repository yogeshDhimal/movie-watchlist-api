import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWatchlistsTable1791375209788 implements MigrationInterface {
    name = 'CreateWatchlistsTable1791375209788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."watchlists_status_enum" AS ENUM('PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED')`);
        await queryRunner.query(`CREATE TABLE "watchlists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."watchlists_status_enum" NOT NULL DEFAULT 'PLAN_TO_WATCH', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "movieId" uuid NOT NULL, CONSTRAINT "PK_aa3c717b50a10f7a435c65eda5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_7c42bdd7ae0b79b682270ab4089" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_7c42bdd7ae0b79b682270ab4089"`);
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543"`);
        await queryRunner.query(`DROP TABLE "watchlists"`);
        await queryRunner.query(`DROP TYPE "public"."watchlists_status_enum"`);
    }

}
