import {MigrationInterface, QueryRunner} from "typeorm";

export class Movie1590529677811 implements MigrationInterface {
    name = 'Movie1590529677811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "imageUrl" character varying, "stock" integer NOT NULL, "rentPrice" double precision NOT NULL, "salePrice" double precision NOT NULL, "likes" integer NOT NULL DEFAULT 0, "dislikes" integer NOT NULL DEFAULT 0, "available" boolean NOT NULL DEFAULT true, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
