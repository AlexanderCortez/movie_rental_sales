import {MigrationInterface, QueryRunner} from "typeorm";

export class Sale1590675623412 implements MigrationInterface {
    name = 'Sale1590675623412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT 1, "cost" double precision NOT NULL, "movieId" integer, "userId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_0b57de2dd7e017af3e07ce6c4b9" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_bf176f13c0bce3c693b24523794" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_bf176f13c0bce3c693b24523794"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_0b57de2dd7e017af3e07ce6c4b9"`);
        await queryRunner.query(`DROP TABLE "sale"`);
    }

}
