-- CREATE TABLE users(
--     id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
--     name VARCHAR(64),
--     address TEXT,
--     position TEXT,
--     company TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP,
--     PRIMARY KEY(id)
-- );

-- INSERT INTO users(name, address, position, company)VALUES('suryani indrawati', 'Jambi', 'Manager Marketing', 'PT Indorama tbk');


CREATE TABLE workers(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64),
    description TEXT,
    job_desk TEXT,
    domicile TEXT,
    workplace TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE recruiters(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64),
    description TEXT,
    position TEXT,
    city TEXT,
    company TEXT,
    phone VARCHAR(20),
    instagram TEXT,
    linkedin TEXT,
    photo BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

SELECT * FROM workers WHERE name LIKE '%k%';


-- ADD WORKERS & RECRUITERS

-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Kartika Sari', 'nama saya adalah Kartika Sari, bla... bla... bla.....', 'Accounting', 'Jakarta','PT. CITRA SARAN UTAMA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Edi mulyono', 'nama saya adalah Edi mulyono, bla... bla... bla.....', 'Marketing', 'Surabaya','PT. WAHANA MANDIRI INVESTAMA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Hengki wardana', 'nama saya adalah Hengki wardana, bla... bla... bla.....', 'HRD', 'Bandung','PT. AGUNG BANGUN SEJAHTERA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Indah Puspita Ayu', 'nama saya adalah Indah Puspita Ayu, bla... bla... bla.....', 'HRD', 'Bandung','PT. AGUNG BANGUN SEJAHTERA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Surya Purnomo', 'nama saya adalah Surya Purnomo, bla... bla... bla.....', 'Manager Warehouse', 'Pontianak','PT. INDOFOOD CBP');


-- INSERT INTO recruiters(name, description, position, city, company, phone, instagram, linkedin, photo)VALUES('ferdy rachman', 'nama saya adalah ferdy rachman, bla... bla... bla.....', 'Manager Marketing', 'Jambi', 'PT Indorama tbk', ' 08518787678', '@ferdy_rachman', ' www.linkedin.com/ferdyrachman', 'www.google.com');


