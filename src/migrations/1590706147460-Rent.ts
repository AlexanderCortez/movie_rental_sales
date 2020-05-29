import {MigrationInterface, QueryRunner} from "typeorm";

export class Rent1590706147460 implements MigrationInterface {
    name = 'Rent1590706147460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rent" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT 1, "delivered" boolean NOT NULL DEFAULT false, "deliveredOn" TIMESTAMP, "timeframeInDays" integer NOT NULL DEFAULT 1, "shouldBeDeliveredOn" TIMESTAMP, "cost" double precision NOT NULL, "monetaryPenaltyOnDelay" double precision, "monetaryPenaltyPaid" double precision, "rentedOn" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movieId" integer, "userId" integer, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_70f58463bf7ef70f66b3f6c7b46" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_49296d11229074f058b7274ae2e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_49296d11229074f058b7274ae2e"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_70f58463bf7ef70f66b3f6c7b46"`);
        await queryRunner.query(`DROP TABLE "rent"`);
    }

}
