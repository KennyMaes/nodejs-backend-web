/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('user_projects', {
        user_id: { type: 'integer', notNull: true, references: 'users(id)' },
        project_id: { type: 'integer', notNull: true, references: 'projects(id)' },
    });

    pgm.addConstraint('user_projects', 'pk_user_project', {
        primaryKey: ['user_id', 'project_id'],
    });
};



/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('user_products')
};
