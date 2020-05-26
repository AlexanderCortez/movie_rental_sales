import {MigrationInterface, QueryRunner} from "typeorm";

export class Movie1590464813544 implements MigrationInterface {
    name = 'Movie1590464813544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "imageUrl" character varying, "stock" integer NOT NULL, "rentPrice" integer NOT NULL, "salePrice" integer NOT NULL, "likes" integer NOT NULL DEFAULT 0, "dislikes" integer NOT NULL DEFAULT 0, "available" boolean NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
