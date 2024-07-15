CREATE TABLE users (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE workers(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64),
    description TEXT,
    phone VARCHAR(20),
    job_desk TEXT,
    domicile TEXT,
    workplace TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    users_id INT,
    PRIMARY KEY(id)
);

-- INSERT INTO workers (name, description, job_desk, domicile, workplace, photo) 
-- VALUES ('Herman', 'Nama saya Herman', 'Writer', 'Bandung', 'PT WritingIndo', 'https://res.cloudinary.com/ddeypvhxa/image/upload/v1719820378/liedyg52gfxzwznqxtvj.jpg');


-- INSERT INTO users(email, password, role, worker_id )VALUES('sheilamarcia@gmail.com', 'abc123', 'Manufaktur',6);


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
    photo VARCHAR(255),
    users_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE skills(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    skill_name VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    workers_id INT,
    FOREIGN KEY (workers_id) REFERENCES workers(id)
);

-- INSERT INTO skills(skill_name)VALUES('CSS');

CREATE TABLE experience(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    position VARCHAR(64),
    company_name VARCHAR(64),
    month_company VARCHAR(20),
    year_company VARCHAR(4),
    description_company TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    workers_id INT,
    FOREIGN KEY (workers_id) REFERENCES workers(id)
);

CREATE TABLE portfolio (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    application_name VARCHAR(64),
    link_repository VARCHAR(255),
    type_portfolio VARCHAR(20),
    upload_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    workers_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (workers_id) REFERENCES workers(id)
);


CREATE TABLE hire (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    message_purpose VARCHAR(255),
    name VARCHAR(64),
    email VARCHAR(64) NOT NULL,
    phone VARCHAR(20),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    recruiters_id INT,
    workers_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (workers_id) REFERENCES workers(id),
    FOREIGN KEY (recruiters_id) REFERENCES recruiters(id)
);

-- ADD WORKERS & RECRUITERS

-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Kartika Sari', 'nama saya adalah Kartika Sari, bla... bla... bla.....', 'Accounting', 'Jakarta','PT. CITRA SARAN UTAMA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Edi mulyono', 'nama saya adalah Edi mulyono, bla... bla... bla.....', 'Marketing', 'Surabaya','PT. WAHANA MANDIRI INVESTAMA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Hengki wardana', 'nama saya adalah Hengki wardana, bla... bla... bla.....', 'HRD', 'Bandung','PT. AGUNG BANGUN SEJAHTERA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Indah Puspita Ayu', 'nama saya adalah Indah Puspita Ayu, bla... bla... bla.....', 'HRD', 'Bandung','PT. AGUNG BANGUN SEJAHTERA');
-- INSERT INTO workers(name, description, job_desk, domicile, workplace)VALUES('Surya Purnomo', 'nama saya adalah Surya Purnomo, bla... bla... bla.....', 'Manager Warehouse', 'Pontianak','PT. INDOFOOD CBP');


-- INSERT INTO recruiters(name, description, position, city, company, phone, instagram, linkedin, photo)VALUES('ferdy rachman', 'nama saya adalah ferdy rachman, bla... bla... bla.....', 'Manager Marketing', 'Jambi', 'PT Indorama tbk', ' 08518787678', '@ferdy_rachman', ' www.linkedin.com/ferdyrachman', 'www.google.com');


