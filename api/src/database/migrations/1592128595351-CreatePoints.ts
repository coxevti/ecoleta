import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePoints1592128595351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 6,
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 10,
            scale: 6,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'uf',
            type: 'char',
            length: '2',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('points');
  }
}
